import React from 'react';
import Icon from '../../../components/AppIcon';

const QuizInstructions = () => {
  const instructions = [
    {
      icon: 'Clock',
      title: 'Time Limit',
      description: '30 seconds per question with auto-advance'
    },
    {
      icon: 'Target',
      title: 'Question Format',
      description: '10 multiple-choice questions with 4 options each'
    },
    {
      icon: 'Award',
      title: 'Scoring System',
      description: '1 point per correct answer, track your progress'
    },
    {
      icon: 'CheckCircle',
      title: 'Answer Selection',
      description: 'Must select an answer before proceeding to next'
    }
  ];

  return (
    <div className="bg-muted/50 rounded-lg p-6 mb-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Info" size={20} className="text-primary" />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Quiz Instructions</h2>
        <p className="text-sm text-muted-foreground">
          Read the rules below before starting your trivia challenge
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {instructions?.map((instruction, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
              <Icon name={instruction?.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground mb-1">
                {instruction?.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {instruction?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-warning mb-1">Important Note</p>
            <p className="text-xs text-muted-foreground">
              Questions are fetched from Open Trivia Database. If connection fails, local questions will be used as fallback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInstructions;