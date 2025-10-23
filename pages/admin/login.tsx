import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        setError("密码错误");
      }
    } catch (err) {
      setError("登录失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login — ZC Education</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="login-container">
        <div className="login-box">
          <h1 className="login-title">管理后台</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              disabled={loading}
              autoFocus
            />
            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "登录中..." : "登录"}
            </button>
          </form>
        </div>

        <style jsx>{`
          .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #F6F4EE;
            padding: 24px;
          }

          .login-box {
            background: white;
            padding: 48px;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
            width: 100%;
            max-width: 400px;
          }

          .login-title {
            font-size: 28px;
            font-weight: 500;
            color: #1A1F2E;
            margin-bottom: 32px;
            text-align: center;
          }

          .login-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .login-input {
            padding: 14px;
            font-size: 16px;
            border: 1px solid #E8E9EC;
            border-radius: 8px;
            font-family: inherit;
            transition: border-color 0.2s;
          }

          .login-input:focus {
            outline: none;
            border-color: #3E4C63;
          }

          .login-input:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .login-error {
            color: #D32F2F;
            font-size: 14px;
            margin: 0;
          }

          .login-button {
            padding: 14px;
            font-size: 16px;
            font-weight: 500;
            color: white;
            background: #1A1F2E;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s, opacity 0.2s;
            font-family: inherit;
          }

          .login-button:hover:not(:disabled) {
            transform: translateY(-2px);
          }

          .login-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    </>
  );
}

