'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';

import monitorPcSvg from './svg/monitorPc.svg';
import cellphoneSvg from './svg/cellphone.svg';
import htmlTagSvg from './svg/htmlTag.svg';
import vscodeSvg from './svg/vscode.svg';
import cloudSvg from './svg/cloud.svg';

import './css/main.css';

type HeroLogoProps = React.HTMLAttributes<HTMLDivElement>;

export default function HeroLogo(props: HeroLogoProps) {
  const { loading } = useUserPublicData('088145ab-9f14-47ac-a3d4-0893afa92b4d');

  return (
    <div {...props} className={clsx('relative w-[320px] h-[210px]', props.className)}>
      {!loading ? (
        <>
          <Image
            src={monitorPcSvg}
            alt="Monitor PC"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          />
          <Image
            src={cloudSvg}
            alt="Cloud"
            className="absolute -left-3 -top-12 w-32 h-32 z-20 animate-slide-down"
            style={{ animationDelay: '0.6s' }}
          />
          <Image
            src={htmlTagSvg}
            alt="HTML Tag"
            className="absolute right-8 -top-3 w-14 h-14 z-20 animate-slide-down-right"
            style={{ animationDelay: '0.9s' }}
          />
          <Image
            src={cellphoneSvg}
            alt="Cellphone"
            className="absolute left-12 bottom-0 w-12 h-24 z-20 animate-slide-up"
            style={{ animationDelay: '1.2s' }}
          />
          <Image
            src={vscodeSvg}
            alt="VS Code"
            className="absolute left-15 top-10 w-12 h-4 z-20 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          />
        </>
      ) : (
        <Image
          src={'/svg/imageIcon.svg'}
          alt="Loading image"
          width={320}
          height={210}
          className="relative w-[320px] h-[210px]"
        />
      )}
    </div>
  );
}
