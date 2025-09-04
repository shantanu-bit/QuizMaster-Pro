import React from 'react';
import { NextQuestionButton, SubmitQuizButton } from '../../../components/ui/NavigationButton';

const QuizNavigation = ({ 
  currentQuestion, 
  totalQuestions, 
  selectedAnswer, 
  onNext, 
  onSubmit, 
  loading = false,
  className = '' 
}) => {
  const isLastQuestion = currentQuestion >= totalQuestions;
  const canProceed = selectedAnswer !== null && selectedAnswer !== undefined;

  const handleAction = () => {
    if (isLastQuestion) {
      onSubmit();
    } else {
      onNext();
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {/* Answer requirement notice */}
      {!canProceed && (
        <div className="text-center p-3 bg-muted rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            Please select an answer to continue
          </p>
        </div>
      )}

      {/* Navigation Button */}
      <div className="w-full max-w-xs">
        {isLastQuestion ? (
          <SubmitQuizButton
            onClick={handleAction}
            disabled={!canProceed}
            loading={loading}
            className="w-full"
          />
        ) : (
          <NextQuestionButton
            onClick={handleAction}
            disabled={!canProceed}
            loading={loading}
            className="w-full"
          />
        )}
      </div>

      {/* Progress Info */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Question {currentQuestion} of {totalQuestions}
        </p>
        {isLastQuestion && (
          <p className="text-xs text-primary font-medium mt-1">
            Last question - submit to see results
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizNavigation;