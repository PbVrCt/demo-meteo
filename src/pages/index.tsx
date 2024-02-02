import { Api } from "sst/node/api";
import { useState } from "react";

export async function getServerSideProps() {
  const date = new Date();
  date.setDate(date.getDate() - 2);
  const response = await fetch(
    `${Api.api.url}/wind?date=${date.toISOString().split("T")[0]}`,
  );
  const htmlString = await response.text();
  return { props: { htmlString } };
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

export default function Home({ htmlString }: { htmlString: string }) {
  const [showIframe, setShowIframe] = useState(false);
  const [htmlContent, setHtmlContent] = useState(htmlString);
  const previousDates = getPreviousDates(365);
  const [selectedDate, setSelectedDate] = useState("");
  async function loadIframeContent(date: string) {
    const response = await fetch(`/api/wind?date=${date}`);
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
