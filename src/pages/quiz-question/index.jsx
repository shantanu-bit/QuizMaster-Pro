import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import QuestionCard from './components/QuestionCard';
import AnswerOptions from './components/AnswerOptions';
import QuizTimer from './components/QuizTimer';
import QuizNavigation from './components/QuizNavigation';
import LoadingState from './components/LoadingState';

const QuizQuestion = () => {
  const navigate = useNavigate();
  
  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  // Mock quiz data - simulating Open Trivia DB API response
  const mockQuizData = [
    {
      question: "What is the capital of France?",
      correct_answer: "Paris",
      incorrect_answers: ["London", "Berlin", "Madrid"],
      difficulty: "easy",
      category: "Geography"
    },
    {
      question: "Which planet is known as the Red Planet?",
      correct_answer: "Mars",
      incorrect_answers: ["Venus", "Jupiter", "Saturn"],
      difficulty: "easy",
      category: "Science"
    },
    {
      question: "Who painted the Mona Lisa?",
      correct_answer: "Leonardo da Vinci",
      incorrect_answers: ["Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
      difficulty: "medium",
      category: "Art"
    },
    {
      question: "What is the largest mammal in the world?",
      correct_answer: "Blue Whale",
      incorrect_answers: ["African Elephant", "Giraffe", "Hippopotamus"],
      difficulty: "easy",
      category: "Nature"
    },
    {
      question: "In which year did World War II end?",
      correct_answer: "1945",
      incorrect_answers: ["1944", "1946", "1943"],
      difficulty: "medium",
      category: "History"
    },
    {
      question: "What is the chemical symbol for gold?",
      correct_answer: "Au",
      incorrect_answers: ["Go", "Gd", "Ag"],
      difficulty: "hard",
      category: "Chemistry"
    },
    {
      question: "Which Shakespeare play features the character Hamlet?",
      correct_answer: "Hamlet",
      incorrect_answers: ["Macbeth", "Romeo and Juliet", "Othello"],
      difficulty: "medium",
      category: "Literature"
    },
    {
      question: "What is the fastest land animal?",
      correct_answer: "Cheetah",
      incorrect_answers: ["Lion", "Leopard", "Tiger"],
      difficulty: "easy",
      category: "Nature"
    },
    {
      question: "Which programming language was created by Guido van Rossum?",
      correct_answer: "Python",
      incorrect_answers: ["Java", "JavaScript", "C++"],
      difficulty: "hard",
      category: "Technology"
    },
    {
      question: "What is the smallest country in the world?",
      correct_answer: "Vatican City",
      incorrect_answers: ["Monaco", "San Marino", "Liechtenstein"],
      difficulty: "medium",
      category: "Geography"
    }
  ];

  // Keyboard navigation handler
  const handleKeyDown = useCallback((event) => {
    if (!quizData?.length || isLoading || timeRemaining === 0) return;

    const currentQuestionData = getCurrentQuestion();
    if (!currentQuestionData?.answers) return;

    const { key } = event;
    
    // Handle number keys (1-4) and letter keys (A-D)
    if (['1', '2', '3', '4']?.includes(key)) {
      const index = parseInt(key) - 1;
      if (index < currentQuestionData?.answers?.length) {
        handleAnswerSelect(currentQuestionData?.answers?.[index]);
      }
    } else if (['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D']?.includes(key)) {
      const index = key?.toLowerCase()?.charCodeAt(0) - 97; // Convert to 0-3
      if (index < currentQuestionData?.answers?.length) {
        handleAnswerSelect(currentQuestionData?.answers?.[index]);
      }
    } else if (key === 'Enter' && selectedAnswer) {
      // Submit answer with Enter
      if (currentQuestion < quizData?.length) {
        handleNextQuestion();
      } else {
        handleSubmitQuiz();
      }
    } else if (key === ' ' && selectedAnswer) {
      // Submit answer with Spacebar
      event?.preventDefault();
      if (currentQuestion < quizData?.length) {
        handleNextQuestion();
      } else {
        handleSubmitQuiz();
      }
    }
  }, [currentQuestion, selectedAnswer, quizData, isLoading, timeRemaining]);

  // Add keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Initialize quiz data
  useEffect(() => {
    const initializeQuiz = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Shuffle answers for each question
        const processedData = mockQuizData?.map(item => {
          const allAnswers = [...item?.incorrect_answers, item?.correct_answer];
          const shuffledAnswers = allAnswers?.sort(() => Math.random() - 0.5);
          
          return {
            ...item,
            answers: shuffledAnswers
          };
        });
        
        setQuizData(processedData);
        setTimeRemaining(30);
      } catch (error) {
        console.error('Failed to load quiz data:', error);
        // Fallback to mock data
        setQuizData(mockQuizData?.slice(0, 5));
      } finally {
        setIsLoading(false);
      }
    };

    initializeQuiz();
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (timeRemaining > 0 && !isLoading && quizData?.length > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      // Auto-advance when time runs out
      handleTimeUp();
    }
  }, [timeRemaining, isLoading, quizData?.length]);

  // Handle time up
  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      // Record no answer if user didn't select anything
      setUserAnswers(prev => ({
        ...prev,
        [currentQuestion]: null
      }));
    }
    
    // Auto-advance to next question or results
    if (currentQuestion < quizData?.length) {
      handleNextQuestion();
    } else {
      handleSubmitQuiz();
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    if (timeRemaining > 0) {
      setSelectedAnswer(answer);
      setUserAnswers(prev => ({
        ...prev,
        [currentQuestion]: answer
      }));
    }
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestion < quizData?.length) {
      setIsLoading(true);
      
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setTimeRemaining(30);
        setIsLoading(false);
      }, 500);
    } else {
      handleSubmitQuiz();
    }
  };

  // Handle quiz submission
  const handleSubmitQuiz = () => {
    // Calculate score
    let score = 0;
    Object.entries(userAnswers)?.forEach(([questionIndex, userAnswer]) => {
      const question = quizData?.[parseInt(questionIndex) - 1];
      if (question && userAnswer === question?.correct_answer) {
        score++;
      }
    });

    // Store results in localStorage
    const quizResults = {
      score,
      totalQuestions: quizData?.length,
      userAnswers,
      quizData,
      completedAt: new Date()?.toISOString(),
      timePerQuestion: 30
    };

    localStorage.setItem('quizResults', JSON.stringify(quizResults));
    
    // Navigate to results
    navigate('/quiz-results');
  };

  // Get current question data
  const getCurrentQuestion = () => {
    if (quizData?.length === 0 || currentQuestion > quizData?.length) {
      return null;
    }
    return quizData?.[currentQuestion - 1];
  };

  const currentQuestionData = getCurrentQuestion();

  // Loading state
  if (isLoading || quizData?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader 
          quizState={{ 
            currentQuestion, 
            totalQuestions: 10 
          }} 
          isLoading={true} 
        />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <LoadingState />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <AppHeader 
        quizState={{ 
          currentQuestion, 
          totalQuestions: quizData?.length 
        }} 
        isLoading={isLoading} 
      />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-6 lg:py-8 max-w-4xl">
          {/* Progress and Timer Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Progress Indicator */}
            <div className="lg:col-span-2">
              <ProgressIndicator
                currentQuestion={currentQuestion}
                totalQuestions={quizData?.length}
                timeRemaining={timeRemaining}
                totalTime={30}
              />
            </div>
            
            {/* Timer */}
            <div className="flex justify-center lg:justify-end">
              <QuizTimer
                timeRemaining={timeRemaining}
                totalTime={30}
                onTimeUp={handleTimeUp}
                isActive={!isLoading}
              />
            </div>
          </div>

          {/* Question Section */}
          <div className="space-y-6">
            {currentQuestionData && (
              <>
                {/* Question Card */}
                <QuestionCard
                  question={currentQuestionData?.question}
                  difficulty={currentQuestionData?.difficulty}
                  className="quiz-fade-in shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80"
                />

                {/* Answer Options */}
                <AnswerOptions
                  options={currentQuestionData?.answers}
                  selectedAnswer={selectedAnswer}
                  onAnswerSelect={handleAnswerSelect}
                  disabled={timeRemaining === 0 || isLoading}
                  className="quiz-fade-in"
                />

                {/* Navigation */}
                <QuizNavigation
                  currentQuestion={currentQuestion}
                  totalQuestions={quizData?.length}
                  selectedAnswer={selectedAnswer}
                  onNext={handleNextQuestion}
                  onSubmit={handleSubmitQuiz}
                  loading={isLoading}
                  className="quiz-fade-in"
                />
              </>
            )}
          </div>

          {/* Keyboard Instructions */}
          <div className="mt-8 pt-6 border-t border-border bg-white/50 dark:bg-slate-800/50 rounded-lg p-4">
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Answer each question within 30 seconds
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs">A-D</kbd>
                  or
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs">1-4</kbd>
                  to select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs">Enter</kbd>
                  or
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs">Space</kbd>
                  to submit
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Questions will auto-advance when time expires
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizQuestion;