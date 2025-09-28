"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Modal from "@/components/Modal";
import { useAutoPlay } from "@/hooks/useAutoPlay";

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

interface SuratClientProps {
  mediaItems: MediaItem[];
  suratData: SuratData;
}

const SuratClient: React.FC<SuratClientProps> = ({ mediaItems, suratData }) => {
  const [currentState, setCurrentState] = useState("envelope");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  useAutoPlay();

  const handleClick = () => {
    if (currentState === "envelope") {
      setCurrentState("paper");
    } else if (currentState === "paper") {
      setCurrentState("modal");
    } else {
      setCurrentState("envelope");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 flex items-center justify-center p-4">
      <div className="relative">
        <AnimatePresence mode="wait">
          {currentState === "envelope" && (
            <motion.div
              key="envelope"
              className="relative cursor-pointer"
              onClick={handleClick}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-80 h-56 bg-red-400 rounded-lg shadow-2xl relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-full h-32 bg-red-500 z-10"
                  style={{
                    clipPath: "polygon(0 0, 50% 70%, 100% 0)",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 rounded-lg" />

                <motion.div
                  className="absolute bottom-4 right-4 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>

                <motion.div
                  className="absolute bottom-4 left-4 px-3 py-2 bg-white/20 text-white rounded-full text-xs font-medium"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {suratData.ui.envelopeText}
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentState === "paper" && (
            <motion.div
              key="paper"
              className="relative cursor-pointer"
              onClick={handleClick}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-80 h-80">
                <div className="absolute top-0 left-0 w-80 h-56 bg-red-400 rounded-lg shadow-2xl overflow-visible z-10">
                  <motion.div
                    className="absolute top-0 left-0 w-full h-32 bg-red-500 z-20"
                    style={{
                      clipPath: "polygon(0 100%, 50% 30%, 100% 100%)",
                      transformOrigin: "bottom center",
                    }}
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: -30 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 rounded-lg" />
                </div>

                <motion.div
                  className="absolute left-8 w-64 h-80 bg-gradient-to-b from-pink-50 to-white rounded-t-lg shadow-xl border border-pink-200 z-30"
                  initial={{ y: 200, opacity: 0 }}
                  animate={{ y: 100, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                >
                  <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-pink-100 to-transparent rounded-b-lg" />

                  <div className="p-4 border-b border-pink-200 bg-gradient-to-r from-pink-50 to-pink-100 rounded-t-lg">
                    <motion.h3
                      className="text-pink-600 font-semibold text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      {suratData.greeting}
                    </motion.h3>
                  </div>

                  <motion.div
                    className="p-4 text-pink-800 text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <div className="space-y-3">
                      <motion.div
                        className="h-3 bg-pink-200 rounded w-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                      />
                      <motion.div
                        className="h-3 bg-pink-200 rounded w-4/5"
                        initial={{ width: 0 }}
                        animate={{ width: "80%" }}
                        transition={{ delay: 1.6, duration: 0.5 }}
                      />
                      <motion.div
                        className="h-3 bg-pink-200 rounded w-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1.8, duration: 0.5 }}
                      />
                      <motion.div
                        className="h-3 bg-pink-200 rounded w-3/4"
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ delay: 2, duration: 0.5 }}
                      />
                      <motion.div
                        className="h-3 bg-pink-200 rounded w-5/6"
                        initial={{ width: 0 }}
                        animate={{ width: "83%" }}
                        transition={{ delay: 2.2, duration: 0.5 }}
                      />
                    </div>

                    <motion.p
                      className="text-xs text-pink-600 mt-4 italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ delay: 2.5 }}
                    >
                      {suratData.signature}
                    </motion.p>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-4 right-4 px-4 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-full text-sm font-medium shadow-lg cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 2.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {suratData.ui.paperButtonText}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentState === "modal" && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClick}
              />

              <motion.div
                key="modal"
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-full max-w-lg bg-gradient-to-b from-pink-50 to-white rounded-xl shadow-2xl border border-pink-200 overflow-hidden relative max-h-[90vh]"
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 50 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <button
                    onClick={handleClick}
                    className="absolute top-4 right-4 w-8 h-8 bg-pink-200 hover:bg-pink-300 rounded-full flex items-center justify-center text-pink-700 transition-colors z-10"
                  >
                    ✕
                  </button>

                  <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-6 border-b border-pink-200">
                    <motion.h2
                      className="text-pink-700 font-bold text-xl mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {suratData.recipient}
                    </motion.h2>
                  </div>

                  <motion.div
                    className="p-6 max-h-96 overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {mediaItems.length > 0 && (
                      <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <div className="rounded-2xl">
                          {mediaItems.slice(0, 8).map((item, index) => (
                            <motion.div
                              key={index}
                              className="w-full rounded-2xl bg-white p-3"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.05 }}
                              onClick={() => setSelectedMedia(item)}
                            >
                              {item.type === "image" ? (
                                <Image
                                  src={item.src}
                                  alt={`Memory ${index + 1}`}
                                  width={100}
                                  height={100}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <video
                                  src={item.src}
                                  className="w-full rounded-2xl h-full object-cover"
                                  muted
                                  loop
                                />
                              )}
                            </motion.div>
                          ))}
                        </div>
                        {mediaItems.length > 8 && (
                          <p className="text-center text-pink-500 text-xs mt-2">
                            +{mediaItems.length - 8} more memories
                          </p>
                        )}
                      </motion.div>
                    )}

                    <motion.div
                      className="text-pink-800 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <h3 className="text-pink-600 font-semibold text-sm mb-3">
                        My Letter for You 💌
                      </h3>
                      {suratData.content.split("\n").map((line, index) => (
                        <motion.p
                          key={index}
                          className="mb-3 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                        >
                          {line}
                        </motion.p>
                      ))}
                    </motion.div>

                    <motion.div
                      className="flex justify-center mt-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.5, duration: 0.3 }}
                    >
                      <span className="text-2xl">💕</span>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="text-center pb-4 bg-gradient-to-t from-pink-50 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 1.8 }}
                  >
                    <span className="text-pink-500 text-xs">
                      {suratData.ui.modalCloseText}
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <motion.div
          className="text-center mt-6 text-white/80 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {currentState === "envelope" && suratData.ui.instructions.envelope}
          {currentState === "paper" && suratData.ui.instructions.paper}
          {currentState === "modal" && suratData.ui.instructions.modal}
        </motion.div>
      </div>

      <Modal open={!!selectedMedia} onClose={() => setSelectedMedia(null)}>
        {selectedMedia?.type === "image" ? (
          <Image
            width={800}
            height={600}
            src={selectedMedia.src}
            alt="Memory Preview"
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg"
          />
        ) : selectedMedia?.type === "video" ? (
          <video
            src={selectedMedia.src}
            controls
            autoPlay
            className="max-h-[80vh] max-w-[90vw] rounded-lg"
          />
        ) : null}
      </Modal>
    </div>
  );
};

export default SuratClient;
