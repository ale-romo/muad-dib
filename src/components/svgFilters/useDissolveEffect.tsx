import { useEffect, useRef, useState } from 'react';
import DissolveFilter from './DissolveFilter';

type UseDissolveEffectReturn = {
  dissolve: () => void;
  DissolveEffect: () => JSX.Element | null;
  styles: { filter: string };
};

const useDissolveEffect = (elementRef: React.RefObject<HTMLElement>): UseDissolveEffectReturn => {
  const filterRef = useRef<SVGFEComponentTransferElement>(null);
  const [state, setState] = useState<'idle' | 'dissolving' | 'dissolved'>('idle');

  useEffect(() => {
    if (!elementRef.current || state !== 'dissolving') return;

    const startTime = performance.now();
    const ANIMATION_DURATION = 600; // Animation duration in ms
    const FADE_START_POINT = 0.3; // When to start fading out

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

      // Calculate displacement scale
      const displacementScale = (1 - Math.cos((progress * Math.PI) / 1.5)) * 300;

      // Calculate opacity
      const opacityProgress = Math.max(0, (progress - FADE_START_POINT) / (1 - FADE_START_POINT));
      const opacity = 1 - opacityProgress;

      // Update filter scale
      if (filterRef.current) {
        filterRef.current.setAttribute('scale', displacementScale.toString());
      }

      // Update element opacity
      if (elementRef.current) {
        elementRef.current.style.opacity = opacity.toString();
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setState('dissolved');
      }
    };

    requestAnimationFrame(animate);
  }, [elementRef, state]);

  const dissolve = () => {
    if (state === 'idle') {
      setState('dissolving');
    }
  };

  const DissolveEffect = () => {
    if (state === 'dissolving') {
      const width = elementRef.current?.offsetWidth ?? 0;
      const height = elementRef.current?.offsetHeight ?? 0;

      if (width === 0 || height === 0) return null;

      return (
        <DissolveFilter
          width={width}
          height={height}
          seed={Math.floor(Math.random() * 1000)}
          ref={filterRef}
        />
      );
    }
    return null;
  };

  return {
    dissolve,
    DissolveEffect,
    styles: { filter: 'url(#dissolve-filter)' },
  };
};

export default useDissolveEffect;
