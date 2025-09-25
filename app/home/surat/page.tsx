/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from "fs";
import path from "path";
import SuratClient from "./SuratClient";

type MediaItem = {
  src: string;
  type: "image" | "video";
};

type SuratData = {
  title: string;
  emoji: string;
  recipient: string;
  greeting: string;
  content: string;
  signature: string;
  ui: {
    envelopeText: string;
    paperButtonText: string;
    modalCloseText: string;
    instructions: {
      envelope: string;
      paper: string;
      modal: string;
    };
  };
};

export default function SuratPage() {
  const mediaDir = path.join(process.cwd(), "public/images/surat");

  let files: string[] = [];
  try {
    files = fs.readdirSync(mediaDir);
  } catch (err) {
    files = [];
  }

  const imageExts = ["jpg", "jpeg", "png", "webp", "gif", "avif", "svg"];
  const videoExts = ["mp4", "webm", "ogg", "mov"];
  const allowed = [...imageExts, ...videoExts];

  const mediaItems: MediaItem[] = files
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
        src: `/images/surat/${file}`,
        type,
      };
    })
    .sort((a, b) => {
      const filenameA = path.basename(a.src);
      const filenameB = path.basename(b.src);
      return filenameA.localeCompare(filenameB);
    });

  let suratData: SuratData;
  try {
    const jsonPath = path.join(process.cwd(), "app/home/surat/data.json");
    const jsonContent = fs.readFileSync(jsonPath, "utf8");
    suratData = JSON.parse(jsonContent);
  } catch (err) {
    console.error("Error loading surat data:", err);
    suratData = {
      title: "our love language",
      emoji: "❤️📮",
      recipient: "Dear My babe💕",
      greeting: "Dear Eren💕",
      content: "Loading content...",
      signature: "untukmu 2000 tahun yang lalu",
      ui: {
        envelopeText: "Click to open",
        paperButtonText: "📖 Read Full Letter",
        modalCloseText: "Click outside or ✕ to close",
        instructions: {
          envelope: "Click envelope to open",
          paper: "Click letter to read full content",
          modal: "Click outside to close",
        },
      },
    };
  }

  return <SuratClient mediaItems={mediaItems} suratData={suratData} />;
}
