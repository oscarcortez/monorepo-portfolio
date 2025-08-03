
import { useWindowScroll } from '@uidotdev/usehooks';
import React, { useEffect, useState } from 'react';
import { config } from './constants';

export const ConsoleLogo = () => {
  const [showGreetingConsole, setShowGreetingConsole] = useState(false);
  const [{ x, y }] = useWindowScroll();

  useEffect(() => {
    if ((y ?? 0) >= config.SHOW_GREETING_SCROLL_Y) {
      setShowGreetingConsole(true);
    } else {
      setShowGreetingConsole(false);
    }
  }, [y]);

  return (
    <>
      <span className="sr-only">{config.SCREEN_READER_LABEL}</span>
      <div
        className={`transition-opacity duration-500 ${showGreetingConsole ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="w-fit px-1 py-0 md:px-4 md:py-2 font-mono border-4 border-t-0 rounded-b-xl bg-gradient-to-r from-blue-100 via-white to-pink-100 border-blue-500 shadow-lg transition-opacity duration-300 opacity-100">
          <div className="text-2xl md:text-4xl tracking-tight">
            <span className="text-pink-500 drop-shadow-sm font-bold">{config.FIRST_WORD}</span>
            <span className="text-blue-500">{config.SECOND_WORD}</span>
          </div>
        </div>
      </div>
    </>
  )
}
