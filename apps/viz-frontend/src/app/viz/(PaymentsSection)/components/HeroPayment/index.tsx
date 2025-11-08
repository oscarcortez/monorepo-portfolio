'use client';

import clsx from 'clsx';
import Image from 'next/image';

import QrIcon from '../../svg/qr.svg';

// import './index.css';

type HeroPaymentProps = {
  title: string;
  displayText: string;
  link?: string;
  iconPath: string;
  className?: string;
  isFavorite?: boolean;
  sortOrder?: number;
};

export default function HeroPayment(props: HeroPaymentProps) {
  return (
    <div className={clsx('relative rounded-xl shadow flex items-center group transition py-3 px-5', props.className)}>
      <div className="flex items-center justify-center w-12 h-full min-h-[60px] mr-4 border-r border-slate-700 pr-4">
        <Image
          src={props.iconPath}
          alt={`${props.title} Bank Logo`}
          width={32}
          height={32}
          className="transition-transform duration-200 group-hover:scale-110 opacity-70"
        />
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg text-slate-400">
            {props.title} <span className="text-amber-400">{props.isFavorite ? '★' : ''}</span>
          </h3>
          {props.link ? (
            <a
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 group-hover:underline break-all"
            >
              {props.displayText}
            </a>
          ) : (
            <span className="text-slate-300 break-all">{props.displayText}</span>
          )}
        </div>
        <div className="flex items-center">
          <Image
            src={QrIcon}
            alt="Payment Icon"
            width={32}
            height={32}
            className="transition-transform duration-200 group-hover:scale-120 bg-slate-400 p-1 hover:cursor-pointer active:bg-green-200"
          />
        </div>
      </div>
    </div>
  );
}
