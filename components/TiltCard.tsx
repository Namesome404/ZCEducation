import React, { useRef, useState, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlowPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlowPosition({ x: 50, y: 50 });
  };

  return (
    <>
      <div
        ref={cardRef}
        className={`tilt-card ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform }}
      >
        <div 
          className="tilt-glow"
          style={{
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(99, 102, 241, 0.15), transparent 60%)`,
          }}
        />
        <div className="tilt-content">
          {children}
        </div>
      </div>
      <style jsx>{`
        .tilt-card {
          position: relative;
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .tilt-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .tilt-card:hover .tilt-glow {
          opacity: 1;
        }

        .tilt-content {
          position: relative;
          z-index: 2;
        }

        @media (prefers-reduced-motion: reduce) {
          .tilt-card {
            transform: none !important;
            transition: none;
          }
          .tilt-glow {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .tilt-card {
            transform: none !important;
          }
          .tilt-glow {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default TiltCard;

