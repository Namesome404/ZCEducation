import React, { useEffect, useRef } from 'react';

interface Step {
  key: string;
  title: string;
  body: string;
}

interface Props {
  steps: Step[];
}

const ApproachExperimental: React.FC<Props> = ({ steps }) => {
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepsRef.current.forEach((step) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            }
          });
        },
        { threshold: 0.3 }
      );

      if (step) {
        observer.observe(step);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <>
      <div className="approach-experimental">
        {steps.map((step, index) => (
          <div
            key={step.key}
            ref={(el) => {
              if (el) stepsRef.current[index] = el;
            }}
            className={`approach-step ${index % 2 === 0 ? 'step-left' : 'step-right'}`}
          >
            <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
            
            <div className="step-visual">
              <div className="visual-accent">
                {step.key === 'diagnosis' && <DiagnosisVisual />}
                {step.key === 'architecture' && <ArchitectureVisual />}
                {step.key === 'iteration' && <IterationVisual />}
                {step.key === 'presentation' && <PresentationVisual />}
                {step.key === 'transition' && <TransitionVisual />}
              </div>
            </div>

            <div className="step-content">
              <h2 className="step-title">{step.title}</h2>
              <p className="step-body">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .approach-experimental {
          padding: 15vh 5vw;
          max-width: 1400px;
          margin: 0 auto;
        }

        .approach-step {
          display: grid;
          grid-template-columns: 120px 1fr 1.5fr;
          gap: 60px;
          margin: 30vh 0;
          align-items: center;
          opacity: 0;
          transform: translateY(80px);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .approach-step.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        .approach-step.step-right {
          grid-template-columns: 1.5fr 1fr 120px;
        }

        .approach-step.step-right .step-number {
          order: 3;
        }

        .approach-step.step-right .step-visual {
          order: 2;
        }

        .approach-step.step-right .step-content {
          order: 1;
          text-align: right;
        }

        .step-number {
          font-size: 140px;
          font-weight: 700;
          line-height: 1;
          color: rgba(26, 31, 46, 0.06);
          text-align: center;
        }

        .step-visual {
          position: relative;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .visual-accent {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-title {
          font-size: clamp(40px, 5vw, 72px);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #1A1F2E;
          margin-bottom: 28px;
          transform: rotate(-2deg);
          display: inline-block;
        }

        .approach-step.step-right .step-title {
          transform: rotate(2deg);
        }

        .step-body {
          font-size: 19px;
          line-height: 1.7;
          color: #3E4C63;
          max-width: 550px;
        }

        .approach-step.step-right .step-body {
          margin-left: auto;
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .approach-step,
          .approach-step.step-right {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: left !important;
          }

          .approach-step.step-right .step-number,
          .approach-step.step-right .step-visual,
          .approach-step.step-right .step-content {
            order: unset;
          }

          .approach-step.step-right .step-body {
            margin-left: 0;
          }

          .step-number {
            font-size: 100px;
            text-align: left;
          }

          .step-visual {
            height: 250px;
          }
        }

        @media (max-width: 600px) {
          .step-title {
            font-size: clamp(32px, 8vw, 60px);
          }

          .step-body {
            font-size: 17px;
          }

          .step-visual {
            height: 200px;
          }
        }

        /* Dark Mode */
        :global(.dark) .step-number {
          color: rgba(232, 234, 237, 0.06);
        }

        :global(.dark) .step-title {
          color: #E8EAED;
        }

        :global(.dark) .step-body {
          color: #9CA3AF;
        }
      `}</style>
    </>
  );
};

// Mini visualizations
const DiagnosisVisual = () => (
  <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', maxWidth: '250px' }}>
    <circle cx="100" cy="100" r="60" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.3">
      <animate attributeName="r" values="60;70;60" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="100" cy="100" r="40" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.5">
      <animate attributeName="r" values="40;50;40" dur="3s" begin="0.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="100" cy="100" r="8" fill="#6366f1" opacity="0.8" />
  </svg>
);

const ArchitectureVisual = () => (
  <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', maxWidth: '250px' }}>
    {[0, 1, 2, 3].map((i) => (
      <React.Fragment key={i}>
        <rect
          x={40 + i * 30}
          y={140 - i * 20}
          width="25"
          height={20 + i * 20}
          fill="#8b5cf6"
          opacity={0.3 + i * 0.15}
        >
          <animate attributeName="height" values={`${20 + i * 20};${30 + i * 20};${20 + i * 20}`} dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
        </rect>
      </React.Fragment>
    ))}
  </svg>
);

const IterationVisual = () => (
  <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', maxWidth: '250px' }}>
    <path
      d="M 100 40 Q 150 100 100 160 Q 50 100 100 40"
      fill="none"
      stroke="#ec4899"
      strokeWidth="3"
      opacity="0.4"
    >
      <animate
        attributeName="stroke-dasharray"
        values="0 300;300 0"
        dur="3s"
        repeatCount="indefinite"
      />
    </path>
    <circle cx="100" cy="40" r="5" fill="#ec4899">
      <animateMotion
        path="M 0 0 Q 50 60 0 120 Q -50 60 0 0"
        dur="3s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

const PresentationVisual = () => (
  <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', maxWidth: '250px' }}>
    <rect x="40" y="60" width="120" height="80" rx="8" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.4" />
    <line x1="60" y1="80" x2="140" y2="80" stroke="#3b82f6" strokeWidth="2" opacity="0.3">
      <animate attributeName="x2" values="60;140" dur="2s" repeatCount="indefinite" />
    </line>
    <line x1="60" y1="100" x2="140" y2="100" stroke="#3b82f6" strokeWidth="2" opacity="0.3">
      <animate attributeName="x2" values="60;140" dur="2s" begin="0.3s" repeatCount="indefinite" />
    </line>
    <line x1="60" y1="120" x2="140" y2="120" stroke="#3b82f6" strokeWidth="2" opacity="0.3">
      <animate attributeName="x2" values="60;140" dur="2s" begin="0.6s" repeatCount="indefinite" />
    </line>
  </svg>
);

const TransitionVisual = () => (
  <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', maxWidth: '250px' }}>
    <path
      d="M 40 100 L 160 100"
      stroke="#10b981"
      strokeWidth="3"
      opacity="0.4"
    />
    <circle cx="40" cy="100" r="8" fill="#10b981" opacity="0.6" />
    <circle cx="160" cy="100" r="8" fill="#10b981" opacity="0.6" />
    <circle cx="100" cy="100" r="10" fill="#10b981">
      <animate attributeName="cx" values="40;160;40" dur="4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default ApproachExperimental;

