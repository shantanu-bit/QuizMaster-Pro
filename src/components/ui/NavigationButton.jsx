import React from 'react';
import Button from './Button';


const NavigationButton = ({
  children,
  onClick,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  iconName = null,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      loading={loading}
      iconName={iconName}
      iconPosition={iconPosition}
      fullWidth={fullWidth}
      onClick={handleClick}
      className={`quiz-button-press ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

// Specialized navigation buttons for common quiz actions
export const StartQuizButton = ({ onClick, loading = false, disabled = false, className = '' }) => (
  <NavigationButton
    variant="default"
    size="lg"
    iconName="Play"
    iconPosition="left"
    onClick={onClick}
    loading={loading}
    disabled={disabled}
    className={className}
  >
    Start Quiz
  </NavigationButton>
);

export const NextQuestionButton = ({ onClick, loading = false, disabled = false, className = '' }) => (
  <NavigationButton
    variant="default"
    size="default"
    iconName="ArrowRight"
    iconPosition="right"
    onClick={onClick}
    loading={loading}
    disabled={disabled}
    className={className}
  >
    Next Question
  </NavigationButton>
);

export const SubmitQuizButton = ({ onClick, loading = false, disabled = false, className = '' }) => (
  <NavigationButton
    variant="default"
    size="default"
    iconName="Check"
    iconPosition="left"
    onClick={onClick}
    loading={loading}
    disabled={disabled}
    className={className}
  >
    Submit Quiz
  </NavigationButton>
);

export const RestartQuizButton = ({ onClick, loading = false, disabled = false, className = '' }) => (
  <NavigationButton
    variant="outline"
    size="default"
    iconName="RotateCcw"
    iconPosition="left"
    onClick={onClick}
    loading={loading}
    disabled={disabled}
    className={className}
  >
    Restart Quiz
  </NavigationButton>
);

export const ViewResultsButton = ({ onClick, loading = false, disabled = false, className = '' }) => (
  <NavigationButton
    variant="default"
    size="default"
    iconName="BarChart3"
    iconPosition="left"
    onClick={onClick}
    loading={loading}
    disabled={disabled}
    className={className}
  >
    View Results
  </NavigationButton>
);

export default NavigationButton;