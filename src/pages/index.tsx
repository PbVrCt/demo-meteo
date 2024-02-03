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
  const { htmlContent, setHtmlContent } = useHtmlContent();
  const previousDates = getPreviousDates(365);
  const [selectedDate, setSelectedDate] = useState(`${getLatestDate()}`);
  const [apiType, setApiType] = useState("wind");
  const loadIframeContent = useCallback(
    async (date: string) => {
      const response = await fetch(`/api/${apiType}?date=${date}`);
      const htmlContent = await response.text();
      setHtmlContent(htmlContent);
    },
    [apiType, setHtmlContent],
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
        <button style={{ marginRight: "1rem" }}>Demo</button>
        <Link href="/diagram" passHref>
          <button>Diagram</button>
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
            style={{
              marginBottom: "1rem",
              marginRight: "1rem",
              width: "200px",
            }}
          >
            <option value="wind">Wind</option>
            <option value="temperature">Temperature</option>
          </select>
          <select
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              marginBottom: "1rem",
              marginRight: "1rem",
              width: "200px",
            }}
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
          }}
        >
          <button
            onClick={() => loadIframeContent(selectedDate)}
            style={{ marginBottom: "1rem", width: "200px" }}
          >
            Load data
          </button>
        </div>
      </div>
    </main>
  );
}
