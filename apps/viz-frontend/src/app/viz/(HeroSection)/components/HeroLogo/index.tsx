'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
// import { motion } from 'framer-motion';

import { useUserUuid } from 'src/app/viz/hooks/useUserUuid';
import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';

// import monitorPcSvg from './svg/monitorPc.svg';
// import cellphoneSvg from './svg/cellphone.svg';
// import htmlTagSvg from './svg/htmlTag.svg';
// import vscodeSvg from './svg/vscode.svg';
// import cloudSvg from './svg/cloud.svg';
import codeMonitorSvg from './svg/codeMonitor.svg';
import './css/main.css';

type HeroLogoProps = React.HTMLAttributes<HTMLDivElement>;

export default function HeroLogo(props: HeroLogoProps) {
  const userUuid = useUserUuid();
  const { loading } = useUserPublicData(userUuid);

  if (loading) {
    return (
      <div
        {...props}
        className={clsx(
          'relative w-[320px] h-[210px] flex items-center justify-center bg-slate-800/30 rounded-lg animate-pulse',
          props.className
        )}
      >
        <Image src={'/svg/imageIcon.svg'} alt="Loading image" width={100} height={100} className="opacity-60" />
      </div>
    );
  }

  // const items = [
  //   {
  //     src: monitorPcSvg,
  //     alt: 'Monitor PC',
  //     className: 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10',
  //     delay: 0.3,
  //   },
  //   { src: cloudSvg, alt: 'Cloud', className: 'absolute -left-3 -top-12 w-32 h-32 z-20', delay: 0.6 },
  //   { src: htmlTagSvg, alt: 'HTML Tag', className: 'absolute right-8 -top-3 w-14 h-14 z-20', delay: 0.9 },
  //   { src: cellphoneSvg, alt: 'Cellphone', className: 'absolute left-12 bottom-0 w-12 h-24 z-20', delay: 1.2 },
  //   { src: vscodeSvg, alt: 'VS Code', className: 'absolute left-16 top-10 w-12 h-4 z-20', delay: 1.5 },
  // ];

  return (
    <div className={clsx('flex items-center justify-center', props.className)}>
      <Image src={codeMonitorSvg} alt="Code Monitor" width={500} height={210} />
    </div>
  );
}
