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

export default function Home({ htmlString }: { htmlString: string }) {
  const [showIframe, setShowIframe] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");

  async function loadIframeContent() {
    const response = await fetch("/api/loadHtml");
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button onClick={loadIframeContent} style={{ margin: "1rem" }}>
          Load Wind Speed Heatmap
        </button>
      </div>
    </main>
  );
}
