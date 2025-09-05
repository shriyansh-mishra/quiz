import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Results from './Results';

const ResultsPage = () => {
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedResults = localStorage.getItem('quizResults');
    
    if (savedResults) {
      setAnswers(JSON.parse(savedResults));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleRestart = () => {
    localStorage.removeItem('quizResults');
    navigate('/');
  };

  if (answers.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <p>Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-page">
      <Results 
        answers={answers} 
        onRestart={handleRestart}
      />
    </div>
  );
};

export default ResultsPage;

