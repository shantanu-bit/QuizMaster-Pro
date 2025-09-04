import React from 'react';
import Button from '../../../components/ui/Button';

const AnswerOptions = ({ 
  options = [], 
  selectedAnswer, 
  onAnswerSelect, 
  disabled = false,
  className = '' 
}) => {
  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt?.value;
  };

  const getOptionLabel = (index) => {
    return String.fromCharCode(65 + index); // A, B, C, D
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {options?.map((option, index) => {
        const isSelected = selectedAnswer === option;
        const optionLabel = getOptionLabel(index);
        
        return (
          <Button
            key={index}
            variant={isSelected ? "default" : "outline"}
            size="lg"
            fullWidth
            disabled={disabled}
            onClick={() => onAnswerSelect(option)}
            className={`justify-start text-left p-4 h-auto min-h-[60px] transition-all duration-200 group ${
              isSelected 
                ? 'ring-2 ring-primary ring-offset-2 hover:bg-primary hover:text-primary-foreground' 
                : 'hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
            }`}
          >
            <div className="flex items-start space-x-3 w-full">
              <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                isSelected 
                  ? 'bg-primary-foreground text-primary group-hover:bg-primary group-hover:text-primary-foreground' 
                  : 'bg-muted text-muted-foreground group-hover:bg-slate-200 group-hover:text-slate-800 dark:group-hover:bg-slate-700 dark:group-hover:text-slate-200'
              }`}>
                {optionLabel}
              </span>
              <span className="flex-1 text-sm lg:text-base leading-relaxed">
                {decodeHtml(option)}
              </span>
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default AnswerOptions;