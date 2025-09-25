import fs from "fs";
import path from "path";
import MemoriesClient from "./MemoriesClient";

export default function MemoriesPage() {
  const dir = path.join(process.cwd(), "public/images/memories");

  const files = fs.readdirSync(dir);

  const memories = files.map((file) => `/images/memories/${file}`);

  return <MemoriesClient memories={memories} />;
}
