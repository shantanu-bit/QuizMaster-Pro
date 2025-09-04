import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const QuizTimer = ({ 
  timeRemaining, 
  totalTime = 30, 
  onTimeUp, 
  isActive = true,
  className = '' 
}) => {
  const [displayTime, setDisplayTime] = useState(timeRemaining || totalTime);

  useEffect(() => {
    setDisplayTime(timeRemaining || totalTime);
  }, [timeRemaining, totalTime]);

  const getTimerColor = () => {
    if (!displayTime || !totalTime) return 'text-primary';
    
    const timeRatio = displayTime / totalTime;
    if (timeRatio <= 0.2) return 'text-destructive';
    if (timeRatio <= 0.5) return 'text-warning';
    return 'text-primary';
  };

  const getProgressColor = () => {
    if (!displayTime || !totalTime) return 'stroke-primary';
    
    const timeRatio = displayTime / totalTime;
    if (timeRatio <= 0.2) return 'stroke-destructive';
    if (timeRatio <= 0.5) return 'stroke-warning';
    return 'stroke-primary';
  };

  const progressPercentage = totalTime > 0 ? (displayTime / totalTime) * 100 : 0;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const formatTime = (seconds) => {
    if (seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`}>
      {/* Circular Progress Timer */}
      <div className="relative w-24 h-24 lg:w-28 lg:h-28">
        <svg 
          className="w-full h-full transform -rotate-90" 
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-muted opacity-20"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-linear ${getProgressColor()}`}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        
        {/* Timer display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon 
            name="Clock" 
            size={16} 
            className={`mb-1 ${getTimerColor()}`}
          />
          <span className={`text-lg lg:text-xl font-mono font-bold ${getTimerColor()}`}>
            {formatTime(displayTime)}
          </span>
        </div>
      </div>

      {/* Timer Status */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {displayTime <= 0 ? 'Time\'s up!' : 'Time remaining'}
        </p>
        {displayTime <= 10 && displayTime > 0 && (
          <p className="text-xs text-destructive font-medium animate-pulse">
            Hurry up!
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizTimer;