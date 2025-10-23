import React, { useRef, useState } from 'react';

interface InteractiveBgProps {
  children: React.ReactNode;
  intensity?: number;
}

const InteractiveBg: React.FC<InteractiveBgProps> = ({ children, intensity = 1 }) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bgRef.current) return;
    
    const rect = bgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePos({ x, y });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bgRef.current) return;
    
    const rect = bgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1500);
  };

  return (
    <div
      ref={bgRef}
      className="interactive-bg"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        '--mouse-x': mousePos.x,
        '--mouse-y': mousePos.y,
        '--intensity': intensity,
      } as React.CSSProperties}
    >
      {children}
      
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="bg-ripple"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
          }}
        />
      ))}

      <style jsx>{`
        .interactive-bg {
          position: relative;
          cursor: pointer;
        }

        .interactive-bg :global(svg) {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translate(
            calc((var(--mouse-x) - 0.5) * 20px * var(--intensity)),
            calc((var(--mouse-y) - 0.5) * 20px * var(--intensity))
          ) scale(1);
        }

        .interactive-bg:hover :global(svg) {
          filter: brightness(1.1) saturate(1.2);
          transform: translate(
            calc((var(--mouse-x) - 0.5) * 30px * var(--intensity)),
            calc((var(--mouse-y) - 0.5) * 30px * var(--intensity))
          ) scale(1.05);
        }

        .bg-ripple {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid rgba(99, 102, 241, 0.4);
          pointer-events: none;
          transform: translate(-50%, -50%);
          animation: bg-ripple-expand 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes bg-ripple-expand {
          0% {
            width: 20px;
            height: 20px;
            opacity: 1;
          }
          100% {
            width: 200px;
            height: 200px;
            opacity: 0;
            border-width: 1px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .interactive-bg :global(svg) {
            transform: none !important;
            filter: none !important;
            transition: none;
          }
          .bg-ripple {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .interactive-bg :global(svg) {
            transform: none !important;
          }
          .bg-ripple {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveBg;

