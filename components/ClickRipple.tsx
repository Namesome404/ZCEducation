import React, { useEffect, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const ClickRipple: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples(prev => [...prev, newRipple]);

      // 移除ripple
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
      <style jsx>{`
        .ripple {
          position: fixed;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #6366f1;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          animation: ripple-expand 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes ripple-expand {
          0% {
            width: 20px;
            height: 20px;
            opacity: 1;
            border-width: 3px;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
            border-width: 1px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ripple {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default ClickRipple;

