import React, { useRef, useState, useCallback } from "react";
import ReactPlayer from "react-player";
import {
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiMaximize,
  FiMinimize,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";

function CustomPlayer({ url }) {
  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [played, setPlayed] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const safelyAccessPlayer = (action) => {
    const player = playerRef.current;
    if (player && player.getInternalPlayer()) {
      action(player.getInternalPlayer());
    }
  };

  const skipTime = 10;

  const formatTime = (seconds) => {
    const rounded = Math.round(seconds);
    const minutes = Math.floor(rounded / 60);
    const remainingSeconds = rounded % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handlePlayPause = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
    setMuted(e.target.value === "0");
  };

  const handleSkip = (direction) => {
    const currentTime = playerRef.current.getCurrentTime();
    const newTime =
      direction === "forward" ? currentTime + skipTime : currentTime - skipTime;
    playerRef.current.seekTo(newTime);
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
    setCurrentTime(state.playedSeconds);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setPlaying(false);
  };

  const handleSeekMouseUp = (e) => {
    setPlaying(true);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  return (
    <div
      ref={playerContainerRef}
      className="bg-black fixed top-0 left-0 w-full h-full"
      onClick={handlePlayPause}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        controls={false}
        width="100%"
        height="100%"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="w-[96%] mx-auto my-0 flex justify-around">
          {/* Progress Bar */}
          <div>{formatTime(currentTime)}</div>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            className="w-[95%] mx-auto my-0"
          />
          <div></div>
        </div>
        <div className="w-[95%] mx-auto my-6 flex justify-between">
          <div className="w-[10%] flex gap-3">
            {/* Mute/Unmute Button */}
            <button onClick={handleMute} className="text-2xl">
              {muted ? <FiVolumeX /> : <FiVolume2 />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20"
            />
          </div>

          <div className="w-[10%] flex justify-between">
            {/* Skip Buttons */}
            <button onClick={() => handleSkip("backward")} className="text-2xl">
              <FiSkipBack />
            </button>
            {/* Play/Pause Button */}
            <button onClick={handlePlayPause} className="text-2xl">
              {playing ? <FiPause /> : <FiPlay />}
            </button>
            <button onClick={() => handleSkip("forward")} className="text-2xl">
              <FiSkipForward />
            </button>
          </div>

          {/* Fullscreen Button */}
          <button onClick={toggleFullscreen} className="text-2xl">
            {isFullscreen ? <FiMinimize /> : <FiMaximize />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomPlayer;
