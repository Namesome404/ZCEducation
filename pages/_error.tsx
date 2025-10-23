import React from 'react';
import { NextPageContext } from 'next';

interface ErrorProps {
  statusCode?: number;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      padding: '40px'
    }}>
      <h1 style={{ 
        fontSize: '72px', 
        fontWeight: '500',
        color: '#1A1F2E',
        margin: '0 0 16px 0'
      }}>
        {statusCode || 'Error'}
      </h1>
      <p style={{ 
        fontSize: '18px', 
        color: '#5B6470',
        textAlign: 'center'
      }}>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
      <a 
        href="/"
        style={{
          marginTop: '32px',
          padding: '12px 24px',
          background: '#1A1F2E',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '15px'
        }}
      >
        返回首页
      </a>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

