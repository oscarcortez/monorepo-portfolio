'use client';

import { useWindowScroll } from '@uidotdev/usehooks';
import React, { useEffect, useRef, useState } from 'react';
import { config } from './constants';

export const ConsoleLogoGreeting = () => {
  const [typedText, setTypedText] = useState(config.CURSOR);
  const [showTypedText, setShowTypedText] = useState(true);
  const fullText = config.FULL_TEXT;
  const indexRef = useRef(0);
  const [hide, setHide] = useState(false);

  const startTyping = () => {
    setTypedText(config.CURSOR);
    setShowTypedText(true);
    indexRef.current = 0;
    const interval = setInterval(() => {
      if (indexRef.current < fullText.length) {
        setTypedText((prev) => {
          const next = fullText.slice(0, indexRef.current + 1);
          return next.slice(-10);
        });
        indexRef.current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowTypedText(false);
        }, 500);
      }
    }, 150);
    return interval;
  };

  useEffect(() => {
    let interval = startTyping();
    return () => clearInterval(interval);

  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowTypedText(true);
    setTypedText("|");
    indexRef.current = 0;
    startTyping();
  };

  return (
    <>
      <span className="sr-only">LucoDev</span>
      {!hide && (
        <div className="w-full h-full bg-white font-mono text-2xl shadow-md border border-blue-500 ">
          <div className="flex items-center justify-between bg-blue-500" >
            <a
              onClick={handleClick}
              className="w-8 h-7 flex items-center justify-center text-sm text-blue-900 font-bold hover:text-gray-200 hover:bg-blue-900 transition-all duration-400 ease-in-out cursor-pointer"
            >{config.RELOAD_ICON}</a>
            <div className="flex">
              <span className="w-8 h-7 flex items-center justify-center text-sm text-blue-900 font-bold hover:text-gray-200 hover:bg-blue-900 transition-all duration-400 ease-in-out cursor-pointer">{config.MINIMIZE_ICON}</span>
              <span className="w-8 h-7 flex items-center justify-center text-sm text-blue-900 font-bold hover:text-gray-200 hover:bg-blue-900 transition-all duration-400 ease-in-out cursor-pointer">{config.MAXIMIZE_ICON}</span>
              <a
                onClick={() => setHide(true)}
                className="w-8 h-7 flex items-center justify-center text-sm font-bold text-blue-900 hover:text-gray-200 hover:bg-red-900 transition-all duration-400 ease-in-out cursor-pointer"
              >{config.CLOSE_ICON}
              </a>
            </div>
          </div>
          <div className="px-4 py-2 sm:text-6xl text-3xl text-pink-500">
            {showTypedText ? (
              <span className="text-blue-500">{typedText}</span>
            ) : (
              <>
                <span className="text-blue-500">{config.WELCOME}</span>
                <p>
                  <span className="text-pink-500">{config.FIRST_WORD}</span>
                  <span className="text-blue-500">({config.SECOND_WORD})</span>
                  <span className="text-gray-800 ml-2">{config.PROMPT_ICON}</span>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
