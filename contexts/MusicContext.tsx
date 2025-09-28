/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { audio } from "framer-motion/m";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

interface MusicContextType {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isVisible: boolean;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  showPlayer: () => void;
  hidePlayer: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusicPlayer = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusicPlayer must be used within a MusicProvider");
  }
  return context;
};

interface MusicProviderProps {
  children: React.ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/audio.mp3");
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, []);

  const play = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Audio play failed:", error);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const showPlayer = () => {
    setIsVisible(true);
  };

  const hidePlayer = () => {
    setIsVisible(false);
  };

  const value: MusicContextType = {
    isPlaying,
    currentTime,
    duration,
    volume,
    isVisible,
    play,
    pause,
    togglePlay,
    setVolume,
    seekTo,
    showPlayer,
    hidePlayer,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};
