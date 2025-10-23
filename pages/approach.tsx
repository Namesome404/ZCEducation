import React from "react";
import Head from "next/head";
import CharHover from "../components/CharHover";

const steps = [
  { 
    key: "diagnosis", 
    title: "Diagnosis", 
    body: "我们不从标化开始，而是从你已有的学术痕迹：课程作业、阅读笔记、失败的尝试。找到真实起点，而非理想画像。" 
  },
  { 
    key: "architecture", 
    title: "Architecture", 
    body: "设计 12–18 个月的能力地图：哪些是基础设施（方法论、写作），哪些是可展示产出，哪些是连接节点（导师、同行）。" 
  },
  { 
    key: "iteration", 
    title: "Iteration", 
    body: "每周复盘，每月调整。我们不提供固定模板，而是根据你的进展与外部反馈持续优化路径。过程透明、可追溯。" 
  },
  { 
    key: "presentation", 
    title: "Presentation", 
    body: "从 PS 到面试，统一叙事线索。你的故事不是为了打动人，而是为了让对方清晰看见你能在他们的环境中做什么。" 
  },
  { 
    key: "transition", 
    title: "Transition", 
    body: "录取后的准备同样重要：预修课程、建立联系、理解学术文化。我们帮你从申请者平滑过渡到研究者。" 
  },
];

function ApproachSection({ step, index }: { step: typeof steps[0]; index: number }) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (sectionHeight + windowHeight)
      ));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = scrollProgress > 0.2 && scrollProgress < 0.8;
  const centerProgress = 1 - Math.abs(scrollProgress - 0.5) * 2;

  return (
    <section ref={sectionRef} className="capability-section">
      <div 
        className="capability-bg"
        style={{
          opacity: isActive ? 1 : 0.3,
          transition: 'opacity 0.6s ease-out'
        }}
      >
        <VizBackground isActive={isActive} index={index} />
      </div>
      <div 
        className="capability-content"
        style={{
          opacity: isActive ? 1 : 0.4,
          transform: `translateY(${(0.5 - centerProgress) * 30}px)`,
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
        }}
      >
        <h2 className="capability-title">{step.title}</h2>
        <p className="capability-body">{step.body}</p>
      </div>
    </section>
  );
}

function VizBackground({ isActive, index }: { isActive: boolean; index: number }) {
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
          opacity: 0.22
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        {index === 0 && <DiagnosisPattern />}
        {index === 1 && <ArchitecturePattern />}
        {index === 2 && <IterationPattern />}
        {index === 3 && <PresentationPattern />}
        {index === 4 && <TransitionPattern />}
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
            transform: translateY(-12px) scale(1.03) rotate(0deg); 
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

export default function Approach() {
  return (
    <>
      <Head>
        <title>Approach — ZC Education</title>
        <meta name="description" content="我们的方法论：从诊断到迭代，透明可追溯。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        <header className="page-header">
          <div>
            <h1 className="page-title">
              <CharHover text="方法" />
            </h1>
            <p className="page-subtitle">
              学术准备不是线性流程，而是迭代式建构。我们设计路径，但不代替你行走。
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
            <ApproachSection key={step.key} step={step} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}

// Diagnosis: 散点定位 - 找到真实起点
function DiagnosisPattern() {
  const points = [
    { x: 240, y: 160, size: 8 },
    { x: 360, y: 240, size: 6 },
    { x: 480, y: 180, size: 10 },
    { x: 320, y: 320, size: 7 },
    { x: 440, y: 340, size: 9 },
    { x: 540, y: 280, size: 6 },
  ];
  
  return (
    <g>
      {/* 散落的点（代表学术痕迹） */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.size}
          fill="#3E4C63"
          opacity="0.4"
        >
          <animate 
            attributeName="opacity" 
            values="0.3;0.6;0.3" 
            dur={`${3 + i * 0.5}s`}
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="r" 
            values={`${p.size};${p.size + 2};${p.size}`}
            dur={`${3 + i * 0.5}s`}
            repeatCount="indefinite" 
          />
        </circle>
      ))}
      
      {/* 聚焦框 */}
      <rect
        x="280"
        y="220"
        width="200"
        height="140"
        fill="none"
        stroke="#3E4C63"
        strokeWidth="3"
        strokeDasharray="8 4"
        opacity="0.3"
        rx="8"
      >
        <animate 
          attributeName="stroke-dashoffset" 
          values="0;-12" 
          dur="3s" 
          repeatCount="indefinite" 
        />
      </rect>
    </g>
  );
}

// Architecture: 框架结构 - 围绕式节点网络
function ArchitecturePattern() {
  // 创建围绕式的节点布局
  const nodes = [
    { x: 200, y: 150, size: 8, delay: 0 },
    { x: 350, y: 120, size: 6, delay: 0.2 },
    { x: 500, y: 150, size: 8, delay: 0.4 },
    { x: 600, y: 200, size: 7, delay: 0.6 },
    { x: 650, y: 300, size: 6, delay: 0.8 },
    { x: 600, y: 400, size: 7, delay: 1.0 },
    { x: 500, y: 450, size: 8, delay: 1.2 },
    { x: 350, y: 480, size: 6, delay: 1.4 },
    { x: 200, y: 450, size: 8, delay: 1.6 },
    { x: 150, y: 400, size: 7, delay: 1.8 },
    { x: 100, y: 300, size: 6, delay: 2.0 },
    { x: 150, y: 200, size: 7, delay: 2.2 },
  ];
  
  // 连接线
  const connections = [
    { x1: 200, y1: 150, x2: 350, y2: 120 },
    { x1: 350, y1: 120, x2: 500, y2: 150 },
    { x1: 500, y1: 150, x2: 600, y2: 200 },
    { x1: 600, y1: 200, x2: 650, y2: 300 },
    { x1: 650, y1: 300, x2: 600, y2: 400 },
    { x1: 600, y1: 400, x2: 500, y2: 450 },
    { x1: 500, y1: 450, x2: 350, y2: 480 },
    { x1: 350, y1: 480, x2: 200, y2: 450 },
    { x1: 200, y1: 450, x2: 150, y2: 400 },
    { x1: 150, y1: 400, x2: 100, y2: 300 },
    { x1: 100, y1: 300, x2: 150, y2: 200 },
    { x1: 150, y1: 200, x2: 200, y2: 150 },
  ];
  
  return (
    <g>
      {/* 连接线 - 逐渐生长 */}
      {connections.map((conn, i) => (
        <line 
          key={`line-${i}`}
          x1={conn.x1} 
          y1={conn.y1} 
          x2={conn.x2} 
          y2={conn.y2}
          stroke="#3E4C63"
          strokeWidth="1.5"
          opacity="0"
        >
          <animate 
            attributeName="opacity" 
            values="0;0.25;0.25" 
            dur="3s"
            begin={`${i * 0.2}s`}
            fill="freeze"
          />
          <animate 
            attributeName="stroke-dasharray" 
            from="0 1000"
            to="1000 0"
            dur="0.5s"
            begin={`${i * 0.2}s`}
            fill="freeze"
          />
        </line>
      ))}
      
      {/* 节点 - 依次亮起并持续脉动 */}
      {nodes.map((node, i) => (
        <g key={`node-${i}`}>
          <circle
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill="#3E4C63"
            opacity="0"
          >
            <animate 
              attributeName="opacity" 
              values="0;0.5;0.5" 
              dur="0.4s"
              begin={`${node.delay}s`}
              fill="freeze"
            />
          </circle>
          <circle
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill="none"
            stroke="#3E4C63"
            strokeWidth="1.5"
            opacity="0"
          >
            <animate 
              attributeName="r" 
              values={`${node.size};${node.size + 8};${node.size + 8}`}
              dur="0.6s"
              begin={`${node.delay}s`}
              fill="freeze"
            />
            <animate 
              attributeName="opacity" 
              values="0;0.4;0" 
              dur="0.6s"
              begin={`${node.delay}s`}
              fill="freeze"
            />
          </circle>
          {/* 持续脉动 */}
          <circle
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill="none"
            stroke="#3E4C63"
            strokeWidth="1"
            opacity="0"
          >
            <animate 
              attributeName="r" 
              values={`${node.size};${node.size + 6}`}
              dur="2s"
              begin={`${node.delay + 0.6}s`}
              repeatCount="indefinite"
            />
            <animate 
              attributeName="opacity" 
              values="0.3;0" 
              dur="2s"
              begin={`${node.delay + 0.6}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </g>
  );
}

// Iteration: 循环路径 - 持续优化
function IterationPattern() {
  return (
    <g>
      {/* 圆形路径 */}
      <circle cx="400" cy="300" r="140" fill="none" stroke="#3E4C63" strokeWidth="4" opacity="0.35" />
      
      {/* 四个节点（上下左右）循环亮起 */}
      {[
        { x: 400, y: 160, angle: 0 },
        { x: 540, y: 300, angle: 90 },
        { x: 400, y: 440, angle: 180 },
        { x: 260, y: 300, angle: 270 },
      ].map((p, i) => (
        <circle 
          key={i}
          cx={p.x}
          cy={p.y}
          r="8"
          fill="#3E4C63"
          opacity="0.5"
        >
          <animate 
            attributeName="r" 
            values="8;12;8" 
            dur="4s" 
            begin={`${i * 1}s`}
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="opacity" 
            values="0.3;0.7;0.3" 
            dur="4s" 
            begin={`${i * 1}s`}
            repeatCount="indefinite" 
          />
        </circle>
      ))}
      
      {/* 箭头指示方向 */}
      <path d="M 400 150 L 390 164 L 410 164 Z" fill="#3E4C63" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite" />
      </path>
    </g>
  );
}

// Presentation: 统一叙事线 - 清晰展现
function PresentationPattern() {
  return (
    <g>
      {/* 文档/卡片轮廓 */}
      <rect x="240" y="160" width="320" height="280" rx="12" fill="none" stroke="#3E4C63" strokeWidth="4" opacity="0.3" />
      
      {/* 内容线条依次出现 */}
      {[200, 240, 280, 320, 360].map((y, i) => (
        <line
          key={i}
          x1="280"
          y1={y}
          x2={480 - i * 20}
          y2={y}
          stroke="#3E4C63"
          strokeWidth="4"
          opacity="0"
        >
          <animate 
            attributeName="opacity" 
            values={`0;${0.4 - i * 0.05};${0.4 - i * 0.05}`}
            dur="3s"
            begin={`${i * 0.3}s`}
            fill="freeze"
          />
        </line>
      ))}
    </g>
  );
}

// Transition: 平滑过渡 - 从申请者到研究者
function TransitionPattern() {
  return (
    <g>
      {/* 左侧方块（起点） */}
      <rect x="200" y="260" width="100" height="80" fill="#3E4C63" opacity="0.35" rx="8">
        <animate attributeName="opacity" values="0.35;0.5;0.35" dur="3s" repeatCount="indefinite" />
      </rect>
      
      {/* 右侧方块（终点） */}
      <rect x="500" y="260" width="100" height="80" fill="#3E4C63" opacity="0.5" rx="8">
        <animate attributeName="opacity" values="0.5;0.7;0.5" dur="3s" repeatCount="indefinite" />
      </rect>
      
      {/* 过渡路径 */}
      <path
        d="M 300 300 Q 400 300 500 300"
        fill="none"
        stroke="#3E4C63"
        strokeWidth="4"
        opacity="0.3"
        strokeDasharray="10 6"
      >
        <animate attributeName="stroke-dashoffset" values="0;16" dur="2s" repeatCount="indefinite" />
      </path>
      
      {/* 移动的点 */}
      <circle cx="300" cy="300" r="6" fill="#3E4C63" opacity="0.6">
        <animate attributeName="cx" values="300;500;500;300" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.8;0;0" dur="4s" repeatCount="indefinite" />
      </circle>
      
      {/* 箭头 */}
      <path d="M 490 300 L 480 290 L 480 310 Z" fill="#3E4C63" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
      </path>
    </g>
  );
}

