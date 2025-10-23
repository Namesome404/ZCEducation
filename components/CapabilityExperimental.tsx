import React, { useEffect, useRef } from 'react';

interface Step {
  key: string;
  title: string;
  body: string;
}

interface Props {
  steps: Step[];
}

const CapabilityExperimental: React.FC<Props> = ({ steps }) => {
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionsRef.current.forEach((section, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.2 }
      );

      if (section) {
        observer.observe(section);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const renderSection = (step: Step, index: number) => {
    const { key, title, body } = step;

    switch (key) {
      case 'curiosity':
        return (
          <section
            key={key}
            ref={(el) => {
              if (el) sectionsRef.current[index] = el;
            }}
            className={`capability-section-exp capability-${key}`}
          >
            <div className="section-content">
              <h2 className="exp-title exp-title-spiral">
                {title.split('').map((char, i) => (
                  <span
                    key={i}
                    style={{
                      transform: `rotate(${i * 5}deg) translateY(${i * -2}px)`,
                      display: 'inline-block',
                      transformOrigin: 'center',
                    }}
                  >
                    {char}
                  </span>
                ))}
              </h2>
              <div className="exp-body exp-body-offset">
                <p>{body}</p>
              </div>
            </div>
          </section>
        );

      case 'craft':
        return (
          <section
            key={key}
            ref={(el) => {
              if (el) sectionsRef.current[index] = el;
            }}
            className={`capability-section-exp capability-${key}`}
          >
            <div className="section-content section-grid">
              <div className="grid-title">
                <h2 className="exp-title exp-title-mono">{title}</h2>
              </div>
              <div className="grid-body">
                <p className="exp-body">{body}</p>
              </div>
              <div className="grid-accent">
                <span className="accent-number">02</span>
              </div>
            </div>
          </section>
        );

      case 'voice':
        return (
          <section
            key={key}
            ref={(el) => {
              if (el) sectionsRef.current[index] = el;
            }}
            className={`capability-section-exp capability-${key}`}
          >
            <div className="section-content section-wave">
              <h2 className="exp-title exp-title-wave">
                {title.split('').map((char, i) => (
                  <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                    {char}
                  </span>
                ))}
              </h2>
              <div className="exp-body exp-body-skew">
                <p>{body}</p>
              </div>
            </div>
          </section>
        );

      case 'impact':
        return (
          <section
            key={key}
            ref={(el) => {
              if (el) sectionsRef.current[index] = el;
            }}
            className={`capability-section-exp capability-${key}`}
          >
            <div className="section-content section-explosion">
              <div className="explosion-wrapper">
                <h2 className="exp-title exp-title-impact">{title}</h2>
                <div className="impact-lines">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="impact-line"
                      style={{ transform: `rotate(${i * 45}deg)` }}
                    />
                  ))}
                </div>
              </div>
              <div className="exp-body exp-body-side">
                <p>{body}</p>
              </div>
            </div>
          </section>
        );

      case 'fit':
        return (
          <section
            key={key}
            ref={(el) => {
              if (el) sectionsRef.current[index] = el;
            }}
            className={`capability-section-exp capability-${key}`}
          >
            <div className="section-content section-puzzle">
              <h2 className="exp-title exp-title-gradient">{title}</h2>
              <div className="puzzle-grid">
                <div className="puzzle-piece puzzle-piece-1">
                  <span>能力</span>
                </div>
                <div className="puzzle-piece puzzle-piece-2">
                  <span>环境</span>
                </div>
                <div className="puzzle-piece puzzle-piece-3">
                  <p className="exp-body">{body}</p>
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="capability-experimental-wrapper">
        {steps.map((step, index) => renderSection(step, index))}
      </div>

      <style jsx>{`
        .capability-experimental-wrapper {
          position: relative;
          background: linear-gradient(to bottom, #FDFCFA 0%, #F9F8F5 50%, #FDFCFA 100%);
        }

        .capability-section-exp {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10vh 5vw;
          position: relative;
          opacity: 0;
          transform: translateY(50px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .capability-section-exp.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section-content {
          max-width: 1200px;
          width: 100%;
        }

        /* === CURIOSITY: Spiral Layout === */
        .capability-curiosity .section-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .exp-title-spiral {
          font-size: clamp(60px, 10vw, 120px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.03em;
          color: #1A1F2E;
          margin-bottom: 60px;
          perspective: 1000px;
        }

        .exp-body-offset {
          max-width: 500px;
          margin-left: 20vw;
          transform: rotate(2deg);
          font-size: 20px;
          line-height: 1.7;
          color: #3E4C63;
        }

        /* === CRAFT: Grid Layout === */
        .section-grid {
          display: grid;
          grid-template-columns: 2fr 3fr;
          grid-template-rows: auto 1fr;
          gap: 60px;
          align-items: start;
        }

        .grid-title {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }

        .exp-title-mono {
          font-family: 'Courier New', monospace;
          font-size: clamp(50px, 8vw, 100px);
          font-weight: 700;
          letter-spacing: 0.2em;
          line-height: 1.3;
          color: #1A1F2E;
          word-break: break-word;
        }

        .grid-body {
          grid-column: 2 / 3;
          grid-row: 1 / 3;
          align-self: center;
        }

        .grid-body .exp-body {
          font-size: 19px;
          line-height: 1.8;
          color: #3E4C63;
          max-width: 600px;
        }

        .grid-accent {
          grid-column: 1 / 2;
          grid-row: 2 / 3;
          align-self: end;
        }

        .accent-number {
          font-size: 200px;
          font-weight: 700;
          line-height: 1;
          color: rgba(26, 31, 46, 0.04);
        }

        /* === VOICE: Wave Typography === */
        .section-wave {
          text-align: center;
        }

        .exp-title-wave {
          font-size: clamp(70px, 12vw, 140px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.04em;
          color: #1A1F2E;
          margin-bottom: 80px;
          display: flex;
          justify-content: center;
        }

        .exp-title-wave span {
          display: inline-block;
          animation: wave 2s ease-in-out infinite;
        }

        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .exp-body-skew {
          max-width: 550px;
          margin: 0 auto;
          transform: skewY(-2deg);
          font-size: 20px;
          line-height: 1.7;
          color: #3E4C63;
        }

        /* === IMPACT: Explosion Layout === */
        .section-explosion {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }

        .explosion-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .exp-title-impact {
          font-size: clamp(60px, 10vw, 120px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #1A1F2E;
          position: relative;
          z-index: 2;
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .impact-lines {
          position: absolute;
          width: 300px;
          height: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .impact-line {
          position: absolute;
          width: 2px;
          height: 150px;
          background: linear-gradient(to bottom, #6366f1, transparent);
          top: 50%;
          left: 50%;
          transform-origin: center;
          animation: radiate 2s ease-out infinite;
          opacity: 0.3;
        }

        @keyframes radiate {
          0% {
            transform: translateX(-50%) scaleY(0);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(-50%) scaleY(1);
            opacity: 0;
          }
        }

        .exp-body-side {
          font-size: 19px;
          line-height: 1.7;
          color: #3E4C63;
        }

        /* === FIT: Puzzle Layout === */
        .section-puzzle {
          text-align: center;
        }

        .exp-title-gradient {
          font-size: clamp(60px, 10vw, 120px);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1;
          background: linear-gradient(135deg, #1A1F2E 0%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 60px;
        }

        .puzzle-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          max-width: 800px;
          margin: 0 auto;
        }

        .puzzle-piece {
          padding: 60px 40px;
          background: #F6F4EE;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 600;
          color: #1A1F2E;
          transform: rotate(0deg);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .puzzle-piece-1 {
          transform: rotate(-3deg);
        }

        .puzzle-piece-2 {
          transform: rotate(2deg);
        }

        .puzzle-piece-3 {
          grid-column: 1 / 3;
          background: white;
          padding: 40px;
          transform: rotate(0deg);
        }

        .puzzle-piece:hover {
          transform: rotate(0deg) scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .puzzle-piece-3 .exp-body {
          font-size: 18px;
          line-height: 1.7;
          color: #3E4C63;
          text-align: left;
        }

        /* === RESPONSIVE === */
        @media (max-width: 900px) {
          .section-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .grid-body {
            grid-column: 1 / 2;
            grid-row: 2 / 3;
          }

          .grid-accent {
            grid-row: 3 / 4;
          }

          .section-explosion {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .puzzle-grid {
            grid-template-columns: 1fr;
          }

          .puzzle-piece-3 {
            grid-column: 1 / 2;
          }

          .exp-body-offset {
            margin-left: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .exp-title-wave span,
          .exp-title-impact,
          .impact-line {
            animation: none;
          }

          .capability-section-exp {
            transition: opacity 0.3s ease;
            transform: none;
          }
        }

        /* === DARK MODE === */
        :global(.dark) .capability-experimental-wrapper {
          background: linear-gradient(to bottom, #0f1419 0%, #161b22 50%, #0f1419 100%);
        }

        :global(.dark) .exp-title-spiral,
        :global(.dark) .exp-title-mono,
        :global(.dark) .exp-title-wave,
        :global(.dark) .exp-title-impact,
        :global(.dark) .puzzle-piece {
          color: #E8EAED;
        }

        :global(.dark) .exp-body-offset,
        :global(.dark) .grid-body .exp-body,
        :global(.dark) .exp-body-skew,
        :global(.dark) .exp-body-side,
        :global(.dark) .puzzle-piece-3 .exp-body {
          color: #9CA3AF;
        }

        :global(.dark) .puzzle-piece {
          background: #1a1f27;
        }

        :global(.dark) .puzzle-piece-3 {
          background: #252b36;
        }

        :global(.dark) .accent-number {
          color: rgba(232, 234, 237, 0.04);
        }
      `}</style>
    </>
  );
};

export default CapabilityExperimental;

