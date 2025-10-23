import React from "react";

export default function CharHover({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      <span className={`char-hover-wrapper ${className}`}>
        {text.split('').map((char, i) => (
          <span 
            key={i}
            className="char-hover-item"
          >
            {char}
          </span>
        ))}
      </span>
      
      <style jsx>{`
        .char-hover-wrapper {
          display: inline-flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .char-hover-item {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: pre;
          cursor: default;
        }
        
        .char-hover-item:hover {
          transform: scale(1.25);
          z-index: 1;
          position: relative;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .char-hover-item {
            transition: none;
          }
          .char-hover-item:hover {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}

