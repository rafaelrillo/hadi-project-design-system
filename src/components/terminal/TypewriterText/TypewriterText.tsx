// src/components/terminal/TypewriterText/TypewriterText.tsx
import { TypeAnimation } from 'react-type-animation';
import styles from './TypewriterText.module.css';

type SpeedType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99;

export interface TypewriterTextProps {
  sequence: (string | number | (() => void))[];
  speed?: number;
  cursor?: boolean;
  repeat?: number;
  className?: string;
  wrapper?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3';
  omitDeletionAnimation?: boolean;
  splitter?: (text: string) => string[];
  preRenderFirstString?: boolean;
  cursorStyle?: 'pipe' | 'block' | 'underscore';
}

const cursorStyles = {
  pipe: styles.cursorPipe,
  block: styles.cursorBlock,
  underscore: styles.cursorUnderscore
};

export function TypewriterText({
  sequence,
  speed = 50,
  cursor = true,
  repeat = 0,
  className = '',
  wrapper = 'span',
  omitDeletionAnimation = false,
  splitter,
  preRenderFirstString = false,
  cursorStyle = 'pipe'
}: TypewriterTextProps) {
  const getClassName = (): string => {
    const classes = [styles.typewriter];
    if (cursor && cursorStyle) {
      classes.push(cursorStyles[cursorStyle]);
    }
    if (className) classes.push(className);
    return classes.join(' ');
  };

  return (
    <TypeAnimation
      sequence={sequence}
      speed={speed as SpeedType}
      cursor={cursor}
      repeat={repeat}
      wrapper={wrapper}
      className={getClassName()}
      omitDeletionAnimation={omitDeletionAnimation}
      splitter={splitter}
      preRenderFirstString={preRenderFirstString}
    />
  );
}

// Preset splitters for common use cases
export const wordSplitter = (str: string): string[] => str.split(/(?= )/);
export const characterSplitter = (str: string): string[] => str.split('');
