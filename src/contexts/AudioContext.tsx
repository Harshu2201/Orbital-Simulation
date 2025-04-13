
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  volume: number;
  toggleAudio: () => void;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioAttempted, setAudioAttempted] = useState(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/space-cinematic-epic.mp3');
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto';
    
    // Add a better error handling and logging
    const handleCanPlayThrough = () => {
      console.log('Audio loaded successfully and ready to play');
      setAudioLoaded(true);
    };
    
    const handleError = (e: Event) => {
      console.error('Error loading audio:', e);
      // Try fallback audio if primary source fails
      if (!audioAttempted) {
        console.log('Attempting to load fallback audio...');
        audio.src = '/ambient-space.mp3';
        setAudioAttempted(true);
      }
    };
    
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleError);
    
    audioRef.current = audio;

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [volume, audioAttempted]);

  const toggleAudio = () => {
    if (!audioRef.current) {
      console.log('Audio element not created yet');
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      console.log('Audio paused');
    } else {
      // Some browsers require user interaction before playing audio
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log('Audio playing');
          })
          .catch(error => {
            console.error("Audio playback prevented by browser:", error);
            // Add user-friendly notification that browser blocked autoplay
          });
      }
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolumeState(newVolume);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, volume, toggleAudio, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
};
