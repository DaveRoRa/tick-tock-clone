import { useState, useRef } from "react";

const useVideoController = () => {
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handlePlaying = () => {
    if (playing) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setPlaying((prev) => !prev);
  };

  const handleMute = () => {
    setIsVideoMuted((prev) => !prev);
  };

  return { playing, isVideoMuted, handlePlaying, videoRef, handleMute };
};

export default useVideoController;
