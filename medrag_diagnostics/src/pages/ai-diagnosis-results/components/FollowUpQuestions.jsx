import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FollowUpQuestions = ({ questions, onAnswerQuestion, onRefineAnalysis }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    onAnswerQuestion(questionId, answer);
  };

  const getQuestionIcon = (category) => {
    switch (category) {
      case 'symptom':
        return 'Stethoscope';
      case 'history':
        return 'Clock';
      case 'examination':
        return 'Search';
      case 'lifestyle':
        return 'Heart';
      default:
        return 'HelpCircle';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'symptom':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'history':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'examination':
        return 'text-success bg-success/10 border-success/20';
      case 'lifestyle':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getAnsweredCount = () => {
    return Object.keys(selectedAnswers)?.length;
  };

  return (
    <div className="diagnostic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Follow-up Questions</h3>
            <p className="text-sm text-muted-foreground">
              Answer these questions to refine diagnostic accuracy
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {getAnsweredCount()}/{questions?.length} answered
          </span>
          <Button
            variant="default"
            size="sm"
            onClick={onRefineAnalysis}
            disabled={getAnsweredCount() === 0}
          >
            <Icon name="RefreshCw" size={14} className="mr-2" />
            Refine Analysis
          </Button>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(getAnsweredCount() / questions?.length) * 100}%` }}
          />
        </div>
      </div>
      <div className="space-y-4">
        {questions?.map((question, index) => {
          const isExpanded = expandedQuestion === question?.id;
          const isAnswered = selectedAnswers?.[question?.id];

          return (
            <div key={question?.id} className="border border-border rounded-lg overflow-hidden">
              <div 
                className={`p-4 cursor-pointer transition-colors duration-200 ${
                  isAnswered ? 'bg-success/5' : 'hover:bg-muted/50'
                }`}
                onClick={() => setExpandedQuestion(isExpanded ? null : question?.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-lg border ${getCategoryColor(question?.category)}`}>
                      <Icon name={getQuestionIcon(question?.category)} size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {question?.category}
                        </span>
                        {question?.priority === 'high' && (
                          <span className="px-2 py-0.5 bg-error/10 text-error text-xs rounded-full">
                            High Priority
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        {question?.question}
                      </p>
                      {question?.context && (
                        <p className="text-xs text-muted-foreground">
                          {question?.context}
                        </p>
                      )}
                      {isAnswered && (
                        <div className="flex items-center space-x-2 mt-2">
                          <Icon name="Check" size={14} className="text-success" />
                          <span className="text-sm text-success font-medium">
                            Answered: {selectedAnswers?.[question?.id]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isAnswered && (
                      <Icon name="CheckCircle" size={16} className="text-success" />
                    )}
                    <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
              {isExpanded && (
                <div className="border-t border-border p-4 bg-muted/20">
                  <div className="space-y-3">
                    {question?.options?.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleAnswerSelect(question?.id, option)}
                        className={`w-full text-left p-3 rounded-md border transition-all duration-200 ${
                          selectedAnswers?.[question?.id] === option
                            ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-primary/5'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswers?.[question?.id] === option
                              ? 'border-primary bg-primary' :'border-muted-foreground'
                          }`}>
                            {selectedAnswers?.[question?.id] === option && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span className="text-sm">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {question?.explanation && (
                    <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-md">
                      <div className="flex items-start space-x-2">
                        <Icon name="Info" size={14} className="text-accent mt-0.5" />
                        <p className="text-xs text-accent-foreground">
                          {question?.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {getAnsweredCount() > 0 && (
        <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Lightbulb" size={16} className="text-success" />
            <p className="text-sm text-success-foreground">
              Great! You've answered {getAnsweredCount()} question{getAnsweredCount() > 1 ? 's' : ''}. 
              Click "Refine Analysis" to update the diagnostic suggestions based on your responses.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowUpQuestions;