'use client';

import { useCopyToClipboard } from '@uidotdev/usehooks';
import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { toast } from 'sonner';

import './index.css';

type HeroContactProps = {
  title: string;
  displayText: string;
  link?: string;
  iconPath: string; // Ruta a un archivo SVG importado o URL
  copyValue?: string; // Valor opcional para copiar al clipboard
  className?: string;
};

export default function HeroContact(props: HeroContactProps) {
  const [, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    if (props.copyValue) {
      copyToClipboard(props.copyValue);
      setIsCopied(true);
      toast(`${props.title}: ${props.copyValue} copied`);
      setTimeout(() => setIsCopied(false), 1000);
    }
  };

  return (
    <div
      className={clsx(
        'relative bg-slate-800 rounded-xl shadow flex items-center justify-between group transition py-3 px-5',
        props.className // Las clases de la BD se aplicarán después
      )}
    >
      <div>
        <h3 className="font-semibold text-lg text-slate-400">{props.title}</h3>
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
          src={props.iconPath}
          alt="Gmail Icon"
          width={28}
          height={28}
          className="transition-transform duration-200 group-hover:scale-120"
        />
      </div>
      {/* <button className="pi pi-check"></button> */}
      <button
        className={clsx(
          'text-slate-500 absolute bottom-2 right-2 hover:text-slate-400 active:text-slate-300 cursor-pointer transition-colors duration-200',
          {
            'pi pi-check': isCopied,
            'pi pi-clipboard': !isCopied,
          }
        )}
        // className="pi pi-clipboard text-slate-500 absolute bottom-2 right-2 hover:text-slate-400 active:text-slate-300 cursor-pointer transition-colors duration-200 z-20"
        title={'Copy to clipboard'}
        onClick={handleCopy}
        aria-label={`Copy ${props.title} to clipboard`}
      ></button>
    </div>
  );
}
