import { Api } from "sst/node/api";

export async function getServerSideProps() {
  const response = await fetch(`${Api.api.url}/wind`);
  const htmlString = await response.text();
  return { props: { htmlString } };
}

export default function Home({ htmlString }: { htmlString: string }) {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "left",
      }}
    >
      <div style={{ width: "70%", height: "90%" }}>
        {" "}
        <iframe
          srcDoc={htmlString}
          style={{ width: "100%", height: "1000px", border: "none" }}
        ></iframe>
      </div>
    </main>
  );
}
