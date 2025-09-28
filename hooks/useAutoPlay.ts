"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useMusicPlayer } from "@/contexts/MusicContext";

export const useAutoPlay = () => {
  const pathname = usePathname();
  const { play, showPlayer, isVisible } = useMusicPlayer();

  useEffect(() => {
    // Only auto-play when first entering /home routes and player is not yet visible
    if (pathname.startsWith("/home") && !isVisible) {
      const initializeMusic = async () => {
        try {
          await play();
          showPlayer();
        } catch (error) {
          console.log("Audio autoplay blocked by browser:", error);
          // Show player even if autoplay fails, user can manually play
          showPlayer();
        }
      };

      // Small delay to ensure page is fully loaded
      const timer = setTimeout(initializeMusic, 300);

      return () => clearTimeout(timer);
    }
  }, [pathname, play, showPlayer, isVisible]);
};
