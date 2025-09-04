import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const ActionButtons = ({ onRestart, onPrint, score, totalQuestions, percentage }) => {
  const navigate = useNavigate();

  const handleRestart = () => {
    if (onRestart) {
      onRestart();
    } else {
      // Clear quiz state and navigate to setup
      localStorage.removeItem('quizState');
      navigate('/quiz-setup');
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    }
  };

  return (
    <div className="space-y-6">
      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Button
            variant="default"
            size="lg"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={handleRestart}
            className="w-full sm:w-auto px-8"
          >
            Take Another Quiz
          </Button>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Button
            variant="outline"
            size="lg"
            iconName="Printer"
            iconPosition="left"
            onClick={handlePrint}
            className="w-full sm:w-auto px-8"
          >
            Print Results
          </Button>
        </motion.div>
      </div>
      {/* Secondary Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex justify-center"
      >
        <Button
          variant="ghost"
          size="default"
          iconName="BarChart3"
          iconPosition="left"
          onClick={() => {
            // Scroll to high scores section
            document.getElementById('high-scores')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full sm:w-auto"
        >
          View High Scores
        </Button>
      </motion.div>
      {/* Motivational Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {percentage >= 80 
            ? "Outstanding performance! You've mastered this topic. Ready for a harder challenge?"
            : percentage >= 60
            ? "Great job! Keep practicing to improve your score even further." :"Every attempt makes you smarter. Try again and see how much you can improve!"
          }
        </p>
      </motion.div>
    </div>
  );
};

export default ActionButtons;