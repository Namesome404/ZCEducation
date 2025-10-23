import React from "react";
import Head from "next/head";
import CharHover from "../components/CharHover";
import type { Outcome } from "../lib/data";

export default function Outcomes() {
  const [activeCard, setActiveCard] = React.useState<number | null>(null);
  const [outcomes, setOutcomes] = React.useState<Outcome[]>([]);

  React.useEffect(() => {
    fetch("/api/outcomes")
      .then((res) => res.json())
      .then((data) => setOutcomes(data))
      .catch((err) => console.error("Failed to load outcomes:", err));
  }, []);

  return (
    <>
      <Head>
        <title>Outcomes — ZC Education</title>
        <meta name="description" content="匿名案例：真实能力弧线，而非录取清单。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        <header className="page-header">
          <div>
            <h1 className="page-title">
              <CharHover text="结果" />
            </h1>
            <p className="page-subtitle">
              我们不展示 Offer 截图，而是展示能力如何被建构。以下是六个匿名案例，时间、领域与关键里程碑均真实。
            </p>
          </div>
          <div 
            className="scroll-indicator"
            onClick={() => {
              const section = document.querySelector('.section');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span>向下滚动探索</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </header>

        <div className="section">
          <div className="outcomes-grid">
            {outcomes.map((item, index) => (
              <article 
                key={item.id}
                className={`outcome-card ${activeCard === index ? "is-active" : ""}`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                onFocus={() => setActiveCard(index)}
                onBlur={() => setActiveCard(null)}
                tabIndex={0}
              >
                <div className="outcome-meta">
                  <span className="outcome-field">{item.field}</span>
                  <span className="outcome-duration">{item.duration}</span>
                </div>
                <p className="outcome-narrative">{item.narrative}</p>
                <div className="outcome-milestone">
                  <strong>关键节点：</strong>
                  {item.keyMilestone}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .outcomes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .outcome-card {
          padding: 28px;
          background: #F6F4EE;
          border-radius: 12px;
          transition: transform .22s cubic-bezier(.2,.8,.2,1), 
                      box-shadow .22s, 
                      background .22s;
          cursor: default;
          outline: none;
        }

        .outcome-card:focus-visible {
          outline: 2px solid #3E4C63;
          outline-offset: 4px;
        }

        .outcome-card.is-active {
          transform: translateY(-4px);
          background: white;
          box-shadow: 0 12px 40px rgba(0,0,0,.08);
        }

        .outcome-meta {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 16px;
          gap: 12px;
        }

        .outcome-field {
          font-size: 15px;
          font-weight: 500;
          color: #1A1F2E;
          letter-spacing: 0.2px;
        }

        .outcome-duration {
          font-size: 13px;
          color: #8D96A7;
          letter-spacing: 0.2px;
        }

        .outcome-narrative {
          font-size: 16px;
          line-height: 1.65;
          color: #3E4C63;
          margin-bottom: 16px;
        }

        .outcome-milestone {
          font-size: 14px;
          line-height: 1.6;
          color: #5B6470;
          padding-top: 16px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .outcome-milestone strong {
          color: #3E4C63;
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .outcomes-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .outcome-card {
            transition: box-shadow .3s, background .3s;
          }
          .outcome-card.is-active {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}

