import React from "react";
import Head from "next/head";
import CharHover from "../components/CharHover";

export default function Contact() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    background: "",
    timeline: "",
    interest: "",
    contact: ""
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("提交失败，请重试");
      }
    } catch (err) {
      console.error("Failed to submit:", err);
      alert("提交失败，请重试");
    }
  };

  if (submitted) {
    return (
      <>
        <Head>
          <title>Contact — ZC Education</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="page">
          <div className="contact-success">
            <div className="success-icon">✓</div>
            <h1 className="success-title">已收到</h1>
            <p className="success-message">
              我们会在 3 个工作日内回复。如果你的背景与我们的服务契合，我们会安排初次对话。
            </p>
            <button 
              className="success-button"
              onClick={() => window.location.href = "/"}
            >
              返回首页
            </button>
          </div>
        </div>
        <style jsx>{`
          .contact-success {
            max-width: 520px;
            margin: 120px auto;
            text-align: center;
            padding: 0 32px;
          }

          .success-icon {
            width: 72px;
            height: 72px;
            margin: 0 auto 24px;
            background: #1A1F2E;
            color: white;
            border-radius: 50%;
            display: grid;
            place-items: center;
            font-size: 36px;
          }

          .success-title {
            font-size: 36px;
            font-weight: 500;
            color: #1A1F2E;
            margin-bottom: 16px;
          }

          .success-message {
            font-size: 17px;
            line-height: 1.65;
            color: #5B6470;
            margin-bottom: 32px;
          }

          .success-button {
            padding: 14px 28px;
            background: #1A1F2E;
            color: white;
            font-size: 15px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: transform .18s cubic-bezier(.2,.8,.2,1);
          }

          .success-button:hover {
            transform: translateY(-2px);
          }

          .success-button:focus-visible {
            outline: 2px solid #3E4C63;
            outline-offset: 3px;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Contact — ZC Education</title>
        <meta name="description" content="私享咨询：三步表单，低打扰，高匹配。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        <header className="page-header">
          <div>
            <h1 className="page-title">
              <CharHover text="对话" />
            </h1>
            <p className="page-subtitle">
              我们采用邀请制。请用三分钟告诉我们你的背景与目标，我们会评估是否适合合作。
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
          <div className="contact-container">
            <div className="step-indicator">
              <div className={`step-dot ${step >= 1 ? "active" : ""}`}>1</div>
              <div className={`step-line ${step >= 2 ? "active" : ""}`}></div>
              <div className={`step-dot ${step >= 2 ? "active" : ""}`}>2</div>
              <div className={`step-line ${step >= 3 ? "active" : ""}`}></div>
              <div className={`step-dot ${step >= 3 ? "active" : ""}`}>3</div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              {step === 1 && (
                <div className="form-step">
                  <label className="form-label">
                    学术背景
                    <span className="form-hint">当前年级、专业、已有的学术经历（课程/科研/独立项目）</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={6}
                    value={formData.background}
                    onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                    required
                    placeholder="例：大三，社会学，参与过一次田野调查，对移民研究感兴趣但缺乏系统训练..."
                  />
                </div>
              )}

              {step === 2 && (
                <div className="form-step">
                  <label className="form-label">
                    时间与目标
                    <span className="form-hint">计划申请的时间、目标学位（Master/PhD）、感兴趣的领域与学校类型</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={6}
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    required
                    placeholder="例：2025 Fall 申请 PhD，目标美国前 30 社会学项目，希望有定量方法训练的环境..."
                  />
                </div>
              )}

              {step === 3 && (
                <div className="form-step">
                  <label className="form-label">
                    最想解决的问题
                    <span className="form-hint">你在准备过程中遇到的最大困惑，以及期待我们提供的帮助</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={5}
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    required
                    placeholder="例：不知道如何把碎片化的兴趣变成有说服力的研究计划，也缺乏合适的推荐人..."
                  />
                  
                  <label className="form-label" style={{ marginTop: 24 }}>
                    联系方式
                    <span className="form-hint">邮箱 / 微信（请注明偏好的联系方式）</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              )}

              <div className="form-actions">
                {step > 1 && (
                  <button 
                    type="button" 
                    className="form-button secondary"
                    onClick={handlePrev}
                  >
                    上一步
                  </button>
                )}
                {step < 3 ? (
                  <button 
                    type="button" 
                    className="form-button primary"
                    onClick={handleNext}
                  >
                    下一步
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="form-button primary"
                  >
                    提交
                  </button>
                )}
              </div>
            </form>

            <div className="privacy-note">
              <p>
                <strong>隐私承诺：</strong>
                我们不会将你的信息用于营销或分享给第三方。如评估后认为不适合合作，我们会坦诚告知，并在可能的情况下提供建议方向。
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-container {
          max-width: 640px;
          margin: 0 auto;
        }

        .step-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 48px;
        }

        .step-dot {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #E8E9EC;
          color: #8D96A7;
          display: grid;
          place-items: center;
          font-size: 15px;
          font-weight: 500;
          transition: all .22s cubic-bezier(.2,.8,.2,1);
        }

        .step-dot.active {
          background: #1A1F2E;
          color: white;
        }

        .step-line {
          width: 80px;
          height: 2px;
          background: #E8E9EC;
          transition: background .22s cubic-bezier(.2,.8,.2,1);
        }

        .step-line.active {
          background: #1A1F2E;
        }

        .contact-form {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
        }

        .form-step {
          min-height: 280px;
        }

        .form-label {
          display: block;
          font-size: 17px;
          font-weight: 500;
          color: #1A1F2E;
          margin-bottom: 8px;
        }

        .form-hint {
          display: block;
          font-size: 14px;
          font-weight: 400;
          color: #8D96A7;
          margin-top: 4px;
          line-height: 1.5;
        }

        .form-textarea,
        .form-input {
          width: 100%;
          padding: 14px;
          font-size: 16px;
          line-height: 1.6;
          color: #1A1F2E;
          background: #F6F4EE;
          border: 1px solid transparent;
          border-radius: 8px;
          font-family: inherit;
          transition: border-color .18s, background .18s;
          resize: vertical;
        }

        .form-textarea:focus,
        .form-input:focus {
          outline: none;
          border-color: #3E4C63;
          background: white;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 24px;
        }

        .form-button {
          padding: 12px 28px;
          font-size: 15px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all .18s cubic-bezier(.2,.8,.2,1);
          font-family: inherit;
        }

        .form-button.primary {
          background: #1A1F2E;
          color: white;
        }

        .form-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .form-button.secondary {
          background: #E8E9EC;
          color: #5B6470;
        }

        .form-button.secondary:hover {
          background: #D8D9DC;
        }

        .form-button:focus-visible {
          outline: 2px solid #3E4C63;
          outline-offset: 3px;
        }

        .privacy-note {
          margin-top: 32px;
          padding: 24px;
          background: #F6F4EE;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.65;
          color: #5B6470;
        }

        .privacy-note strong {
          color: #3E4C63;
        }

        @media (max-width: 900px) {
          .contact-form {
            padding: 32px 24px;
          }

          .step-line {
            width: 60px;
          }

          .form-step {
            min-height: 260px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .step-dot,
          .step-line,
          .form-button {
            transition: none;
          }
          
          .form-button.primary:hover {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}

