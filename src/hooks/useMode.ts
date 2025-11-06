'use client';

import { useState, useEffect } from 'react';

type NetworkMode = 'mock' | 'real';

export function useMode() {
  // Default to 'real' mode
  const [mode, setMode] = useState<NetworkMode>('real');

  console.log('[MODE] Hook rendering, current mode:', mode);

  useEffect(() => {
    console.log('[MODE] useEffect running, checking localStorage...');
    // Load mode from localStorage on mount
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('whistleback-mode') as NetworkMode | null;
      console.log('[MODE] localStorage value:', savedMode);
      if (savedMode === 'real' || savedMode === 'mock') {
        console.log('[MODE] Setting mode to:', savedMode);
        setMode(savedMode);
      } else {
        console.log('[MODE] No saved mode, using default: REAL');
        setMode('real');
        localStorage.setItem('whistleback-mode', 'real');
      }
    }
  }, []);

  const toggleMode = (newMode: NetworkMode) => {
    console.log('[MODE] toggleMode called, switching to:', newMode);
    setMode(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('whistleback-mode', newMode);
      console.log('[MODE] Saved to localStorage:', newMode);

      // Dispatch a custom event to notify clients of mode change
      window.dispatchEvent(new CustomEvent('modeChanged', { detail: { mode: newMode } }));
    }
  };

  return {
    mode,
    toggleMode,
    isMock: mode === 'mock',
    isReal: mode === 'real',
  };
}
