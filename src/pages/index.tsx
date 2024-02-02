// import { Api } from "sst/node/api";
import path from "path";
import fs from "fs";
import { useState } from "react";

export async function getServerSideProps() {
  // const response = await fetch(`${Api.api.url}/wind`);
  // const htmlString = await response.text();
  // return { props: { htmlString } };
  return { props: {} };
}

function getPreviousDates(days: number): string[] {
  const dates = [];
  for (let i = 1; i <= days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
}

export default function Home({ htmlString }: { htmlString: string }) {
  const [showIframe, setShowIframe] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const previousDates = getPreviousDates(365);
  const [selectedDate, setSelectedDate] = useState("");
  async function loadIframeContent(date: string) {
    const response = await fetch(`/api/loadHtml?date=${date}`);
    const htmlString = await response.text();
    setHtmlContent(htmlString);
    setShowIframe(true);
  }

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "left",
      }}
    >
      <div style={{ width: "70%", height: "90%" }}>
        {" "}
        {showIframe && htmlContent && (
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
          justifyContent: "center",
        }}
      >
        <select
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ marginTop: "1rem", marginRight: "1rem", width: "200px" }}
        >
          {previousDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
        <button
          onClick={() => loadIframeContent(selectedDate)}
          style={{ marginTop: "1rem", marginLeft: "1rem", width: "200px" }}
        >
          Load Wind Speed Heatmap
        </button>
      </div>
    </main>
  );
}
