"use client";
import { useState } from "react";
import ReactPlayer from "react-player";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
// import CustomPlayer from "./customPlayer";

const VideoPlayer = () => {
  const adUrl = process.env.NEXT_PUBLIC_AD_URL;
  const [adSchedule, setAdSchedule] = useState([
    {
      time: 0,
      url: `${adUrl}`,
      played: false,
    },
    {
      time: 420,
      url: `${adUrl}`,
      played: false,
    },
    {
      time: 1200,
      url: `${adUrl}`,
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
          <IoIosArrowRoundBack
            className="absolute top-0 left-0 m-4 ml-3 text-6xl text-white p-2 cursor-pointer md:text-7xl md:ml-6 lg:text-8xl lg:ml-9"
            onClick={() => router.replace("/")}
          />
        </div>
      </div>
    </div>

    // <CustomPlayer url={url} />
  );
};

export default VideoPlayer;
