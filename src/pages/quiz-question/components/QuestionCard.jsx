import React from 'react';

const QuestionCard = ({ question, difficulty, className = '' }) => {
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy':
        return 'bg-success text-success-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'hard':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt?.value;
  };

  return (
    <div className={`quiz-card p-6 lg:p-8 space-y-6 ${className}`}>
      {/* Difficulty Badge */}
      <div className="flex justify-center">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(difficulty)}`}>
          {difficulty ? difficulty?.charAt(0)?.toUpperCase() + difficulty?.slice(1) : 'Medium'}
        </span>
      </div>
      {/* Question Text */}
      <div className="text-center space-y-4">
        <h2 className="text-xl lg:text-2xl font-semibold text-foreground leading-relaxed">
          {question ? decodeHtml(question) : 'Loading question...'}
        </h2>
      </div>
    </div>
  );
};

export default QuestionCard;