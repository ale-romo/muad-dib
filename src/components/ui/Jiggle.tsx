import { useState, useEffect, useRef, useId, ReactNode } from 'react';
import DissolveFilter from '../svgFilters/DissolveFilter';

const Jiggle = ({ children }: { children: ReactNode}) => {
  const [counter, setCounter] = useState(0);
  const [incrementing, setIncrementing] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const animationFrameId = useRef<number | null>(null);
  const counterRef = useRef(counter);
  const filterRef = useRef<SVGFEDisplacementMapElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  // Generate a unique ID for each instance
  const filterId = useId(); // Works in React 18+
  const uniqueFilterId = `dissolve-filter-${filterId}`;

  const animate = () => {
    const nextCounter = incrementing ? counterRef.current + 2 : counterRef.current - 2;
    const normalizedCounter = counterRef.current <= 25 ? counterRef.current : 50 - counterRef.current;
    const factor = Math.cos(normalizedCounter * Math.PI) * (1 - normalizedCounter) * .5;

    if (filterRef.current) {
      filterRef.current.setAttribute('scale', factor.toString());
    }

    if ((incrementing && nextCounter >= 50) || (!incrementing && nextCounter <= 0)) {
      cancelAnimationFrame(animationFrameId.current!);
      return;
    }

    counterRef.current = nextCounter;
    setCounter(nextCounter);

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId.current!);
  }, [incrementing]);

  // Measure dimensions after mount
  useEffect(() => {
    if (elementRef.current) {
      setDimensions({
        width: elementRef.current.offsetWidth,
        height: elementRef.current.offsetHeight,
      });
    }
  }, []);

  const handleMouseEnter = () => setIncrementing(true);
  const handleMouseLeave = () => setIncrementing(false);

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full items-stretch flex flex-col"
        ref={elementRef}
        style={{
          filter: `url(#${uniqueFilterId})`
        }}
      >
        {children}
      </div>
      <DissolveFilter
        id={uniqueFilterId}
        width={dimensions.width}
        height={dimensions.height}
        seed={Math.floor(Math.random() * 1000)}
        ref={filterRef}
      />
    </>
  );
};

export default Jiggle;
