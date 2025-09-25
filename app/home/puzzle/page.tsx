import fs from "fs";
import path from "path";
import PuzzleClient from "./PuzzleClient";

export default function PuzzlePage() {
  const dir = path.join(process.cwd(), "public/images/puzzle");
  let files: string[] = [];

  try {
    files = fs.readdirSync(dir);
  } catch {
    files = [];
  }

  const imageExts = ["jpg", "jpeg", "png", "webp"];
  const images = files.filter((f) =>
    imageExts.includes(path.extname(f).slice(1).toLowerCase())
  );

  const randomImage =
    images.length > 0
      ? `/images/puzzle/${images[Math.floor(Math.random() * images.length)]}`
      : "https://picsum.photos/400/400";

  return <PuzzleClient image={randomImage} />;
}
