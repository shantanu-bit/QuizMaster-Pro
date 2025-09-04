import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ 
  timeTaken, 
  totalTime, 
  difficulty, 
  averageTimePerQuestion,
  questionsAnswered 
}) => {
  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy': return 'bg-success/20 text-success border-success/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'hard': return 'bg-error/20 text-error border-error/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getDifficultyIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy': return 'Smile';
      case 'medium': return 'Meh';
      case 'hard': return 'Frown';
      default: return 'HelpCircle';
    }
  };

  const metrics = [
    {
      icon: 'Clock',
      label: 'Total Time',
      value: formatTime(timeTaken),
      description: totalTime ? `of ${formatTime(totalTime)} allowed` : 'No time limit'
    },
    {
      icon: 'Timer',
      label: 'Avg. per Question',
      value: formatTime(Math.round(averageTimePerQuestion)),
      description: 'Average response time'
    },
    {
      icon: 'CheckCircle',
      label: 'Questions Answered',
      value: questionsAnswered,
      description: 'All questions completed'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Difficulty Badge */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center justify-center"
      >
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${getDifficultyColor(difficulty)}`}>
          <Icon name={getDifficultyIcon(difficulty)} size={18} />
          <span className="font-medium capitalize">
            {difficulty || 'Mixed'} Difficulty
          </span>
        </div>
      </motion.div>
      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics?.map((metric, index) => (
          <motion.div
            key={metric?.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
            className="quiz-card p-4 text-center"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mx-auto mb-3">
              <Icon name={metric?.icon} size={20} className="text-primary" />
            </div>
            
            <div className="text-2xl font-bold text-foreground mb-1">
              {metric?.value}
            </div>
            
            <div className="text-sm font-medium text-foreground mb-1">
              {metric?.label}
            </div>
            
            <div className="text-xs text-muted-foreground">
              {metric?.description}
            </div>
          </motion.div>
        ))}
      </div>
      {/* Time Efficiency Indicator */}
      {totalTime && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="quiz-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Time Efficiency</span>
            <span className="text-sm text-muted-foreground">
              {Math.round((timeTaken / totalTime) * 100)}% of time used
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((timeTaken / totalTime) * 100, 100)}%` }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full ${
                (timeTaken / totalTime) <= 0.7 ? 'bg-success' : 
                (timeTaken / totalTime) <= 0.9 ? 'bg-warning' : 'bg-error'
              }`}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PerformanceMetrics;