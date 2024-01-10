"use client";
import { useState } from "react";
import ReactPlayer from "react-player";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const VideoPlayer = () => {
  const [adSchedule, setAdSchedule] = useState([
    {
      time: 0,
      url: "http://localhost:5000/public/opAd/output.m3u8",
      played: false,
    },
    {
      time: 420,
      url: "http://localhost:5000/public/opAd/output.m3u8",
      played: false,
    },
    {
      time: 1200,
      url: "http://localhost:5000/public/opAd/output.m3u8",
      played: false,
    },
  ]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const url = searchParams.get("url");

  const [currentAd, setCurrentAd] = useState(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const handleProgress = (progress) => {
    if (currentAd) return;
    setPlayedSeconds(progress.playedSeconds);
    const adToPlay = adSchedule.find(
      (ad) => playedSeconds >= ad.time && !ad.played
    );

    if (adToPlay) {
      setCurrentAd(adToPlay);
    }
  };

  const onAdEnded = () => {
    setAdSchedule((schedule) =>
      schedule.map((ad) =>
        ad.time === currentAd.time ? { ...ad, played: true } : ad
      )
    );
    setCurrentAd(null);
  };

  return (
    <div className="bg-black overflow-hidden fixed top-0 left-0 w-full h-full">
      <div
        style={{
          display: Boolean(currentAd) ? "none" : "block",
          width: "100%",
          height: "100vh",
        }}
      >
        <ReactPlayer
          url={url}
          playing={!currentAd}
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

      {currentAd && (
        <div style={{ width: "100%", height: "100vh" }}>
          <ReactPlayer
            url={currentAd.url}
            playing={Boolean(currentAd)}
            onEnded={onAdEnded}
            width="100%"
            height="100%"
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
