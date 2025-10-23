import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress-bar">
        <div 
          className="scroll-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <style jsx>{`
        .scroll-progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(99, 102, 241, 0.1);
          z-index: 10000;
          pointer-events: none;
        }

        .scroll-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
          transition: width 0.1s ease-out;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-progress-fill {
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

export default ScrollProgress;

