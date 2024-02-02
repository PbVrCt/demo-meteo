import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const htmlFilePath = path.join(
    process.cwd(),
    "src/pages/api/heatmapMock.html",
  );
  const htmlString = fs.readFileSync(htmlFilePath, "utf8");
  res.status(200).send(htmlString);
}
