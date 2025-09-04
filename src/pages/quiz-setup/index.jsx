import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import DifficultySelector from './components/DifficultySelector';
import QuizInstructions from './components/QuizInstructions';
import HighScoresSection from './components/HighScoresSection';
import StartQuizButton from './components/StartQuizButton';
import ErrorMessage from './components/ErrorMessage';

const QuizSetup = () => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock fallback questions for when API fails
  const fallbackQuestions = [
    {
      category: "General Knowledge",
      type: "multiple",
      difficulty: "easy",
      question: "What is the capital of France?",
      correct_answer: "Paris",
      incorrect_answers: ["London", "Berlin", "Madrid"]
    },
    {
      category: "Science",
      type: "multiple", 
      difficulty: "medium",
      question: "What is the chemical symbol for gold?",
      correct_answer: "Au",
      incorrect_answers: ["Go", "Gd", "Ag"]
    },
    {
      category: "History",
      type: "multiple",
      difficulty: "hard",
      question: "In which year did World War II end?",
      correct_answer: "1945",
      incorrect_answers: ["1944", "1946", "1943"]
    },
    {
      category: "Geography",
      type: "multiple",
      difficulty: "easy",
      question: "Which continent is the largest by area?",
      correct_answer: "Asia",
      incorrect_answers: ["Africa", "North America", "Europe"]
    },
    {
      category: "Sports",
      type: "multiple",
      difficulty: "medium",
      question: "How many players are on a basketball team on the court at one time?",
      correct_answer: "5",
      incorrect_answers: ["6", "7", "4"]
    },
    {
      category: "Literature",
      type: "multiple",
      difficulty: "hard",
      question: "Who wrote the novel \'1984\'?",
      correct_answer: "George Orwell",
      incorrect_answers: ["Aldous Huxley", "Ray Bradbury", "H.G. Wells"]
    },
    {
      category: "Science",
      type: "multiple",
      difficulty: "easy",
      question: "What planet is known as the Red Planet?",
      correct_answer: "Mars",
      incorrect_answers: ["Venus", "Jupiter", "Saturn"]
    },
    {
      category: "Entertainment",
      type: "multiple",
      difficulty: "medium",
      question: "Which movie won the Academy Award for Best Picture in 2020?",
      correct_answer: "Parasite",
      incorrect_answers: ["1917", "Joker", "Once Upon a Time in Hollywood"]
    },
    {
      category: "Mathematics",
      type: "multiple",
      difficulty: "hard",
      question: "What is the derivative of x²?",
      correct_answer: "2x",
      incorrect_answers: ["x²", "x", "2x²"]
    },
    {
      category: "General Knowledge",
      type: "multiple",
      difficulty: "easy",
      question: "How many days are there in a leap year?",
      correct_answer: "366",
      incorrect_answers: ["365", "364", "367"]
    }
  ];

  const fetchQuizQuestions = async (difficulty) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call to Open Trivia Database
      const response = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`);
      
      if (!response?.ok) {
        throw new Error('Failed to fetch questions from Open Trivia Database');
      }

      const data = await response?.json();
      
      if (data?.response_code !== 0) {
        throw new Error('No questions available for selected difficulty');
      }

      return data?.results;
    } catch (err) {
      console.error('API Error:', err);
      throw new Error('Unable to connect to Open Trivia Database. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartQuiz = async () => {
    if (!selectedDifficulty) return;

    try {
      let questions;
      
      try {
        // Try to fetch from API first
        questions = await fetchQuizQuestions(selectedDifficulty);
      } catch (apiError) {
        setError(apiError?.message);
        return;
      }

      // Prepare quiz configuration
      const quizConfig = {
        questions: questions,
        difficulty: selectedDifficulty,
        totalQuestions: questions?.length,
        timeLimit: 30, // 30 seconds per question
        startTime: new Date()?.toISOString()
      };

      // Store quiz data in localStorage for persistence
      localStorage.setItem('currentQuiz', JSON.stringify(quizConfig));
      localStorage.setItem('quizInProgress', 'true');

      // Navigate to quiz question page
      navigate('/quiz-question');
    } catch (err) {
      setError('Failed to initialize quiz. Please try again.');
      console.error('Quiz initialization error:', err);
    }
  };

  const handleRetryConnection = () => {
    setError(null);
    handleStartQuiz();
  };

  const handleUseFallback = () => {
    setIsLoading(true);
    setError(null);

    // Filter fallback questions by difficulty
    const filteredQuestions = fallbackQuestions?.filter(q => q?.difficulty === selectedDifficulty);
    
    // If not enough questions for selected difficulty, use all questions
    const questionsToUse = filteredQuestions?.length >= 5 ? filteredQuestions : fallbackQuestions?.slice(0, 10);

    const quizConfig = {
      questions: questionsToUse,
      difficulty: selectedDifficulty,
      totalQuestions: questionsToUse?.length,
      timeLimit: 30,
      startTime: new Date()?.toISOString(),
      isOffline: true
    };

    localStorage.setItem('currentQuiz', JSON.stringify(quizConfig));
    localStorage.setItem('quizInProgress', 'true');

    setTimeout(() => {
      setIsLoading(false);
      navigate('/quiz-question');
    }, 1000);
  };

  // Clear any existing quiz data on component mount
  useEffect(() => {
    localStorage.removeItem('currentQuiz');
    localStorage.removeItem('quizInProgress');
    localStorage.removeItem('quizResults');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-3">
              QuizMaster Pro
            </h1>
            <p className="text-lg text-muted-foreground">
              Test your knowledge with our interactive trivia challenge
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Quiz Setup */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quiz Instructions */}
              <QuizInstructions />

              {/* Error Message */}
              <ErrorMessage 
                error={error}
                onRetry={handleRetryConnection}
                onUseFallback={handleUseFallback}
              />

              {/* Difficulty Selection */}
              <div className="bg-card border border-border rounded-lg p-6">
                <DifficultySelector
                  selectedDifficulty={selectedDifficulty}
                  onDifficultyChange={setSelectedDifficulty}
                />
              </div>

              {/* Start Quiz Button */}
              <div className="bg-card border border-border rounded-lg p-6">
                <StartQuizButton
                  selectedDifficulty={selectedDifficulty}
                  onStartQuiz={handleStartQuiz}
                  isLoading={isLoading}
                  disabled={!!error}
                />
              </div>
            </div>

            {/* High Scores Sidebar */}
            <div className="lg:col-span-1">
              <HighScoresSection />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Questions powered by Open Trivia Database • © {new Date()?.getFullYear()} QuizMaster Pro
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizSetup;