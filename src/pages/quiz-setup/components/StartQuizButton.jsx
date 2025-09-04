import React from 'react';
import Button from '../../../components/ui/Button';

const StartQuizButton = ({ 
  selectedDifficulty, 
  onStartQuiz, 
  isLoading = false, 
  disabled = false 
}) => {
  const isDisabled = disabled || !selectedDifficulty || isLoading;

  return (
    <div className="text-center space-y-4">
      <Button
        variant="default"
        size="lg"
        iconName="Play"
        iconPosition="left"
        loading={isLoading}
        disabled={isDisabled}
        fullWidth
        onClick={onStartQuiz}
        className="py-4 text-lg font-semibold"
      >
        {isLoading ? 'Loading Questions...' : 'Start Quiz'}
      </Button>

      {!selectedDifficulty && !isLoading && (
        <p className="text-sm text-muted-foreground">
          Please select a difficulty level to continue
        </p>
      )}

      {isLoading && (
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <span>Fetching trivia questions from Open Trivia Database...</span>
        </div>
      )}
    </div>
  );
};

export default StartQuizButton;