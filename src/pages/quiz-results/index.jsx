import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import ScoreDisplay from './components/ScoreDisplay';
import PerformanceMetrics from './components/PerformanceMetrics';
import DetailedAnswerReview from './components/DetailedAnswerReview';
import HighScoresList from './components/HighScoresList';
import ActionButtons from './components/ActionButtons';

const QuizResults = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [isHighScore, setIsHighScore] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock quiz results data - in a real app, this would come from quiz state
  const mockQuizResults = {
    score: 7,
    totalQuestions: 10,
    percentage: 70,
    difficulty: 'medium',
    timeTaken: 420, // 7 minutes
    totalTime: 600, // 10 minutes allowed
    startTime: new Date(Date.now() - 420000),
    endTime: new Date(),
    userAnswers: {
      1: "Paris",
      2: "Jupiter",
      3: "William Shakespeare",
      4: "1969",
      5: "Pacific Ocean",
      6: "Leonardo da Vinci",
      7: "Oxygen",
      8: "1945",
      9: "Mount Everest",
      10: "Albert Einstein"
    },
    questions: [
      {
        id: 1,
        category: "Geography",
        difficulty: "easy",
        question: "What is the capital of France?",
        correct_answer: "Paris",
        incorrect_answers: ["London", "Berlin", "Madrid"]
      },
      {
        id: 2,
        category: "Science",
        difficulty: "medium",
        question: "Which planet is the largest in our solar system?",
        correct_answer: "Jupiter",
        incorrect_answers: ["Saturn", "Neptune", "Earth"]
      },
      {
        id: 3,
        category: "Literature",
        difficulty: "medium",
        question: "Who wrote \'Romeo and Juliet\'?",
        correct_answer: "William Shakespeare",
        incorrect_answers: ["Charles Dickens", "Jane Austen", "Mark Twain"]
      },
      {
        id: 4,
        category: "History",
        difficulty: "easy",
        question: "In which year did humans first land on the moon?",
        correct_answer: "1969",
        incorrect_answers: ["1967", "1971", "1965"]
      },
      {
        id: 5,
        category: "Geography",
        difficulty: "easy",
        question: "What is the largest ocean on Earth?",
        correct_answer: "Pacific Ocean",
        incorrect_answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"]
      },
      {
        id: 6,
        category: "Art",
        difficulty: "medium",
        question: "Who painted the Mona Lisa?",
        correct_answer: "Leonardo da Vinci",
        incorrect_answers: ["Pablo Picasso", "Vincent van Gogh", "Michelangelo"]
      },
      {
        id: 7,
        category: "Science",
        difficulty: "easy",
        question: "What gas do plants absorb from the atmosphere during photosynthesis?",
        correct_answer: "Carbon Dioxide",
        incorrect_answers: ["Oxygen", "Nitrogen", "Hydrogen"]
      },
      {
        id: 8,
        category: "History",
        difficulty: "medium",
        question: "When did World War II end?",
        correct_answer: "1945",
        incorrect_answers: ["1944", "1946", "1943"]
      },
      {
        id: 9,
        category: "Geography",
        difficulty: "hard",
        question: "What is the highest mountain in the world?",
        correct_answer: "Mount Everest",
        incorrect_answers: ["K2", "Kangchenjunga", "Lhotse"]
      },
      {
        id: 10,
        category: "Science",
        difficulty: "hard",
        question: "Who developed the theory of relativity?",
        correct_answer: "Albert Einstein",
        incorrect_answers: ["Isaac Newton", "Galileo Galilei", "Stephen Hawking"]
      }
    ]
  };

  useEffect(() => {
    // Simulate loading quiz results
    const loadResults = async () => {
      setLoading(true);
      
      try {
        // Check localStorage for actual quiz state
        const savedState = localStorage.getItem('quizState');
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          if (parsedState?.endTime) {
            // Use actual quiz data if available
            setQuizData(parsedState);
          } else {
            // Use mock data if no completed quiz found
            setQuizData(mockQuizResults);
          }
        } else {
          // Use mock data as fallback
          setQuizData(mockQuizResults);
        }

        // Check if this is a high score
        const highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
        const currentScore = mockQuizResults?.percentage;
        const isNewHighScore = highScores?.length < 5 || currentScore > Math.min(...highScores?.map(s => s?.percentage));
        setIsHighScore(isNewHighScore);

        // Save high score if applicable
        if (isNewHighScore) {
          const newHighScore = {
            id: Date.now(),
            score: mockQuizResults?.score,
            totalQuestions: mockQuizResults?.totalQuestions,
            percentage: mockQuizResults?.percentage,
            difficulty: mockQuizResults?.difficulty,
            timeTaken: mockQuizResults?.timeTaken,
            date: new Date()?.toISOString()
          };
          
          const updatedHighScores = [...highScores, newHighScore]?.sort((a, b) => b?.percentage - a?.percentage)?.slice(0, 5);
          
          localStorage.setItem('highScores', JSON.stringify(updatedHighScores));
        }

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
      } catch (error) {
        console.error('Error loading quiz results:', error);
        setQuizData(mockQuizResults);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, []);

  const handleRestart = () => {
    localStorage.removeItem('quizState');
    navigate('/quiz-setup');
  };

  const handlePrintResults = () => {
    const printWindow = window.open('', '_blank');
    const date = new Date()?.toLocaleDateString();
    const time = new Date()?.toLocaleTimeString();
    
    const printContent = `
      <html>
        <head>
          <title>Quiz Results - QuizMaster Pro</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 5px; }
            .subtitle { color: #666; font-size: 14px; }
            .score-section { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .score-large { font-size: 48px; font-weight: bold; color: #2563eb; margin: 10px 0; }
            .percentage { font-size: 24px; color: #16a34a; }
            .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
            .detail-item { padding: 15px; border: 1px solid #e5e7eb; border-radius: 6px; }
            .detail-label { font-weight: bold; color: #374151; }
            .detail-value { color: #6b7280; margin-top: 5px; }
            .questions-section { margin-top: 30px; }
            .question-item { margin: 15px 0; padding: 15px; border-left: 4px solid #e5e7eb; }
            .question-text { font-weight: bold; margin-bottom: 8px; }
            .answer-correct { color: #16a34a; }
            .answer-incorrect { color: #dc2626; }
            .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🧠 QuizMaster Pro</div>
            <div class="subtitle">Educational Quiz Platform</div>
            <div style="margin-top: 10px; color: #666;">Quiz Results - ${date} at ${time}</div>
          </div>
          
          <div class="score-section">
            <div class="score-large">${quizData?.score}/${quizData?.totalQuestions}</div>
            <div class="percentage">${Math.round((quizData?.score / quizData?.totalQuestions) * 100)}% Correct</div>
            <div style="margin-top: 10px; color: #666;">Quiz Performance Summary</div>
          </div>
          
          <div class="details-grid">
            <div class="detail-item">
              <div class="detail-label">Total Questions</div>
              <div class="detail-value">${quizData?.totalQuestions}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Correct Answers</div>
              <div class="detail-value">${quizData?.score}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Accuracy Rate</div>
              <div class="detail-value">${Math.round((quizData?.score / quizData?.totalQuestions) * 100)}%</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Completion Date</div>
              <div class="detail-value">${date}</div>
            </div>
          </div>
          
          <div class="questions-section">
            <h3>Detailed Results</h3>
            ${quizData?.questions?.map((question, index) => {
              const userAnswer = quizData?.userAnswers?.[index + 1];
              const isCorrect = userAnswer === question?.correct_answer;
              return `
                <div class="question-item">
                  <div class="question-text">${index + 1}. ${question?.question}</div>
                  <div class="${isCorrect ? 'answer-correct' : 'answer-incorrect'}">
                    Your Answer: ${userAnswer || 'No answer'} ${isCorrect ? '✓' : '✗'}
                  </div>
                  ${!isCorrect ? `<div class="answer-correct">Correct Answer: ${question?.correct_answer}</div>` : ''}
                </div>
              `;
            })?.join('')}
          </div>
          
          <div class="footer">
            Generated by QuizMaster Pro - Educational Quiz Platform<br>
            Keep learning and improving your knowledge!
          </div>
        </body>
      </html>
    `;
    
    printWindow?.document?.write(printContent);
    printWindow?.document?.close();
    printWindow?.focus();
    printWindow?.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader isLoading={true} />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your results...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No quiz results found.</p>
            <button
              onClick={() => navigate('/quiz-setup')}
              className="text-primary hover:underline"
            >
              Start a new quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const averageTimePerQuestion = quizData?.timeTaken / quizData?.totalQuestions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <AppHeader 
        quizState={{
          score: quizData?.score,
          totalQuestions: quizData?.totalQuestions
        }}
      />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground">
              Here's how you performed on your quiz challenge
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Results Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Score Display */}
              <ScoreDisplay
                score={quizData?.score}
                totalQuestions={quizData?.totalQuestions}
                percentage={quizData?.percentage}
                isHighScore={isHighScore}
              />

              {/* Performance Metrics */}
              <PerformanceMetrics
                timeTaken={quizData?.timeTaken}
                totalTime={quizData?.totalTime}
                difficulty={quizData?.difficulty}
                averageTimePerQuestion={averageTimePerQuestion}
                questionsAnswered={quizData?.totalQuestions}
              />

              {/* Detailed Answer Review */}
              <DetailedAnswerReview
                questions={quizData?.questions}
                userAnswers={quizData?.userAnswers}
              />

              {/* Action Buttons */}
              <ActionButtons
                onRestart={handleRestart}
                onPrint={handlePrintResults}
                score={quizData?.score}
                totalQuestions={quizData?.totalQuestions}
                percentage={quizData?.percentage}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* High Scores List */}
              <div id="high-scores">
                <HighScoresList
                  currentScore={{
                    score: quizData?.score,
                    totalQuestions: quizData?.totalQuestions,
                    percentage: quizData?.percentage,
                    difficulty: quizData?.difficulty,
                    timeTaken: quizData?.timeTaken
                  }}
                  currentSession={true}
                />
              </div>

              {/* Quick Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="quiz-card p-6 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Session Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Questions Answered:</span>
                    <span className="font-medium text-foreground">{quizData?.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Correct Answers:</span>
                    <span className="font-medium text-success">{quizData?.score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accuracy Rate:</span>
                    <span className="font-medium text-foreground">{Math.round((quizData?.score / quizData?.totalQuestions) * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Efficiency:</span>
                    <span className="font-medium text-foreground">
                      {Math.round((quizData?.timeTaken / quizData?.totalTime) * 100)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizResults;