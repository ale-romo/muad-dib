import { forwardRef } from 'react';

interface DissolveFilterProps {
  height: number;
  seed: number;
  width: number;
}

const DissolveFilter = forwardRef<SVGFEComponentTransferElement, DissolveFilterProps>(
  (props, ref) => {
    const { height, seed, width } = props;

    return (
      <svg
        overflow="visible"
        style={{ position: 'absolute' }}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id="dissolve-filter"
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

export default DissolveFilter;
