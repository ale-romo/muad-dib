import { useEffect, useRef, useState } from 'react';
import DissolveFilter from './DissolveFilter';

type UseDissolveEffectReturn = {
  dissolve: () => void;
  reintegrate: () => void;
  DissolveEffect: () => JSX.Element | null;
  styles: { filter: string };
};

const useDissolveEffect = (elementRef: React.RefObject<HTMLElement>): UseDissolveEffectReturn => {
  const filterRef = useRef<SVGFEComponentTransferElement>(null);
  const [state, setState] = useState<'idle' | 'dissolving' | 'dissolved' | 'reintegrating'>('idle');

  useEffect(() => {
    if (!elementRef.current || (state !== 'dissolving' && state !== 'reintegrating')) return;

    const startTime = performance.now();
    const ANIMATION_DURATION = 600;
    // const FADE_START_POINT = 0.3;
    const isDissolving = state === 'dissolving';

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

      // Adjust values based on dissolve or reintegrate
      const factor = isDissolving ? 1 - Math.cos(progress) : Math.sin(progress * Math.PI) * (1 - progress);
      const displacementScale = factor * 300;
      // const opacityProgress = Math.max(0, (progress - FADE_START_POINT) / (1 - FADE_START_POINT));
      // const opacity = isDissolving ? 1 - opacityProgress : opacityProgress;

      // Update filter scale
      if (filterRef.current) {
        filterRef.current.setAttribute('scale', displacementScale.toString());
      }

      // Update element opacity
      // if (elementRef.current) {
      //   elementRef.current.style.opacity = opacity.toString();
      // }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setState(isDissolving ? 'dissolved' : 'idle');
      }
    };

    requestAnimationFrame(animate);
  }, [elementRef, state]);

  const dissolve = () => {
    if (state === 'idle') {
      setState('dissolving');
    }
  };

  const reintegrate = () => {
    if (state === 'dissolved') {
      setState('reintegrating');
    }
  };

  const DissolveEffect = () => {
    if (state === 'dissolving' || state === 'reintegrating') {
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
    reintegrate,
    DissolveEffect,
    styles: { filter: 'url(#dissolve-filter)' },
  };
};

export default useDissolveEffect;
