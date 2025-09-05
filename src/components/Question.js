import React, { useEffect, useRef } from 'react';

const Question = ({ question, selectedAnswer, onAnswerSelect, isAnswered, showResult }) => {
  const answerRefs = useRef([]);

  const handleAnswerClick = (answer) => {
    if (!isAnswered) {
      onAnswerSelect(answer);
    }
  };

  const handleKeyDown = (event, answer, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleAnswerClick(answer);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (index + 1) % question.all_answers.length;
      answerRefs.current[nextIndex]?.focus();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const prevIndex = index === 0 ? question.all_answers.length - 1 : index - 1;
      answerRefs.current[prevIndex]?.focus();
    }
  };

  useEffect(() => {
    if (answerRefs.current[0] && !isAnswered) {
      answerRefs.current[0].focus();
    }
  }, [question, isAnswered]);

  const getAnswerClass = (answer) => {
    let baseClass = 'answer-option';
    
    if (isAnswered) {
      if (answer === question.correct_answer) {
        baseClass += ' correct';
      } else if (answer === selectedAnswer && answer !== question.correct_answer) {
        baseClass += ' incorrect';
      } else {
        baseClass += ' disabled';
      }
    } else if (selectedAnswer === answer) {
      baseClass += ' selected';
    }
    
    return baseClass;
  };

  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="question-container">
      <div className="question-category">
        {question.category}
      </div>
      <div className="question-difficulty">
        Difficulty: {question.difficulty}
      </div>
      
      <h2 className="question-text">
        {decodeHtml(question.question)}
      </h2>
      
      <div className="answers-container" role="radiogroup" aria-label="Answer options">
        {question.all_answers.map((answer, index) => (
          <button
            key={index}
            ref={el => answerRefs.current[index] = el}
            className={getAnswerClass(answer)}
            onClick={() => handleAnswerClick(answer)}
            onKeyDown={(e) => handleKeyDown(e, answer, index)}
            disabled={isAnswered}
            role="radio"
            aria-checked={selectedAnswer === answer}
            aria-label={`Answer option ${index + 1}: ${decodeHtml(answer)}`}
            tabIndex={selectedAnswer === answer ? 0 : -1}
          >
            <span className="answer-letter" aria-hidden="true">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="answer-text">
              {decodeHtml(answer)}
            </span>
            {isAnswered && answer === question.correct_answer && (
              <span className="correct-indicator" aria-label="Correct answer">✓</span>
            )}
            {isAnswered && answer === selectedAnswer && answer !== question.correct_answer && (
              <span className="incorrect-indicator" aria-label="Incorrect answer">✗</span>
            )}
          </button>
        ))}
      </div>
      
      {showResult && (
        <div className="answer-feedback">
          {selectedAnswer === question.correct_answer ? (
            <div className="feedback correct-feedback">
              <span className="feedback-icon">🎉</span>
              <span>Correct! Well done!</span>
            </div>
          ) : (
            <div className="feedback incorrect-feedback">
              <span className="feedback-icon">😔</span>
              <span>
                Incorrect. The correct answer was: <strong>{decodeHtml(question.correct_answer)}</strong>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
