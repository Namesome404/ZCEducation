import React, { useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const targetPosition = useRef<Position>({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('card') ||
        target.closest('.card') !== null;
      
      setIsHovering(isInteractive);
    };

    // 平滑跟随动画
    let animationFrameId: number;
    const animate = () => {
      setPosition(prev => {
        const dx = targetPosition.current.x - prev.x;
        const dy = targetPosition.current.y - prev.y;
        
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        };
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 检测触摸设备
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* 光晕层 */}
      <div
        ref={glowRef}
        className="cursor-glow"
        style={{
          left: `${targetPosition.current.x}px`,
          top: `${targetPosition.current.y}px`,
        }}
      />
      
      {/* 主光标 */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className="cursor-dot" />
      </div>

      <style jsx>{`
        .custom-cursor {
          position: fixed;
          width: 40px;
          height: 40px;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                      height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cursor-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          background: #1A1F2E;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .custom-cursor::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border: 2px solid rgba(26, 31, 46, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cursor-glow {
          position: fixed;
          width: 200px;
          height: 200px;
          pointer-events: none;
          z-index: 99998;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.08) 0%,
            rgba(99, 102, 241, 0.04) 40%,
            transparent 70%
          );
          transition: opacity 0.6s ease;
          opacity: 0.8;
        }

        .custom-cursor.hovering {
          width: 60px;
          height: 60px;
        }

        .custom-cursor.hovering::before {
          border-color: rgba(99, 102, 241, 0.6);
          width: 100%;
          height: 100%;
        }

        .custom-cursor.hovering .cursor-dot {
          width: 6px;
          height: 6px;
          background: #6366f1;
        }

        .custom-cursor.clicking {
          width: 35px;
          height: 35px;
        }

        .custom-cursor.clicking .cursor-dot {
          width: 12px;
          height: 12px;
        }

        @media (prefers-reduced-motion: reduce) {
          .custom-cursor,
          .cursor-dot,
          .cursor-glow {
            transition: none;
          }
        }

        :global(body) {
          cursor: none !important;
        }

        :global(a), :global(button), :global(input), :global(textarea) {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;

