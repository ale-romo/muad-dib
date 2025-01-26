import { useRef } from 'react';
import useDissolveEffect from './useDissolveEffect';

const DissolveButton = () => {
  const buttonRef = useRef(null);
  const { dissolve, DissolveEffect, styles } = useDissolveEffect(buttonRef);

  return (
    <>
      <div
        ref={buttonRef}
        onClick={dissolve}
        style={{
          ...styles,
          padding: '16px 48px',
          borderRadius: '4px',
          background: '#3f1e23',
          color: '#fe4a4b',
          fontFamily: 'monospace',
          cursor: 'pointer',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        Dissolve
      </div>
      <DissolveEffect />
    </>
  );
};

export default DissolveButton;
