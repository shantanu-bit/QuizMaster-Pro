import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const DetailedAnswerReview = ({ questions, userAnswers }) => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleQuestion = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const isCorrect = (questionId, userAnswer) => {
    const question = questions?.find(q => q?.id === questionId);
    return question && userAnswer === question?.correct_answer;
  };

  const getAnswerStatus = (questionId, userAnswer) => {
    if (!userAnswer) return 'unanswered';
    return isCorrect(questionId, userAnswer) ? 'correct' : 'incorrect';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'correct': return 'CheckCircle';
      case 'incorrect': return 'XCircle';
      case 'unanswered': return 'HelpCircle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'correct': return 'text-success bg-success/10 border-success/20';
      case 'incorrect': return 'text-error bg-error/10 border-error/20';
      case 'unanswered': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt?.value;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Answer Review</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-muted-foreground">
              {questions?.filter(q => isCorrect(q?.id, userAnswers?.[q?.id]))?.length} Correct
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="XCircle" size={16} className="text-error" />
            <span className="text-muted-foreground">
              {questions?.filter(q => userAnswers?.[q?.id] && !isCorrect(q?.id, userAnswers?.[q?.id]))?.length} Incorrect
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {questions?.map((question, index) => {
          const userAnswer = userAnswers?.[question?.id];
          const status = getAnswerStatus(question?.id, userAnswer);
          const isExpanded = expandedQuestion === question?.id;
          
          // Combine correct and incorrect answers, shuffle them
          const allAnswers = [...question?.incorrect_answers, question?.correct_answer]?.sort();

          return (
            <motion.div
              key={question?.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className={`quiz-card border-l-4 ${
                status === 'correct' ? 'border-l-success' : 
                status === 'incorrect' ? 'border-l-error' : 'border-l-muted'
              }`}
            >
              <button
                onClick={() => toggleQuestion(question?.id)}
                className="w-full p-4 text-left hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Question {index + 1}
                      </span>
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                        <Icon name={getStatusIcon(status)} size={12} />
                        <span className="capitalize">{status}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-base font-medium text-foreground leading-relaxed">
                      {decodeHtml(question?.question)}
                    </h4>
                    
                    {!isExpanded && userAnswer && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Your answer: <span className="font-medium">{decodeHtml(userAnswer)}</span>
                      </div>
                    )}
                  </div>
                  
                  <Icon 
                    name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                    size={20} 
                    className="text-muted-foreground flex-shrink-0"
                  />
                </div>
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 border-t border-border">
                      <div className="pt-4 space-y-3">
                        {/* Answer Options */}
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-foreground">Answer Options:</h5>
                          {allAnswers?.map((answer, answerIndex) => {
                            const isUserAnswer = userAnswer === answer;
                            const isCorrectAnswer = answer === question?.correct_answer;
                            
                            return (
                              <div
                                key={answerIndex}
                                className={`flex items-center space-x-3 p-3 rounded-lg border ${
                                  isCorrectAnswer 
                                    ? 'bg-success/10 border-success/20' 
                                    : isUserAnswer && !isCorrectAnswer
                                    ? 'bg-error/10 border-error/20' :'bg-muted/30 border-border'
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  {isCorrectAnswer && (
                                    <Icon name="CheckCircle" size={16} className="text-success" />
                                  )}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <Icon name="XCircle" size={16} className="text-error" />
                                  )}
                                  {!isUserAnswer && !isCorrectAnswer && (
                                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                                  )}
                                </div>
                                
                                <span className={`flex-1 text-sm ${
                                  isCorrectAnswer ? 'font-medium text-success' : isUserAnswer && !isCorrectAnswer ?'font-medium text-error': 'text-foreground'
                                }`}>
                                  {decodeHtml(answer)}
                                </span>
                                
                                {isUserAnswer && (
                                  <span className="text-xs text-muted-foreground font-medium">
                                    Your Choice
                                  </span>
                                )}
                                
                                {isCorrectAnswer && (
                                  <span className="text-xs text-success font-medium">
                                    Correct Answer
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Question Category and Difficulty */}
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>Category: {question?.category}</span>
                            <span>•</span>
                            <span className="capitalize">Difficulty: {question?.difficulty}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailedAnswerReview;