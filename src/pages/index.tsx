import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useHtmlContent } from "../components/htmlContentContext";

function getLatestDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - 2);
  return date.toISOString().split("T")[0];
}

function getPreviousDates(days: number): string[] {
  const dates = [];
  for (let i = 2; i <= days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
}

export default function Home() {
  const {
    isLoading,
    setIsLoading,
    htmlContent,
    setHtmlContent,
    apiType,
    setApiType,
    selectedDate,
    setSelectedDate,
  } = useHtmlContent();
  const previousDates = getPreviousDates(150);
  const loadIframeContent = useCallback(
    async (date: string) => {
      setIsLoading(true);
      const response = await fetch(`/api/${apiType}?date=${date}`);
      const htmlContent = await response.text();
      setHtmlContent(htmlContent);
      setIsLoading(false);
    },
    [apiType, setHtmlContent, setIsLoading],
  );

  useEffect(() => {
    if (selectedDate && !htmlContent) {
      loadIframeContent(selectedDate);
    }
  }, [selectedDate, loadIframeContent, htmlContent]);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "left",
      }}
    >
      <div
        style={{
          textAlign: "center",
          position: "fixed",
          left: "0",
          right: "0",
          bottom: "1rem",
        }}
      >
        <Link href="/" passHref>
          <button className="button">Demo</button>
        </Link>
        <Link href="/diagram" passHref>
          <button type="button" className="button">
            Diagram
          </button>
        </Link>
      </div>
      <div style={{ width: "70%", height: "90%" }}>
        {htmlContent && (
          <iframe
            srcDoc={htmlContent}
            style={{ width: "100%", height: "1000px", border: "none" }}
          ></iframe>
        )}
      </div>
      <div
        style={{
          width: "30%",
          height: "90%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          right: "0%", // Center the selectors and button halfway through the screen vertically
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <select
            onChange={(e) => setApiType(e.target.value)}
            value={apiType}
            className="button"
          >
            <option value="wind">Wind</option>
            <option value="temperature">Temperature</option>
          </select>
          <select
            onChange={(e) => setSelectedDate(e.target.value)}
            value={selectedDate}
            className="button"
          >
            {previousDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "3rem",
          }}
        >
          <button
            className="button"
            onClick={() => loadIframeContent(selectedDate)}
          >
            {isLoading ? <span>Loading...</span> : <span>Load data</span>}
          </button>
          <div className="throbber-wrapper">
            {isLoading && <div className="throbber"></div>}
          </div>
        </div>
      </div>
      <div
        className="info-text"
        style={{
          position: "absolute",
          textAlign: "center",
          bottom: "15%",
          left: "85%",
          transform: "translateX(-50%)",
        }}
      >
        <p>
          Made with the AWS CDK and NextJs.
          ***REMOVED***
          ***REMOVED***
          <a
            style={{ textDecoration: "underline" }}
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Link to the code.
          </a>
          ***REMOVED***
          ***REMOVED***
       ***REMOVED***
          ***REMOVED***
       
          ***REMOVED***
          ***REMOVED***
          Data from:
          ***REMOVED***
          <a
            href="https://open-meteo.com/en/docs/jma-api"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://open-meteo.com/
          </a>
        </p>
      </div>
    </main>
  );
}
