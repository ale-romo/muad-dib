import React, { useState } from 'react';

interface TruncatedTextProps {
  text: string | number;
  maxLength?: number;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ text, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle text expansion
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  // Check if the text is a string and truncate if necessary
  const isString = typeof text === 'string';
  const truncatedText = isString ? truncateText(text, maxLength) : text;

  return (
    <div onClick={toggleText} style={{ cursor: 'pointer' }}>
      {isString ? (isExpanded ? text : truncatedText) : text}
    </div>
  );
};

// Function to truncate text at the end of the last complete word
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;

  let truncated = text.slice(0, maxLength);

  // Find the last space within the maxLength
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  // Truncate at the last space, if there is one
  if (lastSpaceIndex > -1) {
    truncated = text.slice(0, lastSpaceIndex) + '...';
  } else {
    // If no space is found, just append ellipses
    truncated = text.slice(0, maxLength) + '...';
  }

  return truncated;
};

export default TruncatedText;
