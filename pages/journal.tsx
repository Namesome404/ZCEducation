import React from "react";
import Head from "next/head";
import CharHover from "../components/CharHover";
import TiltCard from "../components/TiltCard";
import type { Article } from "../lib/data";

export default function Journal() {
  const [activeArticle, setActiveArticle] = React.useState<number | null>(null);
  const articleRefs = React.useRef<HTMLElement[]>([]);
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = React.useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Failed to load articles:", err));
  }, []);

  React.useEffect(() => {
    if (articles.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = articleRefs.current.findIndex((el) => el === e.target);
            if (idx !== -1) setActiveArticle(idx);
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -30% 0px" }
    );

    articleRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [articles]);

  const handleReadArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedArticle(null), 400);
  };

  return (
    <>
      <Head>
        <title>Journal — ZC Education</title>
        <meta name="description" content="方法论笔记：不追热点，只谈实践与思考。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        <header className="page-header">
          <div>
            <h1 className="page-title">
              <CharHover text="观察" />
            </h1>
            <p className="page-subtitle">
              不定期更新的方法论笔记。我们不追热点，只记录实践中的观察与反思。
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
          <div className="journal-list">
            {articles.map((article, index) => (
              <TiltCard key={article.id} className="card">
                <article
                  ref={(el) => { if (el) articleRefs.current[index] = el; }}
                  className={`journal-item ${activeArticle === index ? "is-active" : ""}`}
                  tabIndex={0}
                >
                  <div className="journal-meta">
                    <time className="journal-date">{article.date}</time>
                    <span className="journal-read-time">{article.readTime}</span>
                  </div>
                  <h2 className="journal-title">{article.title}</h2>
                  <p className="journal-excerpt">{article.excerpt}</p>
                  <button 
                    className="journal-link" 
                    aria-label={`阅读 ${article.title}`}
                  onClick={() => handleReadArticle(article)}
                >
                  阅读全文 →
                </button>
              </article>
              </TiltCard>
            ))}
          </div>
        </div>

        {isModalOpen && selectedArticle && (
          <ArticleModal 
            article={selectedArticle} 
            isOpen={isModalOpen}
            onClose={handleCloseModal} 
          />
        )}
      </div>

      <style jsx>{`
        .journal-list {
          max-width: 800px;
          margin: 0 auto;
        }

        .journal-item {
          padding: 40px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          transition: opacity .22s cubic-bezier(.2,.8,.2,1);
          opacity: 0.5;
          outline: none;
        }

        .journal-item:focus-visible {
          outline: 2px solid #3E4C63;
          outline-offset: 8px;
          border-radius: 8px;
        }

        .journal-item.is-active {
          opacity: 1;
        }

        .journal-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
          font-size: 13px;
          letter-spacing: 0.3px;
          color: #8D96A7;
        }

        .journal-title {
          font-size: 28px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #1A1F2E;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .journal-excerpt {
          font-size: 17px;
          line-height: 1.65;
          color: #5B6470;
          margin-bottom: 16px;
        }

        .journal-link {
          font-size: 15px;
          color: #3E4C63;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          letter-spacing: 0.2px;
          transition: color .18s cubic-bezier(.2,.8,.2,1);
        }

        .journal-link:hover,
        .journal-link:focus-visible {
          color: #1A1F2E;
          outline: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .journal-item {
            transition: opacity .3s;
          }
        }

        @media (max-width: 900px) {
          .journal-item {
            padding: 32px 0;
          }

          .journal-title {
            font-size: 24px;
          }

          .journal-excerpt {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}

function ArticleModal({ 
  article, 
  isOpen,
  onClose 
}: { 
  article: Article; 
  isOpen: boolean;
  onClose: () => void; 
}) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
      <div className={`article-modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
        <div className={`article-modal-content ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose} aria-label="关闭">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="modal-header">
            <div className="modal-meta">
              <time>{article.date}</time>
              <span className="modal-divider">·</span>
              <span>{article.readTime}</span>
            </div>
            <h1 className="modal-title">{article.title}</h1>
            <p className="modal-excerpt">{article.excerpt}</p>
          </div>

          <div className="modal-body">
            {article.content ? (
              <div className="article-content">
                {article.content.split('\n').map((paragraph, i) => (
                  paragraph.trim() && <p key={i}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <div className="no-content">
                <div className="no-content-icon">📝</div>
                <p className="no-content-text">正文内容即将发布</p>
                <p className="no-content-hint">敬请期待更新</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .article-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(26, 31, 46, 0);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(0px);
        }

        .article-modal-overlay.open {
          opacity: 1;
          background: rgba(26, 31, 46, 0.75);
          backdrop-filter: blur(8px);
        }

        .article-modal-content {
          background: #FDFCFA;
          border-radius: 24px;
          width: 100%;
          max-width: 800px;
          max-height: 85vh;
          overflow-y: auto;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25),
                      0 8px 32px rgba(0, 0, 0, 0.15);
          position: relative;
          transform: scale(0.9) translateY(40px);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .article-modal-content.open {
          transform: scale(1) translateY(0);
          opacity: 1;
        }

        .modal-close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 40px;
          height: 40px;
          border: none;
          background: rgba(26, 31, 46, 0.04);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          color: #5B6470;
          z-index: 10;
        }

        .modal-close:hover {
          background: rgba(26, 31, 46, 0.08);
          transform: rotate(90deg) scale(1.1);
          color: #1A1F2E;
        }

        .modal-header {
          padding: 64px 60px 40px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          animation: slideInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }

        .modal-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: #8D96A7;
          letter-spacing: 0.02em;
          margin-bottom: 20px;
        }

        .modal-divider {
          color: rgba(141, 150, 167, 0.4);
        }

        .modal-title {
          font-size: 42px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: #1A1F2E;
          margin: 0 0 20px 0;
          line-height: 1.2;
        }

        .modal-excerpt {
          font-size: 19px;
          line-height: 1.7;
          color: #5B6470;
          margin: 0;
        }

        .modal-body {
          padding: 40px 60px 60px;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }

        .article-content {
          font-size: 18px;
          line-height: 1.8;
          color: #3E4C63;
        }

        .article-content p {
          margin: 0 0 24px 0;
        }

        .article-content p:last-child {
          margin-bottom: 0;
        }

        .no-content {
          text-align: center;
          padding: 80px 40px;
        }

        .no-content-icon {
          font-size: 72px;
          margin-bottom: 24px;
          animation: float 3s ease-in-out infinite;
        }

        .no-content-text {
          font-size: 24px;
          font-weight: 500;
          color: #1A1F2E;
          margin: 0 0 12px 0;
        }

        .no-content-hint {
          font-size: 16px;
          color: #8D96A7;
          margin: 0;
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @media (max-width: 900px) {
          .article-modal-content {
            border-radius: 20px;
            max-height: 90vh;
          }

          .modal-close {
            top: 20px;
            right: 20px;
            width: 36px;
            height: 36px;
          }

          .modal-header {
            padding: 56px 40px 32px;
          }

          .modal-title {
            font-size: 32px;
          }

          .modal-excerpt {
            font-size: 17px;
          }

          .modal-body {
            padding: 32px 40px 48px;
          }

          .article-content {
            font-size: 17px;
          }
        }

        @media (max-width: 600px) {
          .article-modal-overlay {
            padding: 20px;
          }

          .article-modal-content {
            border-radius: 16px;
          }

          .modal-close {
            top: 16px;
            right: 16px;
          }

          .modal-header {
            padding: 52px 28px 28px;
          }

          .modal-title {
            font-size: 28px;
          }

          .modal-excerpt {
            font-size: 16px;
          }

          .modal-body {
            padding: 28px 28px 40px;
          }

          .no-content {
            padding: 60px 24px;
          }

          .no-content-icon {
            font-size: 60px;
          }

          .no-content-text {
            font-size: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .article-modal-overlay,
          .article-modal-content,
          .modal-close {
            transition: opacity 0.3s;
          }

          .article-modal-content {
            transform: none;
          }

          .article-modal-content.open {
            transform: none;
          }

          .modal-close:hover {
            transform: none;
          }

          .modal-header,
          .modal-body {
            animation: none;
          }

          .no-content-icon {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

