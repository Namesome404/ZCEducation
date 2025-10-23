import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: '40px',
        background: '#FDFCFA'
      }}>
        <h1 style={{ 
          fontSize: '120px', 
          fontWeight: '500',
          color: '#1A1F2E',
          margin: '0',
          letterSpacing: '-0.04em'
        }}>
          404
        </h1>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: '500',
          color: '#3E4C63',
          margin: '16px 0',
          letterSpacing: '-0.02em'
        }}>
          页面未找到
        </h2>
        <p style={{ 
          fontSize: '18px', 
          color: '#5B6470',
          textAlign: 'center',
          maxWidth: '480px',
          lineHeight: '1.6',
          marginBottom: '32px'
        }}>
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <Link 
          href="/"
          style={{
            padding: '14px 28px',
            background: '#1A1F2E',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'transform 0.2s'
          }}
        >
          返回首页
        </Link>
      </div>
    </>
  );
}

