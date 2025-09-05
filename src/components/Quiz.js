import React, { useState, useEffect, useCallback } from 'react';
import Question from './Question';
import ProgressBar from './ProgressBar';
import Timer from './Timer';

const Quiz = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
    }
  };

  const handleAnswerSubmit = useCallback((answer = selectedAnswer) => {
    if (answer !== null) {
      setIsAnswered(true);
      setShowResult(true);
      
      const isCorrect = answer === currentQuestion.correct_answer;
      const newAnswer = {
        question: currentQuestion.question,
        selectedAnswer: answer,
        correctAnswer: currentQuestion.correct_answer,
        isCorrect: isCorrect,
        allAnswers: currentQuestion.all_answers
      };
      
      setAnswers(prevAnswers => [...prevAnswers, newAnswer]);
    }
  }, [selectedAnswer, currentQuestion]);
  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswerSubmit(null);
    }
  }, [timeLeft, isAnswered, handleAnswerSubmit]);
  useEffect(() => {
    setTimeLeft(30);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setShowResult(false);
  }, [currentQuestionIndex]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  if (!currentQuestion) {
    return <div className="loading">Loading question...</div>;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <ProgressBar progress={progress} />
        <div className="quiz-info">
          <span className="question-counter">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <Timer timeLeft={timeLeft} />
        </div>
      </div>

      <Question
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={handleAnswerSelect}
        isAnswered={isAnswered}
        showResult={showResult}
      />

      <div className="quiz-actions">
        {currentQuestionIndex > 0 && (
          <button 
            className="btn btn-secondary"
            onClick={handlePrevious}
            disabled={!isAnswered}
          >
            Previous
          </button>
        )}
        
        {!isAnswered ? (
          <button 
            className="btn btn-primary"
            onClick={() => handleAnswerSubmit()}
            disabled={selectedAnswer === null}
          >
            Submit Answer
          </button>
        ) : (
          <button 
            className="btn btn-primary"
            onClick={handleNext}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
