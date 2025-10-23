import React from "react";
import Head from "next/head";
import CharHover from "../components/CharHover";
import ApproachExperimental from "../components/ApproachExperimental";

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

export default function Approach() {
  return (
    <>
      <Head>
        <title>Approach — ZC Education</title>
        <meta name="description" content="五阶段能力构建：诊断、架构、迭代、呈现、过渡" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        <header className="page-header">
          <div>
            <h1 className="page-title">
              <CharHover text="方法" />
            </h1>
            <p className="page-subtitle">
              学术准备不是线性任务清单，而是迭代式能力建构。每个阶段相互咬合，可追溯、可验证、可调整。
            </p>
          </div>
          <div 
            className="scroll-indicator"
            onClick={() => {
              const section = document.querySelector('.approach-experimental');
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

        <ApproachExperimental steps={steps} />
      </div>
    </>
  );
}

