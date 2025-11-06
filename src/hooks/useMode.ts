'use client';

import { useState, useEffect } from 'react';

type NetworkMode = 'mock' | 'real';

export function useMode() {
  // Always default to 'mock' for safety
  const [mode, setMode] = useState<NetworkMode>('mock');

  useEffect(() => {
    // Load mode from localStorage on mount
    // IMPORTANT: Only use 'real' if explicitly saved, otherwise default to 'mock'
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('whistleback-mode') as NetworkMode | null;
      if (savedMode === 'real') {
        setMode('real');
      }
      // Note: 'mock' is the default, so we don't need to set it
    }
  }, []);

  const toggleMode = (newMode: NetworkMode) => {
    setMode(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('whistleback-mode', newMode);

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
