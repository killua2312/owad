"use client";
import { useState } from "react";
import ReactPlayer from "react-player";
import { GrClose } from "react-icons/gr";

const VideoPlayer = () => {
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [adPlayed, setAdPlayed] = useState(false);

  const handleProgress = (progress) => {
    setPlayedSeconds(progress.playedSeconds);
    if (playedSeconds >= 180 && !isAdPlaying && !adPlayed) {
      setIsAdPlaying(true);
      setAdPlayed(true);
    }
  };

  return (
    <div className="overflow-hidden fixed top-0 left-0 w-full h-full z-100">
      <div className={`${isAdPlaying ? "none" : "block"} w-full h-screen`}>
        <ReactPlayer
          url={mediaUrl}
          playing={!isAdPlaying}
          controls
          onProgress={handleProgress}
          width="100%"
          height="100%"
        />
        <GrClose
          className="absolute top-0 right-0 m-4 text-white p-2 rounded-full z-1000"
          onClick={() => setPlayVideo(false)}
        />
      </div>

      {isAdPlaying && (
        <div className="w-full h-screen">
          <ReactPlayer
            url="http://localhost:5000/public/opAd/output.m3u8"
            playing={isAdPlaying}
            onEnded={() => {
              setIsAdPlaying(false);
            }}
            width="100%"
            height="100%"
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
