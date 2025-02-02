import { forwardRef } from 'react';

interface DissolveFilterProps {
  id: string;
  height: number;
  seed: number;
  width: number;
}

const DissolveFilter = forwardRef<SVGFEDisplacementMapElement, DissolveFilterProps>(
  ({ height, seed, width, id }, ref) => {
    return (
      <svg
        overflow="visible"
        style={{ position: 'absolute', pointerEvents: 'none' }}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id={id}
            width="400%"
            height="400%"
            x="-200%"
            y="-200%"
            colorInterpolationFilters="sRGB"
            overflow="visible"
          >
            {/* Large Noise */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="1"
              seed={seed}
              result="bigNoise"
            />
            {/* Adjust Noise Levels */}
            <feComponentTransfer in="bigNoise" result="bigNoiseAdjusted">
              <feFuncR type="linear" slope="2" intercept="-0.4" />
              <feFuncG type="linear" slope="2" intercept="-0.4" />
            </feComponentTransfer>
            {/* Fine Noise */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1"
              numOctaves="2"
              result="fineNoise"
            />
            {/* Combine Noises */}
            <feMerge result="combinedNoise">
              <feMergeNode in="bigNoiseAdjusted" />
              <feMergeNode in="fineNoise" />
            </feMerge>
            {/* Displacement Map */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              ref={ref}
            />
          </filter>
        </defs>
      </svg>
    );
  }
);

// Helps with debugging in React DevTools
DissolveFilter.displayName = "DissolveFilter";

export default DissolveFilter;
