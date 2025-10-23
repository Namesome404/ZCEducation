import { useEffect } from 'react';

const SmoothScroll: React.FC = () => {
  useEffect(() => {
    // 平滑滚动到锚点
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // 添加CSS平滑滚动
    if (!document.documentElement.style.scrollBehavior) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return null;
};

export default SmoothScroll;

