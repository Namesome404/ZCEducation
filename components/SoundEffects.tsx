import { useEffect } from 'react';

// 使用Web Audio API创建音效
const createBeep = (frequency: number, duration: number, volume: number = 0.1) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

const SoundEffects = () => {
  useEffect(() => {
    let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';

    // 按键切换音效
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'm' && e.shiftKey) {
        soundEnabled = !soundEnabled;
        localStorage.setItem('soundEnabled', String(soundEnabled));
        createBeep(soundEnabled ? 880 : 440, 0.1, 0.05);
      }
    };

    // 链接点击音效
    const handleClick = (e: MouseEvent) => {
      if (!soundEnabled) return;
      
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.closest('a')) {
        createBeep(1200, 0.05, 0.03);
      } else if (target.tagName === 'BUTTON' || target.closest('button')) {
        createBeep(800, 0.08, 0.04);
      }
    };

    // 导航悬停音效
    const handleMouseOver = (e: MouseEvent) => {
      if (!soundEnabled) return;
      
      const target = e.target as HTMLElement;
      if (target.classList.contains('nav-links') || target.closest('.nav-links a')) {
        createBeep(1500, 0.03, 0.02);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return null;
};

export default SoundEffects;

