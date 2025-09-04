import React from 'react';
import Icon from '../../../components/AppIcon';

const DifficultySelector = ({ selectedDifficulty, onDifficultyChange }) => {
  const difficultyOptions = [
    {
      value: 'easy',
      label: 'Easy',
      icon: 'Smile',
      description: 'Simple questions with basic knowledge',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success'
    },
    {
      value: 'medium',
      label: 'Medium',
      icon: 'Brain',
      description: 'Moderate difficulty with detailed concepts',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning'
    },
    {
      value: 'hard',
      label: 'Hard',
      icon: 'Zap',
      description: 'Challenging questions for experts',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Choose Difficulty Level</h2>
        <p className="text-sm text-muted-foreground">Select the challenge level that matches your expertise</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {difficultyOptions?.map((option) => (
          <div
            key={option?.value}
            className={`relative cursor-pointer rounded-lg border-2 p-6 transition-all duration-200 hover:shadow-md ${
              selectedDifficulty === option?.value
                ? `${option?.borderColor} ${option?.bgColor} shadow-sm`
                : 'border-border bg-card hover:border-muted-foreground/30'
            }`}
            onClick={() => onDifficultyChange(option?.value)}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`p-3 rounded-full ${option?.bgColor}`}>
                <Icon 
                  name={option?.icon} 
                  size={24} 
                  className={selectedDifficulty === option?.value ? option?.color : 'text-muted-foreground'} 
                />
              </div>
              
              <div>
                <h3 className={`font-semibold text-lg ${
                  selectedDifficulty === option?.value ? option?.color : 'text-foreground'
                }`}>
                  {option?.label}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {option?.description}
                </p>
              </div>
              
              {/* Radio button indicator */}
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedDifficulty === option?.value
                  ? `${option?.borderColor} ${option?.bgColor}`
                  : 'border-muted-foreground/30'
              }`}>
                {selectedDifficulty === option?.value && (
                  <div className={`w-2 h-2 rounded-full ${option?.color?.replace('text-', 'bg-')}`} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;