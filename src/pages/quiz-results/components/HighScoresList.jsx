import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const HighScoresList = ({ currentScore, currentSession }) => {
  // Mock high scores data - in a real app, this would come from localStorage
  const mockHighScores = [
    {
      id: 1,
      score: 9,
      totalQuestions: 10,
      percentage: 90,
      difficulty: 'hard',
      timeTaken: 245,
      date: new Date('2025-01-03T14:30:00'),
      isCurrentSession: false
    },
    {
      id: 2,
      score: 8,
      totalQuestions: 10,
      percentage: 80,
      difficulty: 'medium',
      timeTaken: 180,
      date: new Date('2025-01-02T16:45:00'),
      isCurrentSession: false
    },
    {
      id: 3,
      score: currentScore?.score || 7,
      totalQuestions: currentScore?.totalQuestions || 10,
      percentage: currentScore?.percentage || 70,
      difficulty: currentScore?.difficulty || 'easy',
      timeTaken: currentScore?.timeTaken || 220,
      date: new Date(),
      isCurrentSession: true
    },
    {
      id: 4,
      score: 7,
      totalQuestions: 10,
      percentage: 70,
      difficulty: 'easy',
      timeTaken: 195,
      date: new Date('2024-12-30T10:15:00'),
      isCurrentSession: false
    },
    {
      id: 5,
      score: 6,
      totalQuestions: 10,
      percentage: 60,
      difficulty: 'medium',
      timeTaken: 280,
      date: new Date('2024-12-28T13:20:00'),
      isCurrentSession: false
    }
  ];

  // Sort by score (descending) and then by date (most recent first)
  const sortedScores = mockHighScores?.sort((a, b) => {
      if (b?.score !== a?.score) return b?.score - a?.score;
      return new Date(b.date) - new Date(a.date);
    })?.slice(0, 5); // Top 5 scores

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date?.getFullYear() !== now?.getFullYear() ? 'numeric' : undefined
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return { name: 'Trophy', color: 'text-yellow-500' };
      case 1: return { name: 'Medal', color: 'text-gray-400' };
      case 2: return { name: 'Award', color: 'text-amber-600' };
      default: return { name: 'Target', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="quiz-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">High Scores</h3>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={16} />
          <span>Top 5 Performances</span>
        </div>
      </div>
      <div className="space-y-3">
        {sortedScores?.map((score, index) => {
          const rankIcon = getRankIcon(index);
          
          return (
            <motion.div
              key={score?.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                score?.isCurrentSession 
                  ? 'bg-primary/10 border-primary/30 ring-2 ring-primary/20' :'bg-muted/30 border-border hover:bg-muted/50'
              }`}
            >
              {/* Rank and Score */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8">
                  {index < 3 ? (
                    <Icon name={rankIcon?.name} size={20} className={rankIcon?.color} />
                  ) : (
                    <span className="text-sm font-bold text-muted-foreground">
                      #{index + 1}
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-foreground">
                      {score?.score}/{score?.totalQuestions}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({score?.percentage}%)
                    </span>
                    {score?.isCurrentSession && (
                      <span className="inline-flex items-center space-x-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                        <Icon name="Sparkles" size={12} />
                        <span>New</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                    <span className={getDifficultyColor(score?.difficulty)}>
                      {score?.difficulty?.charAt(0)?.toUpperCase() + score?.difficulty?.slice(1)}
                    </span>
                    <span>•</span>
                    <span>{formatTime(score?.timeTaken)}</span>
                    <span>•</span>
                    <span>{formatDate(score?.date)}</span>
                  </div>
                </div>
              </div>
              {/* Performance Indicator */}
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-muted rounded-full h-2">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      score?.percentage >= 80 ? 'bg-success' :
                      score?.percentage >= 60 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${score?.percentage}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* Statistics Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-6 pt-4 border-t border-border"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">
              {Math.max(...sortedScores?.map(s => s?.score))}
            </div>
            <div className="text-xs text-muted-foreground">Best Score</div>
          </div>
          
          <div>
            <div className="text-lg font-bold text-foreground">
              {Math.round(sortedScores?.reduce((acc, s) => acc + s?.percentage, 0) / sortedScores?.length)}%
            </div>
            <div className="text-xs text-muted-foreground">Avg. Score</div>
          </div>
          
          <div>
            <div className="text-lg font-bold text-foreground">
              {sortedScores?.length}
            </div>
            <div className="text-xs text-muted-foreground">Total Attempts</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HighScoresList;