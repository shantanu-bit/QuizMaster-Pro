import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ScoreDisplay = ({ score, totalQuestions, percentage, isHighScore = false }) => {
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreMessage = () => {
    if (percentage >= 90) return 'Outstanding Performance!';
    if (percentage >= 80) return 'Excellent Work!';
    if (percentage >= 70) return 'Great Job!';
    if (percentage >= 60) return 'Good Effort!';
    return 'Keep Practicing!';
  };

  const getScoreIcon = () => {
    if (percentage >= 80) return 'Trophy';
    if (percentage >= 60) return 'Award';
    return 'Target';
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="quiz-card p-8 text-center relative overflow-hidden"
    >
      {/* Background celebration effect */}
      {isHighScore && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg"
        />
      )}
      <div className="relative z-10">
        {/* Score Icon */}
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            percentage >= 80 ? 'bg-success/20' : percentage >= 60 ? 'bg-warning/20' : 'bg-error/20'
          }`}
        >
          <Icon 
            name={getScoreIcon()} 
            size={32} 
            className={getScoreColor()}
          />
        </motion.div>

        {/* High Score Badge */}
        {isHighScore && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4"
          >
            <Icon name="Star" size={16} />
            <span>New High Score!</span>
          </motion.div>
        )}

        {/* Score Message */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-2xl font-semibold text-foreground mb-2"
        >
          {getScoreMessage()}
        </motion.h2>

        {/* Main Score Display */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
          className="mb-4"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className={`text-5xl font-bold ${getScoreColor()}`}>
              {score}
            </span>
            <span className="text-2xl text-muted-foreground font-medium">
              / {totalQuestions}
            </span>
          </div>
          
          <div className={`text-xl font-semibold ${getScoreColor()}`}>
            {percentage?.toFixed(1)}% Correct
          </div>
        </motion.div>

        {/* Performance Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="text-muted-foreground max-w-md mx-auto"
        >
          {percentage >= 80 
            ? "You demonstrated excellent knowledge and understanding of the subject matter."
            : percentage >= 60
            ? "You showed good understanding with room for improvement in some areas."
            : "Consider reviewing the topics and trying again to improve your score."
          }
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ScoreDisplay;