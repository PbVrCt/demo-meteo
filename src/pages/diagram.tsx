import Image from "next/image";
import Link from "next/link";
import diagramImage from "../styles/diagram.png";

export default function Diagram() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "0",
          padding: "1rem",
        }}
      >
        <Link href="/" passHref>
          <button style={{ marginRight: "1rem" }}>Demo</button>
        </Link>
        <Link href="/diagram" passHref>
          <button>Diagram</button>
        </Link>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "20%",
        }}
      >
        <Image src={diagramImage} alt="System Diagram" />
      </div>
    </div>
  );
}
