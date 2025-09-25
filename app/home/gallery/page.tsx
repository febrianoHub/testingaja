/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from "fs";
import path from "path";
import GalleryClient from "./GalleryClient";

type GalleryItem = {
  src: string;
  type: "image" | "video";
};

export default function GalleryPage() {
  const dir = path.join(process.cwd(), "public/images/gallery");

  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch (err) {
    files = [];
  }

  const imageExts = ["jpg", "jpeg", "png", "webp", "gif", "avif", "svg"];
  const videoExts = ["mp4", "webm", "ogg", "mov"];
  const allowed = [...imageExts, ...videoExts];

  const gallery: GalleryItem[] = files
    .filter((file) => {
      const ext = path.extname(file).slice(1).toLowerCase();
      return allowed.includes(ext);
    })
    .map((file) => {
      const ext = path.extname(file).slice(1).toLowerCase();
      const type: "image" | "video" = videoExts.includes(ext)
        ? "video"
        : "image";
      return {
        src: `/images/gallery/${file}`,
        type,
      };
    });

  return <GalleryClient gallery={gallery} />;
}
