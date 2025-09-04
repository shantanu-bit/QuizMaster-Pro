import React from 'react';
import Icon from '../../../components/AppIcon';

const HighScoresSection = () => {
  // Mock high scores data from localStorage simulation
  const highScores = [
    {
      id: 1,
      score: 10,
      totalQuestions: 10,
      difficulty: 'hard',
      timestamp: new Date('2025-01-03T14:30:00'),
      percentage: 100
    },
    {
      id: 2,
      score: 9,
      totalQuestions: 10,
      difficulty: 'medium',
      timestamp: new Date('2025-01-02T16:45:00'),
      percentage: 90
    },
    {
      id: 3,
      score: 8,
      totalQuestions: 10,
      difficulty: 'hard',
      timestamp: new Date('2025-01-01T12:20:00'),
      percentage: 80
    },
    {
      id: 4,
      score: 8,
      totalQuestions: 10,
      difficulty: 'easy',
      timestamp: new Date('2024-12-30T18:15:00'),
      percentage: 80
    },
    {
      id: 5,
      score: 7,
      totalQuestions: 10,
      difficulty: 'medium',
      timestamp: new Date('2024-12-29T10:30:00'),
      percentage: 70
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-success bg-success/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'hard':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (highScores?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center">
          <div className="p-3 bg-muted/50 rounded-full w-fit mx-auto mb-3">
            <Icon name="Trophy" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No High Scores Yet</h3>
          <p className="text-sm text-muted-foreground">
            Complete your first quiz to start building your leaderboard!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Trophy" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">High Scores</h3>
            <p className="text-sm text-muted-foreground">Your top 5 quiz performances</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {highScores?.length} record{highScores?.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className="space-y-3">
        {highScores?.map((score, index) => (
          <div
            key={score?.id}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              {/* Rank */}
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                <span className="text-sm font-semibold text-primary">
                  #{index + 1}
                </span>
              </div>

              {/* Score Info */}
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-foreground">
                    {score?.score}/{score?.totalQuestions}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({score?.percentage}%)
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(score?.difficulty)}`}>
                    {score?.difficulty?.charAt(0)?.toUpperCase() + score?.difficulty?.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Timestamp */}
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                {formatDate(score?.timestamp)}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatTime(score?.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Best Score:</span>
          <span className="font-semibold text-foreground">
            {Math.max(...highScores?.map(s => s?.percentage))}% ({Math.max(...highScores?.map(s => s?.score))}/10)
          </span>
        </div>
      </div>
    </div>
  );
};

export default HighScoresSection;