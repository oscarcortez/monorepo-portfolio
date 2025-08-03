import React, { JSX, useState } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import { MyTerminalProps } from './types';

function CustomTerminal({ initMessage, ...props }: MyTerminalProps): JSX.Element {
  const [terminalLineData, setTerminalLineData] = useState<React.ReactElement[]>(
    [<TerminalOutput key={0}>{initMessage || ''}</TerminalOutput>],
  );

  const handleTerminalInput = (terminalInput: string) => {
    // console.log(`New terminal input received: '${terminalInput}'`);

    if (terminalInput === 'clear') {
      setTerminalLineData([]);
      return;
    }

    if (terminalInput === 'help') {
      setTerminalLineData((prev) => [
        ...prev,
        <TerminalOutput key={prev.length}>
          Available commands: clear, help
        </TerminalOutput>,
      ]);
      return;
    }

    if (terminalInput === 'exit') {
      setTerminalLineData((prev) => [
        ...prev,
        <TerminalOutput key={prev.length}>
          Exiting the terminal...
        </TerminalOutput>,
      ]);
      return;
    }

    if (terminalInput === 'nav') {
      setTerminalLineData((prev) => [
        ...prev,
        <TerminalOutput key={prev.length}>
          Navigation command executed.
        </TerminalOutput>,
      ]);
      return;
    }

    // Default case: echo the input
    setTerminalLineData((prev) => [
      ...prev,
      <TerminalOutput key={prev.length}>{terminalInput}</TerminalOutput>,
    ]);
  };

  return (
    <Terminal
      name="fun terminal "
      prompt='OC (dev) $'
      redBtnCallback={() => {
        console.log('Red button clicked')
      }}
      greenBtnCallback={() => {
        console.log('Green button clicked')
      }}
      colorMode={ColorMode.Dark}
      onInput={handleTerminalInput}
    >
      {terminalLineData}

    </Terminal>)
}

export { CustomTerminal }