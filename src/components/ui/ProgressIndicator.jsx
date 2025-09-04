import React from 'react';

const ProgressIndicator = ({ 
  currentQuestion = 1, 
  totalQuestions = 10, 
  timeRemaining = null,
  totalTime = null,
  className = '' 
}) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
  const getTimeColor = () => {
    if (!timeRemaining || !totalTime) return 'text-muted-foreground';
    
    const timeRatio = timeRemaining / totalTime;
    if (timeRatio <= 0.2) return 'quiz-timer-danger';
    if (timeRatio <= 0.5) return 'quiz-timer-warning';
    return 'text-primary';
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <span className="font-mono text-muted-foreground">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Timer Display */}
      {timeRemaining !== null && (
        <div className="flex items-center justify-center space-x-2">
          <div className={`flex items-center space-x-1 ${getTimeColor()}`}>
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
            <span className="font-mono text-sm font-medium">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
      )}

      {/* Question Navigation Dots */}
      <div className="flex items-center justify-center space-x-1 pt-1">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const questionNumber = index + 1;
          const isActive = questionNumber === currentQuestion;
          const isCompleted = questionNumber < currentQuestion;
          
          return (
            <div
              key={questionNumber}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                isActive 
                  ? 'bg-primary' 
                  : isCompleted 
                    ? 'bg-success' :'bg-muted'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;