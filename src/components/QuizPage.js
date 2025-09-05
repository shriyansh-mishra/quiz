import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Quiz from './Quiz';
import LoadingSpinner from './LoadingSpinner';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [usingFallback, setUsingFallback] = useState(false);
  const navigate = useNavigate();

  const loadQuestions = useCallback(async (currentRetryCount = 0) => {
    try {
      setLoading(true);
      setError(null);

      // Get quiz settings from localStorage
      const settings = JSON.parse(localStorage.getItem('quizSettings') || '{}');
      const { difficulty = 'medium', category = 'any' } = settings;

      // Build API URL
      let apiUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';
      
      if (difficulty !== 'any') {
        apiUrl += `&difficulty=${difficulty}`;
      }
      
      if (category !== 'any') {
        apiUrl += `&category=${category}`;
      }

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        if (response.status === 429) {
          if (currentRetryCount < 2) {
            // Wait and retry for rate limiting
            await new Promise(resolve => setTimeout(resolve, 2000 * (currentRetryCount + 1)));
            setRetryCount(currentRetryCount + 1);
            return loadQuestions(currentRetryCount + 1);
          }
          throw new Error('API rate limit exceeded. Please try again in a moment.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.response_code !== 0) {
        throw new Error('Failed to fetch questions from API');
      }

      // Process questions to include all answers in a single array
      const processedQuestions = data.results.map(question => ({
        ...question,
        all_answers: [...question.incorrect_answers, question.correct_answer]
          .sort(() => Math.random() - 0.5) 
      }));

      setQuestions(processedQuestions);
      setRetryCount(0);
    } catch (err) {
      console.error('Error loading questions:', err);
      
      // For rate limiting, try fallback questions automatically
      if (err.message.includes('rate limit')) {
        setUsingFallback(true);
        loadFallbackQuestions();
        
        // Auto-dismiss notification after 5 seconds
        setTimeout(() => {
          setUsingFallback(false);
        }, 5000);
      } else {
        setError(err.message);
        loadFallbackQuestions();
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const loadFallbackQuestions = () => {
    const fallbackQuestions = [
      {
        category: "General Knowledge",
        type: "multiple",
        difficulty: "easy",
        question: "What is the capital of France?",
        correct_answer: "Paris",
        incorrect_answers: ["London", "Berlin", "Madrid"],
        all_answers: ["Paris", "London", "Berlin", "Madrid"]
      },
      {
        category: "Science",
        type: "multiple",
        difficulty: "medium",
        question: "What is the chemical symbol for gold?",
        correct_answer: "Au",
        incorrect_answers: ["Go", "Gd", "Ag"],
        all_answers: ["Au", "Go", "Gd", "Ag"]
      },
      {
        category: "History",
        type: "multiple",
        difficulty: "hard",
        question: "In which year did World War II end?",
        correct_answer: "1945",
        incorrect_answers: ["1944", "1946", "1943"],
        all_answers: ["1945", "1944", "1946", "1943"]
      },
      {
        category: "Geography",
        type: "multiple",
        difficulty: "medium",
        question: "Which is the largest ocean on Earth?",
        correct_answer: "Pacific Ocean",
        incorrect_answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
        all_answers: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"]
      },
      {
        category: "Sports",
        type: "multiple",
        difficulty: "easy",
        question: "How many players are on a basketball team?",
        correct_answer: "5",
        incorrect_answers: ["6", "7", "4"],
        all_answers: ["5", "6", "7", "4"]
      },
      {
        category: "Entertainment",
        type: "multiple",
        difficulty: "medium",
        question: "Which programming language was created by Brendan Eich?",
        correct_answer: "JavaScript",
        incorrect_answers: ["Python", "Java", "C++"],
        all_answers: ["JavaScript", "Python", "Java", "C++"]
      },
      {
        category: "Science",
        type: "multiple",
        difficulty: "hard",
        question: "What is the speed of light in a vacuum?",
        correct_answer: "299,792,458 meters per second",
        incorrect_answers: ["300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"],
        all_answers: ["299,792,458 meters per second", "300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"]
      },
      {
        category: "Geography",
        type: "multiple",
        difficulty: "easy",
        question: "Which continent is the largest by land area?",
        correct_answer: "Asia",
        incorrect_answers: ["Africa", "North America", "Europe"],
        all_answers: ["Asia", "Africa", "North America", "Europe"]
      },
      {
        category: "General Knowledge",
        type: "multiple",
        difficulty: "medium",
        question: "What does 'HTTP' stand for?",
        correct_answer: "HyperText Transfer Protocol",
        incorrect_answers: ["HyperText Transport Protocol", "HyperText Transmission Protocol", "HyperText Transfer Process"],
        all_answers: ["HyperText Transfer Protocol", "HyperText Transport Protocol", "HyperText Transmission Protocol", "HyperText Transfer Process"]
      },
      {
        category: "Science",
        type: "multiple",
        difficulty: "easy",
        question: "What is the hardest natural substance on Earth?",
        correct_answer: "Diamond",
        incorrect_answers: ["Gold", "Iron", "Quartz"],
        all_answers: ["Diamond", "Gold", "Iron", "Quartz"]
      }
    ];

    // Shuffle the fallback questions and take 10
    const shuffledQuestions = fallbackQuestions.sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions.slice(0, 10));
  };

  const handleQuizComplete = (answers) => {
    // Store results in localStorage
    localStorage.setItem('quizResults', JSON.stringify(answers));
    navigate('/results');
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setRetryCount(0);
    loadQuestions();
  };

  if (loading) {
    const loadingMessage = retryCount > 0 
      ? `Retrying API call... (attempt ${retryCount + 1})`
      : "Loading quiz questions...";
    return <LoadingSpinner message={loadingMessage} />;
  }

  if (error && !usingFallback) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>⚠️ Error Loading Quiz</h2>
          <p>{error}</p>
          <p>Using fallback questions instead.</p>
          <div className="error-actions">
            <button className="btn btn-primary" onClick={handleRetry}>
              Try API Again
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (questions.length === 0) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>No Questions Available</h2>
          <p>Unable to load quiz questions. Please try again.</p>
          <button className="btn btn-primary" onClick={handleRetry}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      {usingFallback && (
        <div className="fallback-notification">
          <div className="fallback-content">
            <span className="fallback-icon">🔄</span>
            <span className="fallback-text">
              Using curated questions (API temporarily busy)
            </span>
            <button 
              className="fallback-retry-btn"
              onClick={handleRetry}
              title="Try to load fresh questions from API"
            >
              🔄
            </button>
          </div>
        </div>
      )}
      <Quiz 
        questions={questions} 
        onComplete={handleQuizComplete}
      />
    </div>
  );
};

export default QuizPage;
