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
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [videoUrl, setVideoUrl] = useState(url);
  const [isAdPlaying, setIsAdPlaying] = useState(false);

  const handleProgress = (progress) => {
    if (currentAd) return;

    const adToPlay = adSchedule.find(
      (ad) => progress.playedSeconds >= ad.time && !ad.played
    );

    if (
      adToPlay &&
      progress.playedSeconds >= adToPlay.time &&
      !adToPlay.played
    ) {
      setCurrentAd(adToPlay);
      setPlaybackPosition(progress.playedSeconds);
      setVideoUrl(adToPlay.url);
      setIsAdPlaying(true);
    }
  };

  const onAdEnded = () => {
    setAdSchedule((schedule) =>
      schedule.map((ad) =>
        ad.time === currentAd.time ? { ...ad, played: true } : ad
      )
    );
    setCurrentAd(null);
    setVideoUrl(url);
    setIsAdPlaying(false);
  };

  return (
    <div className="bg-black overflow-hidden fixed top-0 left-0 w-full h-full">
      <div
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        <ReactPlayer
          url={videoUrl}
          playing
          controls={!isAdPlaying}
          onProgress={handleProgress}
          onEnded={isAdPlaying ? onAdEnded : undefined}
          onReady={(player) =>
            !isAdPlaying && player.seekTo(playbackPosition, "seconds")
          }
          width="100%"
          height="100%"
        />
        <div className={isAdPlaying ? "hidden" : "block"}>
          <GrClose
            className="absolute top-0 right-0 m-4 mr-10 text-5xl text-white p-2 cursor-pointer"
            onClick={() => router.replace("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
