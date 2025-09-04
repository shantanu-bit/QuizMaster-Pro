import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = ({ message = "Loading next question...", className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-6 py-12 ${className}`}>
      {/* Loading Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-muted rounded-full animate-spin border-t-primary"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="Brain" size={24} className="text-primary" />
        </div>
      </div>
      {/* Loading Message */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-foreground">
          {message}
        </h3>
        <p className="text-sm text-muted-foreground">
          Please wait while we prepare your quiz
        </p>
      </div>
      {/* Loading Animation Dots */}
      <div className="flex space-x-1">
        {[0, 1, 2]?.map((index) => (
          <div
            key={index}
            className="w-2 h-2 bg-primary rounded-full animate-pulse"
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingState;