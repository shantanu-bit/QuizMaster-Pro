import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ErrorMessage = ({ error, onRetry, onUseFallback }) => {
  if (!error) return null;

  return (
    <div className="bg-error/10 border border-error/20 rounded-lg p-6 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Icon name="AlertCircle" size={20} className="text-error" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-error mb-2">
            Connection Error
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {error || "Unable to fetch questions from Open Trivia Database. You can retry the connection or use local questions as a fallback."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={onRetry}
              className="flex-1 sm:flex-none"
            >
              Retry Connection
            </Button>
            <Button
              variant="secondary"
              size="sm"
              iconName="Database"
              iconPosition="left"
              onClick={onUseFallback}
              className="flex-1 sm:flex-none"
            >
              Use Local Questions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;