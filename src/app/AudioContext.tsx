'use client';
// AudioContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context shape
interface AudioContextType {
  activeUrl: string;
  setActiveUrl: (url: string) => void;
}

// Create the context
const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Custom hook to access the context
export function useAudioContext() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error(
      'useAudioContext must be used within an AudioContextProvider'
    );
  }
  return context;
}

// Create a provider component
export function AudioContextProvider({ children }: { children: ReactNode }) {
  const [activeUrl, setActiveUrl] = useState<string>('');

  const contextValue: AudioContextType = {
    activeUrl,
    setActiveUrl,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}
