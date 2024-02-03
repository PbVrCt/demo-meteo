import numpy as np
import openmeteo_requests

import pandas as pd
import folium
import branca.colormap as cm
from folium.plugins import HeatMapWithTime

from aws_lambda_powertools import Logger, Metrics, Tracer

metrics = Metrics(service="backend", namespace="demo_meteo")
tracer = Tracer(service="backend")
logger = Logger(service="backend")

openmeteo = openmeteo_requests.Client()
url = "https://api.open-meteo.com/v1/jma"


@metrics.log_metrics(capture_cold_start_metric=True)
@tracer.capture_lambda_handler
@logger.inject_lambda_context
def handler(event, context):
    start_date = event["queryStringParameters"]["date"]
    end_date = (pd.to_datetime(start_date) + pd.Timedelta(days=1)).strftime("%Y-%m-%d")
    # Generate a grid of Tokyo
    lat_start, lat_end = 35.00, 37.00
    lon_start, lon_end = 138.00, 141.00
    lat_steps, lon_steps = 7, 7
    latitudes = np.linspace(lat_start, lat_end, lat_steps)
    longitudes = np.linspace(lon_start, lon_end, lon_steps)

    params = {
        "latitude": latitudes.repeat(lon_steps),
        "longitude": np.tile(longitudes, lat_steps),
        "hourly": "temperature_2m",
        "start_date": start_date,
        "end_date": end_date,
    }
    responses = openmeteo.weather_api(url, params=params)

    base_map = folium.Map(
        location=[(lat_start + lat_end) / 2, (lon_start + lon_end) / 2],
        zoom_start=9,
        tiles="cartodbpositron",
        control_scale=True,
    )

    # Prepare the data
    heatmap_data = {}
    time_index = []
    print("Generating heatmap data...")
    for response in responses:
        hourly = response.Hourly()
        timestamps = pd.date_range(
            start=pd.to_datetime(hourly.Time(), unit="s"),
            end=pd.to_datetime(hourly.TimeEnd(), unit="s"),
            freq=pd.Timedelta(seconds=hourly.Interval()),
            inclusive="left",
        ).tolist()
        values = hourly.Variables(0).ValuesAsNumpy().tolist()
        lat = response.Latitude()
        lon = response.Longitude()
        for timestamp, temperature in zip(timestamps, values):
            time_str = timestamp.strftime("%Y-%m-%d %H:%M:%S")
            if time_str not in heatmap_data:
                heatmap_data[time_str] = []
            heatmap_data[time_str].append([lat, lon, temperature])
            if time_str not in time_index:
                time_index.append(time_str)
    data = [frame for frame in heatmap_data.values()]

    # Set a legend
    color_scale = cm.LinearColormap(
        colors=[(0.0, 0.0, 1.0, 0.8), (1.0, 1.0, 1.0, 0.0), (1.0, 0.0, 0.0, 0.8)],
        vmin=-10,
        vmax=50,
    )
    color_scale.caption = "Temperature (2 m) (Celsius)"
    base_map.add_child(color_scale)

    gradient = {
        0.0: "rgba(0,0,255,0.8)",
        0.5: "rgba(255,255,255,0.0)",
        1.0: "rgba(255,0,0,0.8)",
    }
    heatmap = HeatMapWithTime(
        data=data,
        index=time_index,
        gradient=gradient,
        use_local_extrema=True,
        auto_play=True,
        min_opacity=0,
        max_opacity=0.8,
        radius=45,
        blur=0,
    )
    heatmap.add_to(base_map)

    return {"statusCode": 200, "body": base_map._repr_html_()}
