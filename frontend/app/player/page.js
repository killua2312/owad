"use client";
import { useState } from "react";
import ReactPlayer from "react-player";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const VideoPlayer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = searchParams.get("url");

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
    <div className="bg-black overflow-hidden fixed top-0 left-0 w-full h-full">
      <div
        style={{
          display: isAdPlaying ? "none" : "block",
          width: "100%",
          height: "100vh",
        }}
      >
        <ReactPlayer
          url={url}
          playing={!isAdPlaying}
          controls
          onProgress={handleProgress}
          width="100%"
          height="100%"
        />
        <GrClose
          className="absolute top-0 right-0 m-4 mr-10 text-5xl text-white p-2 cursor-pointer"
          onClick={() => router.replace("/")}
        />
      </div>

      {isAdPlaying && (
        <div style={{ width: "100%", height: "100vh" }}>
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
