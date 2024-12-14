"use client";
import React from "react";
import { useAudioPlayer } from "@/hooks/useAudio";
import { Slider } from "@/components/ui/slider";

const playlist = [
  {
    title: "Death Bed",
    artist: "Powfu",
    artwork: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
    src: "https://samplesongs.netlify.app/Death%20Bed.mp3",
    id: "1",
  },
  {
    title: "Bad Liar",
    artist: "Imagine Dragons",
    artwork: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
    src: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
    id: "2",
  },
  {
    title: "Faded",
    artist: "Alan Walker",
    artwork: "https://samplesongs.netlify.app/album-arts/faded.jpg",
    src: "https://samplesongs.netlify.app/Faded.mp3",
    id: "3",
  },
  {
    title: "Hate Me",
    artist: "Ellie Goulding",
    artwork: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
    src: "https://samplesongs.netlify.app/Hate%20Me.mp3",
    id: "4",
  },
  {
    title: "Solo",
    artist: "Clean Bandit",
    artwork: "https://samplesongs.netlify.app/album-arts/solo.jpg",
    src: "https://samplesongs.netlify.app/Solo.mp3",
    id: "5",
  },
  {
    title: "Without Me",
    artist: "Halsey",
    artwork: "https://samplesongs.netlify.app/album-arts/without-me.jpg",
    src: "https://samplesongs.netlify.app/Without%20Me.mp3",
    id: "6",
  },
];

const AudioPlayer = () => {
  const {
    audio,
    state,
    controls,
    setVolume,
    playNext,
    playPrevious,
    playRandom,
  } = useAudioPlayer(playlist);

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  // console.log({ statesxcv: state });

  return (
    <div className="w-full p-4 space-y-4">
      <div>{audio}</div>

      {/* Track Info */}
      <div className="flex items-center justify-between">
        <span className="text-sm">{formatTime(state.time)}</span>
        <span className="text-sm">{formatTime(state.duration)}</span>
      </div>

      {/* Progress Slider */}
      <Slider
        value={[state.time || 0]}
        max={state.duration || 0}
        step={1}
        onValueChange={(value) => controls.seek(value[0])}
        className="w-full"
      />

      {/* Volume Control */}
      <div className="flex items-center gap-4">
        <span className="text-sm">Volume</span>
        <Slider
          value={[state.volume || 1]}
          max={1}
          step={0.01}
          onValueChange={(value) => setVolume(value[0])}
          className="w-full"
        />
      </div>

      {/* Playback Controls */}
      <div className="mt-4 flex justify-center gap-2">
        <button onClick={controls.play} className="btn btn-primary">
          Play
        </button>
        <button onClick={controls.pause} className="btn btn-secondary">
          Pause
        </button>
        <button onClick={playNext} className="btn btn-primary">
          Play Next
        </button>
        <button onClick={playPrevious} className="btn btn-secondary">
          Play Previous
        </button>

        <button onClick={playRandom} className="btn btn-secondary">
          Play Random
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
