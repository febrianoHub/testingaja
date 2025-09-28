"use client";

import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import Image from "next/image";
import { useAutoPlay } from "@/hooks/useAutoPlay";

export default function MemoriesClient({ memories }: { memories: string[] }) {
  useAutoPlay();
  return (
    <div className="min-h-screen p-3 overflow-hidden">
      <Link
        href="/home"
        className="rounded-2xl w-28 flex justify-center items-center gap-2 text-pink-600 font-semibold backdrop-blur-2xl py-2 px-5 bg-gray-50/30"
      >
        <IoMdArrowBack />
        <span>Back</span>
      </Link>

      <h1 className="sm:text-4xl mt-10 sm:mt-0 text-2xl font-serif text-center text-pink-600 mb-6">
        Our Sweet Memories
      </h1>

      <div className="w-full mt-10 flex justify-center items-center">
        <div className="md:w-[300px] w-[220px] h-[370px] md:h-[480px] mx-auto">
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper h-full"
          >
            {memories.map((src, i) => (
              <SwiperSlide
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  width={1024}
                  height={1024}
                  src={src}
                  alt={`memory ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
