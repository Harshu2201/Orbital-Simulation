
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// Define the types for our context
interface AudioContextType {
  isPlaying: boolean;
  volume: number;
  toggleAudio: () => void;
  setVolume: (volume: number) => void;
  playClickSound: () => void;
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
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioAttempted, setAudioAttempted] = useState(false);

  // Set up audio elements
  useEffect(() => {
    // Using a CDN-hosted audio file for reliability
    const backgroundMusic = new Audio('https://cdn.pixabay.com/download/audio/2023/06/20/audio_55a1bda15d.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = volume;
    backgroundMusic.preload = 'auto';
    
    // Create click sound element
    const clickSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_1001f3697a.mp3');
    clickSound.volume = volume * 1.2; // Slightly louder than background
    clickSound.preload = 'auto';
    
    // Add better error handling and logging
    const handleCanPlayThrough = () => {
      console.log('Background audio loaded successfully and ready to play');
      setAudioLoaded(true);
    };
    
    const handleError = (e: Event) => {
      console.error('Error loading audio:', e);
      // Try fallback audio if primary source fails
      if (!audioAttempted) {
        console.log('Attempting to load fallback audio...');
        backgroundMusic.src = 'https://assets.mixkit.co/music/preview/mixkit-deep-space-74.mp3';
        setAudioAttempted(true);
      }
    };
    
    backgroundMusic.addEventListener('canplaythrough', handleCanPlayThrough);
    backgroundMusic.addEventListener('error', handleError);
    
    audioRef.current = backgroundMusic;
    clickSoundRef.current = clickSound;

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      if (clickSoundRef.current) {
        clickSoundRef.current.src = '';
        clickSoundRef.current = null;
      }
    };
  }, [volume, audioAttempted]);

  // Play click sound function
  const playClickSound = () => {
    if (!clickSoundRef.current) return;
    
    // Clone the audio to allow multiple overlapping sounds
    const clickSoundClone = clickSoundRef.current.cloneNode() as HTMLAudioElement;
    clickSoundClone.volume = volume;
    
    clickSoundClone.play()
      .catch(error => {
        console.error("Click sound playback prevented by browser:", error);
      });
  };

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
          });
      }
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (clickSoundRef.current) {
      clickSoundRef.current.volume = newVolume * 1.2; // Click sound slightly louder
    }
    setVolumeState(newVolume);
  };

  return (
    <AudioContext.Provider value={{ 
      isPlaying, 
      volume, 
      toggleAudio, 
      setVolume,
      playClickSound 
    }}>
      {children}
    </AudioContext.Provider>
  );
};
