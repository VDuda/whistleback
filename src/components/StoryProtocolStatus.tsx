'use client';

import { useEffect, useState } from 'react';
import { isUsingRealTestNet } from '@/lib/story-protocol-config';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export function StoryProtocolStatus() {
  const [isReal, setIsReal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsReal(isUsingRealTestNet());
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Only show the status banner when in real mode
  // Mock mode is indicated by the slider in the header
  if (isReal) {
    return (
      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="w-5 h-5 text-green-400" />
          <div>
            <h4 className="text-green-400 font-medium">Story Protocol TestNet Active</h4>
            <p className="text-green-300/70 text-sm">
              Using real TestNet - Evidence uploads create real IP Assets
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Don't show anything in mock mode
  return null;
}
