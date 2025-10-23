import React from "react";
import Head from "next/head";
import CharHover from "../components/CharHover";

const steps = [
  { 
    key: "curiosity", 
    title: "Curiosity", 
    body: "重新定义提问，让问题指向真实兴趣与可验证路径。不追逐热点，而是在交叉地带找到值得长期投入的课题。" 
  },
  { 
    key: "craft", 
    title: "Craft", 
    body: "把想法做成作品：方法、证据与复盘成为基本功。从文献综述到实验设计，每个环节都可被审视、改进、交付。" 
  },
  { 
    key: "voice", 
    title: "Voice", 
    body: "书面与口头表达的统一与分寸，不浮夸也不隐身。在 PS、面试、课堂讨论中传递清晰的学术自我。" 
  },
  { 
    key: "impact", 
    title: "Impact", 
    body: "小范围可验证影响：助教、开源、社群、微型研究。录取委员会看重的不是头衔，而是你真实改变了什么。" 
  },
  { 
    key: "fit", 
    title: "Fit", 
    body: "与学术环境的互相成就，录取只是结果而非目标。我们帮你找到真正契合的导师、项目与社群。" 
  },
];

export default function Home() {
  const [ctaVisible, setCtaVisible] = React.useState(false);
  const [showIntro, setShowIntro] = React.useState(true);
  const [introAnimated, setIntroAnimated] = React.useState(false);

  React.useEffect(() => {
    // 检查用户是否已经看过介绍
    const hasVisited = localStorage.getItem('zc_intro_seen');
    if (hasVisited) {
      setShowIntro(false);
    } else {
      // 触发入场动画
      setTimeout(() => setIntroAnimated(true), 100);
    }
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.6;
      setCtaVisible(scrolled > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEnter = () => {
    localStorage.setItem('zc_intro_seen', 'true');
    setShowIntro(false);
  };

  if (showIntro) {
    return (
      <>
        <Head>
          <title>ZC Education — Invitation Only</title>
          <meta name="description" content="高端学术申请咨询，以能力与气质塑造为核心。" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <div className={`intro-screen ${introAnimated ? 'animated' : ''}`}>
          <div className="intro-bg">
            {/* 背景动画元素 */}
            <div className="intro-circle intro-circle-1"></div>
            <div className="intro-circle intro-circle-2"></div>
            <div className="intro-circle intro-circle-3"></div>
          </div>
          
          <div className="intro-content">
            <h1 className="intro-title">
              <span className="intro-title-z">Z</span>
              <span className="intro-title-and">&</span>
              <span className="intro-title-c">C</span>
            </h1>
            <p className="intro-subtitle">高端 · 小众 · 邀请制学术咨询</p>
            <p className="intro-description">
              我们不追逐规模，只服务少数真正准备好的申请者
            </p>
            <button className="intro-button" onClick={handleEnter}>
              <span>进入</span>
              <span className="intro-button-arrow">→</span>
            </button>
          </div>

          <style jsx>{`
            .intro-screen {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: linear-gradient(135deg, #FDFCFA 0%, #F6F5F2 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 10000;
              overflow: hidden;
            }

            .intro-bg {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }

            .intro-circle {
              position: absolute;
              border-radius: 50%;
              background: radial-gradient(circle, rgba(62, 76, 99, 0.03) 0%, rgba(62, 76, 99, 0) 70%);
              animation: float 20s ease-in-out infinite;
            }

            .intro-circle-1 {
              width: 600px;
              height: 600px;
              top: -200px;
              right: -200px;
              animation-delay: 0s;
            }

            .intro-circle-2 {
              width: 400px;
              height: 400px;
              bottom: -100px;
              left: -100px;
              animation-delay: 2s;
            }

            .intro-circle-3 {
              width: 500px;
              height: 500px;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              animation-delay: 4s;
            }

            @keyframes float {
              0%, 100% {
                transform: translate(0, 0) scale(1);
              }
              33% {
                transform: translate(30px, -30px) scale(1.1);
              }
              66% {
                transform: translate(-20px, 20px) scale(0.9);
              }
            }

            .intro-content {
              position: relative;
              z-index: 1;
              text-align: center;
              padding: 0 40px;
            }

            .intro-title {
              font-size: 120px;
              font-weight: 500;
              letter-spacing: 0.05em;
              color: #1A1F2E;
              margin-bottom: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 20px;
              opacity: 0;
              transform: scale(0.8);
            }

            .intro-screen.animated .intro-title {
              animation: titleEnter 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            @keyframes titleEnter {
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            .intro-title-z,
            .intro-title-c {
              display: inline-block;
              opacity: 0;
            }

            .intro-screen.animated .intro-title-z {
              animation: letterEnter 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
            }

            .intro-screen.animated .intro-title-c {
              animation: letterEnter 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
            }

            @keyframes letterEnter {
              from {
                opacity: 0;
                transform: translateY(30px) rotate(-5deg);
              }
              to {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
              }
            }

            .intro-title-and {
              font-size: 80px;
              color: #5B6470;
              opacity: 0;
            }

            .intro-screen.animated .intro-title-and {
              animation: fadeIn 0.6s ease-out 0.7s forwards;
            }

            .intro-subtitle {
              font-size: 22px;
              letter-spacing: 0.08em;
              color: #3E4C63;
              margin-bottom: 16px;
              opacity: 0;
            }

            .intro-screen.animated .intro-subtitle {
              animation: fadeInUp 0.8s ease-out 1s forwards;
            }

            .intro-description {
              font-size: 17px;
              line-height: 1.6;
              color: #5B6470;
              margin-bottom: 56px;
              opacity: 0;
            }

            .intro-screen.animated .intro-description {
              animation: fadeInUp 0.8s ease-out 1.2s forwards;
            }

            @keyframes fadeIn {
              to {
                opacity: 1;
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

            .intro-button {
              position: relative;
              display: inline-flex;
              align-items: center;
              gap: 12px;
              padding: 12px 80px;
              font-size: 15px;
              font-weight: 500;
              letter-spacing: 0.05em;
              color: #1A1F2E;
              background: transparent;
              border: 1.5px solid rgba(26, 31, 46, 0.2);
              border-radius: 50px;
              cursor: pointer;
              opacity: 0;
              overflow: hidden;
              transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .intro-button::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 0;
              height: 100%;
              background: #1A1F2E;
              transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
              z-index: -1;
            }

            .intro-screen.animated .intro-button {
              animation: fadeInUp 0.8s ease-out 1.4s forwards;
            }

            .intro-button:hover {
              color: white;
              border-color: #1A1F2E;
              transform: translateY(-2px);
              box-shadow: 0 8px 32px rgba(26, 31, 46, 0.12);
            }

            .intro-button:hover::before {
              width: 100%;
            }

            .intro-button:active {
              transform: translateY(0);
            }

            .intro-button-arrow {
              font-size: 20px;
              transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .intro-button:hover .intro-button-arrow {
              transform: translateX(6px);
            }

            @media (max-width: 900px) {
              .intro-title {
                font-size: 80px;
                gap: 12px;
              }

              .intro-title-and {
                font-size: 56px;
              }

              .intro-subtitle {
                font-size: 18px;
              }

              .intro-description {
                font-size: 16px;
              }

              .intro-circle-1 {
                width: 400px;
                height: 400px;
              }

              .intro-circle-2 {
                width: 300px;
                height: 300px;
              }

              .intro-circle-3 {
                width: 350px;
                height: 350px;
              }
            }

            @media (max-width: 600px) {
              .intro-title {
                font-size: 72px;
                gap: 10px;
              }

              .intro-title-and {
                font-size: 48px;
              }

              .intro-subtitle {
                font-size: 17px;
              }

              .intro-description {
                font-size: 15px;
                margin-bottom: 44px;
              }

              .intro-button {
                padding: 11px 52px;
                font-size: 14px;
              }

              .intro-button-arrow {
                font-size: 18px;
              }
            }
          `}</style>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>ZC Education — Invitation Only</title>
        <meta name="description" content="高端学术申请咨询，以能力与气质塑造为核心。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        <header className="page-header">
          <div>
            <h1 className="page-title">
              <CharHover text="从好奇到契合" />
            </h1>
            <p className="page-subtitle">
              我们不晒 Offer，不堆砌服务清单。学术准备是一场能力的连续塑造，每一步都可被看见、可被验证。
            </p>
          </div>
          <div 
            className="scroll-indicator"
            onClick={() => {
              const capabilityScroll = document.querySelector('.capability-scroll');
              if (capabilityScroll) {
                capabilityScroll.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span>向下滚动探索</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </header>

        <div className="capability-scroll">
          {steps.map((step, i) => (
            <CapabilitySection key={step.key} step={step} index={i} />
          ))}
        </div>

        <div className={`cta-float ${ctaVisible ? "visible" : ""}`}>
          <button 
            className="cta-button"
            onClick={() => {
              const contact = document.getElementById("contact-section");
              if (contact) {
                contact.scrollIntoView({ behavior: "smooth" });
              } else {
                window.location.href = "/contact";
              }
            }}
          >
            私享咨询
          </button>
        </div>
      </div>
    </>
  );
}

// 单个能力段落组件 - 带滚动驱动动画
function CapabilitySection({ step, index }: { step: typeof steps[0]; index: number }) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  
  React.useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // 计算滚动进度 (0 = 未进入, 0.5 = 居中, 1 = 已离开)
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + rect.height)
      ));
      
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始化
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 基于滚动进度计算动画值
  const isActive = scrollProgress > 0.2 && scrollProgress < 0.8;
  const centerProgress = Math.abs(scrollProgress - 0.5) * 2; // 0 = 中心, 1 = 边缘
  
  return (
    <section 
      ref={sectionRef}
      className="capability-section"
      style={{
        opacity: 1 - centerProgress * 0.3,
      }}
    >
      <div 
        className="capability-bg"
        style={{
          opacity: isActive ? 1 : 0.3,
          transform: `scale(${isActive ? 1 : 0.8}) translateY(${(centerProgress - 0.5) * 100}px)`,
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <VizBackground index={index} isActive={isActive} />
      </div>
      
      <div 
        className="capability-content"
        style={{
          opacity: 1 - centerProgress * 0.5,
          transform: `translateY(${centerProgress * 50}px)`,
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
        }}
      >
        <h2 className="capability-title">{step.title}</h2>
        <p className="capability-body">{step.body}</p>
      </div>
    </section>
  );
}

// 全屏背景可视化：图形作为氛围层，带夸张动画
function VizBackground({ index, isActive }: { index: number; isActive: boolean }) {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`viz-wrapper ${mounted ? 'mounted' : ''} ${isActive ? 'active' : ''}`}>
      <svg 
        viewBox="0 0 800 600" 
        width="1000" 
        height="750"
        style={{ 
          opacity: 0.16
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        {index === 0 && <CuriosityPattern />}
        {index === 1 && <CraftPattern />}
        {index === 2 && <VoicePattern />}
        {index === 3 && <ImpactPattern />}
        {index === 4 && <FitPattern />}
      </svg>
      
      <style jsx>{`
        .viz-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.5) rotate(-20deg);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .viz-wrapper.mounted {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        
        .viz-wrapper.active svg {
          animation: dramaticFloat 6s ease-in-out infinite;
        }
        
        .viz-wrapper svg {
          max-width: 100%;
          max-height: 100%;
        }
        
        @keyframes dramaticFloat {
          0%, 100% { 
            transform: translateY(0) scale(1) rotate(0deg); 
          }
          50% { 
            transform: translateY(-8px) scale(1.02) rotate(0deg); 
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .viz-wrapper {
            transition: opacity 0.8s;
            transform: none !important;
          }
          .viz-wrapper svg {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// Curiosity: 动态问号
function CuriosityPattern() {
  return (
    <g>
      {/* 巨大的问号 */}
      <text 
        x="400" 
        y="360" 
        fontSize="360" 
        fill="#3E4C63" 
        textAnchor="middle" 
        fontWeight="600"
        opacity="0.8"
      >
        ?
        <animate attributeName="opacity" values="0.7;0.9;0.7" dur="4s" repeatCount="indefinite" />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 400 300; 3 400 300; -3 400 300; 0 400 300"
          dur="6s"
          repeatCount="indefinite"
        />
      </text>
    </g>
  );
}

// Craft: 工具箱 - 锤子、扳手、铅笔等工具
function CraftPattern() {
  return (
    <g>
      {/* 锤子 */}
      <g opacity="0.7">
        <rect x="240" y="160" width="60" height="30" rx="4" fill="#3E4C63">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 270 175; -15 270 175; 0 270 175"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="260" y="190" width="20" height="120" rx="4" fill="#3E4C63">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 270 175; -15 270 175; 0 270 175"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      
      {/* 扳手 */}
      <g opacity="0.6">
        <path 
          d="M 500 200 L 560 260 L 550 270 L 490 210 M 550 250 Q 570 270 550 290" 
          stroke="#3E4C63" 
          strokeWidth="16" 
          fill="none"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 530 240; 20 530 240; 0 530 240"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
      </g>
      
      {/* 铅笔 */}
      <g opacity="0.65">
        <polygon points="360,400 370,460 350,460" fill="#3E4C63" />
        <rect x="350" y="340" width="20" height="60" fill="#3E4C63" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 20,-20; 0,0"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </g>
      
      {/* 尺子 */}
      <g opacity="0.6">
        <rect x="480" y="360" width="120" height="24" rx="4" fill="#3E4C63" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line 
            key={i}
            x1={490 + i * 20} 
            y1="360" 
            x2={490 + i * 20} 
            y2="372" 
            stroke="#FDFCFA" 
            strokeWidth="3"
          />
        ))}
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,10; 0,0"
          dur="3s"
          repeatCount="indefinite"
        />
      </g>
      
      {/* 齿轮 */}
      <g opacity="0.7">
        <circle cx="280" cy="360" r="40" fill="none" stroke="#3E4C63" strokeWidth="8" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 280 + Math.cos(rad) * 40;
          const y = 360 + Math.sin(rad) * 40;
          return (
            <rect
              key={i}
              x={x - 6}
              y={y - 12}
              width="12"
              height="24"
              fill="#3E4C63"
              transform={`rotate(${angle} ${x} ${y})`}
            />
          );
        })}
        <circle cx="280" cy="360" r="16" fill="#3E4C63" />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 280 360; 360 280 360"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>
    </g>
  );
}

// Voice: 左右对称的声波扩散
function VoicePattern() {
  return (
    <g>
      {/* 中心点 */}
      <circle cx="400" cy="300" r="8" fill="#3E4C63" opacity="0.3">
        <animate attributeName="r" values="7;9;7" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.25;0.35;0.25" dur="2.5s" repeatCount="indefinite" />
      </circle>
      
      {/* 右侧声波（5层） */}
      {[1, 2, 3, 4, 5].map((i) => (
        <path
          key={`right-${i}`}
          d={`M ${400 + 30 + i * 35} ${300 - (50 + i * 20)} Q ${400 + 70 + i * 40} 300 ${400 + 30 + i * 35} ${300 + (50 + i * 20)}`}
          stroke="#3E4C63"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          opacity="0"
        >
          <animate 
            attributeName="opacity" 
            values="0;0.4;0.5;0.4;0" 
            dur="3.5s" 
            begin={`${i * 0.4}s`}
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="stroke-width" 
            values="9;6;9" 
            dur="3.5s" 
            begin={`${i * 0.4}s`}
            repeatCount="indefinite" 
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 10,0; 0,0"
            dur="3.5s"
            begin={`${i * 0.4}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}
      
      {/* 左侧声波（5层，镜像） */}
      {[1, 2, 3, 4, 5].map((i) => (
        <path
          key={`left-${i}`}
          d={`M ${400 - 30 - i * 35} ${300 - (50 + i * 20)} Q ${400 - 70 - i * 40} 300 ${400 - 30 - i * 35} ${300 + (50 + i * 20)}`}
          stroke="#3E4C63"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          opacity="0"
        >
          <animate 
            attributeName="opacity" 
            values="0;0.4;0.5;0.4;0" 
            dur="3.5s" 
            begin={`${i * 0.4}s`}
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="stroke-width" 
            values="9;6;9" 
            dur="3.5s" 
            begin={`${i * 0.4}s`}
            repeatCount="indefinite" 
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -10,0; 0,0"
            dur="3.5s"
            begin={`${i * 0.4}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}
    </g>
  );
}

// Impact: 冲击波扩散 - 表达持续影响力
function ImpactPattern() {
  return (
    <g>
      {/* 中心点 - 温和脉动 */}
      <circle cx="400" cy="300" r="20" fill="#3E4C63" opacity="0.7">
        <animate attributeName="r" values="18;24;18" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.8;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* 4层冲击波 - 温和扩散 */}
      {[1, 2, 3, 4].map((i) => (
        <circle
          key={`wave-${i}`}
          cx="400"
          cy="300"
          r="30"
          fill="none"
          stroke="#3E4C63"
          strokeWidth="4"
          opacity="0"
        >
          <animate 
            attributeName="r" 
            values="30;220" 
            dur="5s" 
            begin={`${i * 0.8}s`}
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="opacity" 
            values="0;0.5;0.3;0" 
            dur="5s" 
            begin={`${i * 0.8}s`}
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="stroke-width" 
            values="5;1.5" 
            dur="5s" 
            begin={`${i * 0.8}s`}
            repeatCount="indefinite" 
          />
        </circle>
      ))}
    </g>
  );
}

// Fit: 拼图块契合 - 两部分移动并契合
function FitPattern() {
  return (
    <g>
      {/* 左半部分（从左侧滑入） */}
      {[
        { y: 180, h: 56 },
        { y: 256, h: 56 },
        { y: 332, h: 56 },
      ].map((rect, i) => (
        <rect
          key={`left-${i}`}
          x="80"
          y={rect.y}
          width="100"
          height={rect.h}
          fill="#3E4C63"
          opacity="0.6"
          rx="8"
        >
          <animate 
            attributeName="x" 
            values="80;80;180;180;80" 
            keyTimes="0;0.2;0.5;0.7;1"
            dur="6s" 
            begin={`${i * 0.15}s`}
            repeatCount="indefinite"
          />
          <animate 
            attributeName="opacity" 
            values="0.4;0.4;0.65;0.65;0.4" 
            keyTimes="0;0.2;0.5;0.7;1"
            dur="6s" 
            begin={`${i * 0.15}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
      
      {/* 右半部分（从右侧滑入） */}
      {[
        { y: 180, h: 56 },
        { y: 256, h: 56 },
        { y: 332, h: 56 },
      ].map((rect, i) => (
        <rect
          key={`right-${i}`}
          x="620"
          y={rect.y}
          width="100"
          height={rect.h}
          fill="#3E4C63"
          opacity="0.6"
          rx="8"
        >
          <animate 
            attributeName="x" 
            values="620;620;520;520;620" 
            keyTimes="0;0.2;0.5;0.7;1"
            dur="6s" 
            begin={`${i * 0.15}s`}
            repeatCount="indefinite"
          />
          <animate 
            attributeName="opacity" 
            values="0.4;0.4;0.65;0.65;0.4" 
            keyTimes="0;0.2;0.5;0.7;1"
            dur="6s" 
            begin={`${i * 0.15}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
      
      {/* 中间连接光效 - 在契合时亮起 */}
      <line x1="300" y1="280" x2="500" y2="280" stroke="#3E4C63" strokeWidth="4" opacity="0">
        <animate 
          attributeName="opacity" 
          values="0;0;0;0.4;0.4;0" 
          keyTimes="0;0.2;0.45;0.55;0.7;1"
          dur="6s" 
          repeatCount="indefinite" 
        />
      </line>
      <circle cx="400" cy="280" r="12" fill="#3E4C63" opacity="0">
        <animate 
          attributeName="opacity" 
          values="0;0;0;0.5;0.5;0" 
          keyTimes="0;0.2;0.45;0.55;0.7;1"
          dur="6s" 
          repeatCount="indefinite" 
        />
        <animate 
          attributeName="r" 
          values="10;10;14;14;10;10" 
          keyTimes="0;0.2;0.5;0.7;0.9;1"
          dur="6s" 
          repeatCount="indefinite" 
        />
      </circle>
    </g>
  );
}

