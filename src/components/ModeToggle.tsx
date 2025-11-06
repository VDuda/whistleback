'use client';

import { useMode } from '@/hooks/useMode';

export function ModeToggle() {
  const { mode, toggleMode, isMock, isReal } = useMode();

  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200">
      {/* Mock Label */}
      <span
        className={`text-sm font-medium transition-all duration-200 ${
          isMock ? 'text-white' : 'text-gray-400'
        }`}
      >
        Mock
      </span>

      {/* Toggle Switch */}
      <div className="relative">
        <input
          type="checkbox"
          id="mode-toggle"
          checked={isReal}
          onChange={(e) => toggleMode(e.target.checked ? 'real' : 'mock')}
          className="sr-only"
        />
        <label
          htmlFor="mode-toggle"
          className="flex items-center cursor-pointer select-none"
        >
          <div
            className={`w-14 h-7 rounded-full transition-all duration-300 relative shadow-inner ${
              isReal
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/30'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          >
            <div
              className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transform transition-all duration-300 ${
                isReal
                  ? 'left-7 translate-x-0'
                  : 'left-0.5 translate-x-0'
              }`}
            />
          </div>
        </label>
      </div>

      {/* Real Label */}
      <span
        className={`text-sm font-medium transition-all duration-200 ${
          isReal ? 'text-white' : 'text-gray-400'
        }`}
      >
        Real
      </span>

      {/* Status Indicator */}
      <div className="ml-1 pl-2 border-l border-white/10 flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            isReal ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-amber-400'
          }`}
        />
        <span
          className={`text-xs font-medium transition-colors duration-200 ${
            isReal ? 'text-emerald-300' : 'text-amber-300'
          }`}
        >
          {isReal ? 'TestNet' : 'Dev'}
        </span>
      </div>
    </div>
  );
}
