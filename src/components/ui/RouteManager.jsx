import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Quiz Context for state management
const QuizContext = createContext();

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

const RouteManager = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Quiz state management
  const [quizState, setQuizState] = useState({
    isActive: false,
    currentQuestion: 1,
    totalQuestions: 10,
    selectedAnswers: {},
    score: 0,
    timeRemaining: null,
    totalTime: null,
    quizData: null,
    startTime: null,
    endTime: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize quiz data
  const initializeQuiz = async (config) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call for quiz data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newQuizState = {
        ...quizState,
        isActive: true,
        currentQuestion: 1,
        totalQuestions: config?.totalQuestions || 10,
        selectedAnswers: {},
        score: 0,
        timeRemaining: config?.timeLimit || null,
        totalTime: config?.timeLimit || null,
        quizData: config?.quizData || null,
        startTime: new Date(),
        endTime: null
      };
      
      setQuizState(newQuizState);
      
      // Store in localStorage for persistence
      localStorage.setItem('quizState', JSON.stringify(newQuizState));
      
      return newQuizState;
    } catch (err) {
      setError('Failed to initialize quiz. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (quizState?.currentQuestion < quizState?.totalQuestions) {
      const updatedState = {
        ...quizState,
        currentQuestion: quizState?.currentQuestion + 1
      };
      setQuizState(updatedState);
      localStorage.setItem('quizState', JSON.stringify(updatedState));
    } else {
      // Quiz completed, navigate to results
      completeQuiz();
    }
  };

  // Submit answer for current question
  const submitAnswer = (questionId, answer) => {
    const updatedAnswers = {
      ...quizState?.selectedAnswers,
      [questionId]: answer
    };
    
    const updatedState = {
      ...quizState,
      selectedAnswers: updatedAnswers
    };
    
    setQuizState(updatedState);
    localStorage.setItem('quizState', JSON.stringify(updatedState));
  };

  // Complete quiz and calculate results
  const completeQuiz = () => {
    const endTime = new Date();
    const completedState = {
      ...quizState,
      isActive: false,
      endTime: endTime
    };
    
    // Calculate score (this would typically be done on the server)
    const calculatedScore = Object.keys(quizState?.selectedAnswers)?.length;
    completedState.score = calculatedScore;
    
    setQuizState(completedState);
    localStorage.setItem('quizState', JSON.stringify(completedState));
    
    navigate('/quiz-results');
  };

  // Reset quiz state
  const resetQuiz = () => {
    const initialState = {
      isActive: false,
      currentQuestion: 1,
      totalQuestions: 10,
      selectedAnswers: {},
      score: 0,
      timeRemaining: null,
      totalTime: null,
      quizData: null,
      startTime: null,
      endTime: null
    };
    
    setQuizState(initialState);
    localStorage.removeItem('quizState');
    setError(null);
    navigate('/quiz-setup');
  };

  // Navigation helpers
  const navigateToSetup = () => navigate('/quiz-setup');
  const navigateToQuiz = () => navigate('/quiz-question');
  const navigateToResults = () => navigate('/quiz-results');

  // Restore state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setQuizState(parsedState);
      } catch (err) {
        console.error('Failed to restore quiz state:', err);
        localStorage.removeItem('quizState');
      }
    }
  }, []);

  // Handle browser refresh/navigation
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (quizState?.isActive && location?.pathname === '/quiz-question') {
        e?.preventDefault();
        e.returnValue = 'You have an active quiz. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [quizState?.isActive, location?.pathname]);

  // Timer management
  useEffect(() => {
    let timer;
    
    if (quizState?.isActive && quizState?.timeRemaining > 0) {
      timer = setInterval(() => {
        setQuizState(prevState => {
          const newTimeRemaining = prevState?.timeRemaining - 1;
          
          if (newTimeRemaining <= 0) {
            // Time's up, complete quiz
            setTimeout(completeQuiz, 100);
            return { ...prevState, timeRemaining: 0 };
          }
          
          const updatedState = { ...prevState, timeRemaining: newTimeRemaining };
          localStorage.setItem('quizState', JSON.stringify(updatedState));
          return updatedState;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [quizState?.isActive, quizState?.timeRemaining]);

  const contextValue = {
    // State
    quizState,
    isLoading,
    error,
    
    // Actions
    initializeQuiz,
    nextQuestion,
    submitAnswer,
    completeQuiz,
    resetQuiz,
    
    // Navigation
    navigateToSetup,
    navigateToQuiz,
    navigateToResults,
    
    // Utilities
    setError,
    setIsLoading
  };

  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  );
};

export default RouteManager;