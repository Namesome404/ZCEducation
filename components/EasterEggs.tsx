import { useEffect, useState } from 'react';

const EasterEggs = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);
  
  // Konami代码: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    let clickCount = 0;
    let clickTimer: NodeJS.Timeout;

    // Konami代码检测
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === konamiCode[konamiProgress].toLowerCase()) {
        setKonamiProgress(prev => prev + 1);
        
        if (konamiProgress + 1 === konamiCode.length) {
          triggerConfetti();
          setKonamiProgress(0);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    // Logo连续点击检测（5次）
    const handleLogoClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.nav-logo')) {
        clickCount++;
        clearTimeout(clickTimer);
        
        if (clickCount === 5) {
          triggerMatrixRain();
          clickCount = 0;
        } else {
          clickTimer = setTimeout(() => {
            clickCount = 0;
          }, 2000);
        }
      }
    };

    // 长时间无操作的动画
    const handleUserActivity = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        triggerIdleAnimation();
      }, 60000); // 1分钟
    };

    const triggerConfetti = () => {
      setShowConfetti(true);
      document.body.style.animation = 'rainbow 3s linear';
      
      setTimeout(() => {
        setShowConfetti(false);
        document.body.style.animation = '';
      }, 3000);
    };

    const triggerMatrixRain = () => {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '99999';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      document.body.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
      const fontSize = 14;
      const columns = canvas.width / fontSize;
      const drops: number[] = [];
      
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * canvas.height / fontSize;
      }
      
      let frameCount = 0;
      const maxFrames = 200;
      
      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        
        frameCount++;
        if (frameCount < maxFrames) {
          requestAnimationFrame(draw);
        } else {
          document.body.removeChild(canvas);
        }
      };
      
      draw();
    };

    const triggerIdleAnimation = () => {
      const particles = document.querySelector('.particle-canvas') as HTMLElement;
      if (particles) {
        particles.style.opacity = '1';
        particles.style.filter = 'hue-rotate(180deg)';
        
        setTimeout(() => {
          particles.style.opacity = '0.6';
          particles.style.filter = '';
        }, 5000);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleLogoClick);
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);
    
    handleUserActivity();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleLogoClick);
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
      clearTimeout(idleTimer);
      clearTimeout(clickTimer);
    };
  }, [konamiProgress]);

  return (
    <>
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                background: `hsl(${Math.random() * 360}, 70%, 60%)`,
              }}
            />
          ))}
        </div>
      )}
      
      <style jsx>{`
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 99999;
          overflow: hidden;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          opacity: 0;
          animation: confetti-fall 3s linear forwards;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotateZ(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
          }
        }

        @keyframes :global(rainbow) {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default EasterEggs;

