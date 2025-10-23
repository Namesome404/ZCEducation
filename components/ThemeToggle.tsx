import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 检查本地存储或系统偏好
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label="Toggle theme"
      >
        <div className={`toggle-icon ${isDark ? 'dark' : 'light'}`}>
          {isDark ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="5"
                stroke="currentColor"
                strokeWidth="2"
                fill="currentColor"
              />
              <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </button>
      <style jsx>{`
        .theme-toggle {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #E8EAED;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1000;
        }

        .theme-toggle:hover {
          transform: scale(1.1) rotate(15deg);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .theme-toggle:active {
          transform: scale(0.95) rotate(15deg);
        }

        .toggle-icon {
          color: #1A1F2E;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .toggle-icon.dark {
          transform: rotate(40deg);
        }

        .toggle-icon.light {
          transform: rotate(0deg);
        }

        :global(.dark) .theme-toggle {
          background: #1A1F2E;
          border-color: #2D3748;
        }

        :global(.dark) .toggle-icon {
          color: #F7F8FA;
        }

        @media (max-width: 768px) {
          .theme-toggle {
            width: 48px;
            height: 48px;
            bottom: 24px;
            right: 24px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .theme-toggle,
          .toggle-icon {
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

export default ThemeToggle;

