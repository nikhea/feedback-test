"use client";
import { useState, useEffect } from "react";
// import { useState } from "react";

import { useAudio } from "react-use";

export const useAudioPlayer = (playlistOrSingle: unknown, initialIndex = 0) => {
  // If a single audio is passed, convert it into a one-item playlist
  const playlist = Array.isArray(playlistOrSingle)
    ? playlistOrSingle
    : [playlistOrSingle];

  // State to manage the current track index
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialIndex);

  // Get the current track from the playlist
  const currentTrack = playlist[currentTrackIndex];

  // useAudio hook for playback
  const [audio, state, controls] = useAudio({
    src: currentTrack.src,
    autoPlay: true,
  });

  // Play the next track
  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length); // Loop back to the start
  };

  // Play the previous track
  const playPrevious = () => {
    setCurrentTrackIndex(
      (prev) => (prev - 1 + playlist.length) % playlist.length
    ); // Loop back to the end
  };

  // Play the first track
  const playFirst = () => {
    setCurrentTrackIndex(0);
  };

  // Play the last track
  const playLast = () => {
    setCurrentTrackIndex(playlist.length - 1);
  };

  // Play a random track
  const playRandom = () => {
    const randomIndex = Math.floor(Math.random() * playlist.length);
    setCurrentTrackIndex(randomIndex);
  };

  // Set volume
  const setVolume = (volume: number) => {
    // Ensure the volume is within the valid range (0 to 1)
    const validVolume = Math.min(1, Math.max(0, volume));
    controls.volume(validVolume);
  };

  // Automatically play the next track when the current one ends
  useEffect(() => {
    // Check if the track has ended and it's not paused
    if (state.duration > 0 && state.time === state.duration && !state.paused) {
      // Play the next track
      playNext();
    }
  }, [state.time, state.duration, state.paused, playlist.length]);

  // useEffect(() => {
  //   controls.src(currentTrack.src);
  //   controls.play();
  // }, [currentTrackIndex])

  return {
    audio,
    state,
    controls,
    currentTrack,
    playNext,
    playPrevious,
    playFirst,
    playLast,
    playRandom,
    setVolume, // Expose the volume control
    setTrackByIndex: setCurrentTrackIndex, // Allows setting the track directly
    isPlaylist: playlist.length > 1, // To identify if it's a playlist
  };
};

// useEffect(() => {
//   if (state.buffered[0].end) {
//     playNext();
//   }
// }, [state.buffered[0].end]);
