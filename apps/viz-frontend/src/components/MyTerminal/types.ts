import React from 'react';

export type MyTerminalProps = React.ComponentProps<'div'> & {
  initMessage?: string;
  prompt?: string;
  redBtnCallback?: () => void;
  yellowBtnCallback?: () => void;
  greenBtnCallback?: () => void;
};
