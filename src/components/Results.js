import React from 'react';

const Results = ({ answers, onRestart }) => {
  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  const totalQuestions = answers.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding! 🌟";
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 70) return "Good job! 👍";
    if (percentage >= 60) return "Not bad! 😊";
    return "Keep practicing! 💪";
  };

  const getScoreClass = () => {
    if (percentage >= 80) return "score-excellent";
    if (percentage >= 60) return "score-good";
    return "score-needs-improvement";
  };

  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Quiz Complete! 🎯</h1>
        <div className={`score-display ${getScoreClass()}`}>
          <div className="score-main">
            <span className="score-number">{correctAnswers}</span>
            <span className="score-separator">/</span>
            <span className="score-total">{totalQuestions}</span>
          </div>
          <div className="score-percentage">
            {percentage}%
          </div>
          <div className="score-message">
            {getScoreMessage()}
          </div>
        </div>
      </div>

      <div className="results-summary">
        <h2>Answer Summary</h2>
        <div className="answers-list">
          {answers.map((answer, index) => (
            <div 
              key={index} 
              className={`answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
            >
              <div className="answer-header">
                <span className="question-number">Question {index + 1}</span>
                <span className="answer-status">
                  {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </span>
              </div>
              
              <div className="question-text">
                {decodeHtml(answer.question)}
              </div>
              
              <div className="answer-details">
                <div className="answer-row">
                  <span className="answer-label">Your answer:</span>
                  <span className="answer-value user-answer">
                    {decodeHtml(answer.selectedAnswer)}
                  </span>
                </div>
                
                {!answer.isCorrect && (
                  <div className="answer-row">
                    <span className="answer-label">Correct answer:</span>
                    <span className="answer-value correct-answer">
                      {decodeHtml(answer.correctAnswer)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="results-actions">
        <button 
          className="btn btn-primary btn-large"
          onClick={onRestart}
        >
          Take Quiz Again
        </button>
      </div>
    </div>
  );
};

export default Results;

