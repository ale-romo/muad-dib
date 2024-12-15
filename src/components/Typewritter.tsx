import { useState, useEffect, useRef } from 'react';
import MdText from 'src/lib/MdText';

type TypewriterProps = {
  text: string;
  speed?: number; // Typing speed in milliseconds (default: 100ms per character)
};

/**
 * Functional typewriter simulation
 * @param {TypewriterProps} props - Props for the typewriter
 */
const Typewriter = ({ text, speed = 100 }: TypewriterProps) => {
  const [currentText, setCurrentText] = useState('');
  const indexRef = useRef(0); // Ref to track the index
  const textRef = useRef(currentText); // Ref to track currentText as well

  useEffect(() => {
    const typeNextChar = () => {
      if (indexRef.current < text.length) {
        const newText = textRef.current + text.charAt(indexRef.current);
        textRef.current = newText; // Update the textRef with the new text
        setCurrentText(newText); // Update the state
        indexRef.current += 1; // Increment the index
      }
    };

    const typingInterval = setInterval(typeNextChar, speed);

    // Cleanup on component unmount or when `text` or `speed` change
    return () => clearInterval(typingInterval);
  }, [text, speed]); // Re-run when `text` or `speed` changes

  return <MdText text={currentText} className="flex flex-col gap-4" />;
};

export default Typewriter;
