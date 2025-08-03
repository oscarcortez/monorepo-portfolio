'use client';

import { useWindowScroll } from '@uidotdev/usehooks';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ShakeHandIcon from '@/src/svg/shakehandIcon.svg';

const motivationalMessages = [
  "You rock!",
  "Keep shining!",
  "Crushing it!",
  "Code like a boss!",
  "You got this, champ!",
  "Slay the day!",
  "Dev power!",
  "Fuel the hustle!",
  "Built to win!",
  "Hack the limits!",
  "Own the code!",
  "Ship it!",
  "Level up!",
  "Stay awesome!",
  "You’re fire! 🔥"
];

export const CellphoneLogoGreeting = () => {

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <span className="mt-4 text-4xl font-semibold text-slate-400">
          Welcome
        </span>
        <Image src={ShakeHandIcon} alt="Shake Hand Icon" width={100} height={100} className='text-slate-400' />
      </div>
    </>
  )
}
