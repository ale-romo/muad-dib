import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface WordByWordAnimationProps {
  children: ReactNode[];
}

// Recursively split the text into words while keeping JSX structure intact
const splitTextIntoWords = (content: ReactNode): ReactNode[] | ReactNode => {
  if (typeof content === 'string') {
    return content.split(' ').map((word, index) => (
      <React.Fragment key={index}>
        {word}
        {index !== content.split(' ').length - 1 && '\u00A0'}
      </React.Fragment>
    ));
  }

  if (React.isValidElement(content)) {
    const element = content as React.ReactElement;
    // Check if the element is a <br> tag
    if (element.type === 'br') {
      console.log(element)
      return element; // Return <br> element untouched
    }

    return React.cloneElement(element, {}, splitTextIntoWords(content.props.children));
  }

  if (Array.isArray(content)) {
    return content.flatMap((child) => splitTextIntoWords(child));
  }

  return [];
};

const WordByWordAnimation: React.FC<WordByWordAnimationProps> = ({ children }) => {
  const words = splitTextIntoWords(children);
  console.log(words)
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: .05, // Delay between each word's appearance
      },
    },
  };

  const wordAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-block"
    >
      {words && Array.isArray(words) && words.map((word: (ReactNode | ReactNode[] | string), index: number) => (
        <motion.span key={index} variants={wordAnimation}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default WordByWordAnimation;
