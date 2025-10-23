import React from "react";
import Head from "next/head";
import CharHover from "../components/CharHover";
import CapabilityExperimental from "../components/CapabilityExperimental";

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
              const capabilityScroll = document.querySelector('.capability-experimental-wrapper');
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

        <CapabilityExperimental steps={steps} />

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
