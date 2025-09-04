import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AppHeader = ({ quizState = null, isLoading = false }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getProgressContext = () => {
    switch (location?.pathname) {
      case '/quiz-setup':
        return { title: 'Quiz Setup', subtitle: 'Configure your quiz settings' };
      case '/quiz-question':
        return { 
          title: 'Quiz in Progress', 
          subtitle: quizState ? `Question ${quizState?.currentQuestion} of ${quizState?.totalQuestions}` : 'Loading...'
        };
      case '/quiz-results':
        return { 
          title: 'Quiz Results', 
          subtitle: quizState ? `Score: ${quizState?.score}/${quizState?.totalQuestions}` : 'View your performance'
        };
      default:
        return { title: 'QuizMaster Pro', subtitle: 'Educational Quiz Platform' };
    }
  };

  const { title, subtitle } = getProgressContext();

  const handleLogoClick = () => {
    if (location?.pathname !== '/quiz-question') {
      navigate('/quiz-setup');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-white/80 backdrop-blur-sm border-b border-border dark:bg-slate-900/80 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo and Brand */}
        <div 
          className={`flex items-center space-x-3 ${location?.pathname !== '/quiz-question' ? 'cursor-pointer' : ''}`}
          onClick={handleLogoClick}
        >
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md">
            <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground leading-tight">
              QuizMaster Pro
            </h1>
            <span className="text-xs text-muted-foreground leading-tight hidden sm:block">
              Educational Quiz Platform
            </span>
          </div>
        </div>

        {/* Progress Context */}
        <div className="flex items-center space-x-4">
          {isLoading && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span className="text-sm hidden sm:inline">Loading...</span>
            </div>
          )}
          
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-foreground">{title}</div>
            <div className="text-xs text-muted-foreground">{subtitle}</div>
          </div>

          {/* Mobile Progress Indicator */}
          {location?.pathname === '/quiz-question' && quizState && (
            <div className="md:hidden bg-muted px-2 py-1 rounded-md">
              <span className="text-xs font-mono text-muted-foreground">
                {quizState?.currentQuestion}/{quizState?.totalQuestions}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;