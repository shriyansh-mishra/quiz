import React from 'react';

const Timer = ({ timeLeft }) => {
  const getTimerClass = () => {
    if (timeLeft <= 5) return 'timer critical';
    if (timeLeft <= 10) return 'timer warning';
    return 'timer normal';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={getTimerClass()}>
      <span className="timer-icon">⏱️</span>
      <span className="timer-text">
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default Timer;

