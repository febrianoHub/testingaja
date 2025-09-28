"use client";

import HomeCard from "@/components/HomeCard";
import { CiHeart } from "react-icons/ci";
import { useAutoPlay } from "@/hooks/useAutoPlay";

export default function Home() {
  useAutoPlay();

  return (
    <div className="min-h-screen p-2 pb-20">
      {" "}
      <h1 className="text-5xl font-serif text-pink-500 text-center">
        Menu Of Our Love
      </h1>
      <div className="text-xl space-x-2 flex justify-center items-center font-serif text-pink-600 text-center">
        <CiHeart />
        <p>Together Forever</p>
        <CiHeart />
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 md:w-4/5 w-full gap-5 p-4">
          <HomeCard
            image="/images/card/camera.png"
            href="/home/memories"
            title="Our Memories"
            description="Every precious moment with you ❤️"
          />
          <HomeCard
            image="/images/card/gallery.png"
            href="/home/gallery"
            title="Love Gallery"
            description="Every memory we live 💞"
          />
          <HomeCard
            image="/images/card/puzzle.png"
            href="/home/puzzle"
            title="Love Puzzle"
            description="Pieces of our hearts combined 💝"
          />
          <HomeCard
            image="/images/card/surat.png"
            href="/home/surat"
            title="Love Notes"
            description="Sweet messages just for you 💌"
          />
        </div>
      </div>
    </div>
  );
}
