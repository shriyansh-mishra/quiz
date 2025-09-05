import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('any');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { value: 'any', label: 'Any Category' },
    { value: '9', label: 'General Knowledge' },
    { value: '10', label: 'Entertainment: Books' },
    { value: '11', label: 'Entertainment: Film' },
    { value: '12', label: 'Entertainment: Music' },
    { value: '13', label: 'Entertainment: Musicals & Theatres' },
    { value: '14', label: 'Entertainment: Television' },
    { value: '15', label: 'Entertainment: Video Games' },
    { value: '16', label: 'Entertainment: Board Games' },
    { value: '17', label: 'Science & Nature' },
    { value: '18', label: 'Science: Computers' },
    { value: '19', label: 'Science: Mathematics' },
    { value: '20', label: 'Mythology' },
    { value: '21', label: 'Sports' },
    { value: '22', label: 'Geography' },
    { value: '23', label: 'History' },
    { value: '24', label: 'Politics' },
    { value: '25', label: 'Art' },
    { value: '26', label: 'Celebrities' },
    { value: '27', label: 'Animals' },
    { value: '28', label: 'Vehicles' },
    { value: '29', label: 'Entertainment: Comics' },
    { value: '30', label: 'Science: Gadgets' },
    { value: '31', label: 'Entertainment: Japanese Anime & Manga' },
    { value: '32', label: 'Entertainment: Cartoon & Animations' }
  ];

  const handleStartQuiz = async () => {
    setIsLoading(true);
    localStorage.setItem('quizSettings', JSON.stringify({
      difficulty,
      category
    }));
    navigate('/quiz');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <h1 className="home-title">🧠 Quiz Master</h1>
          <p className="home-subtitle">
            Test your knowledge with our interactive quiz app!
          </p>
        </div>

        <div className="quiz-settings">
          <h2>Quiz Settings</h2>
          
          <div className="setting-group">
            <label htmlFor="difficulty">Difficulty Level:</label>
            <div className="select-wrapper">
              <select 
                id="difficulty"
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)}
                className="setting-select"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="setting-group">
            <label htmlFor="category">Category:</label>
            <div className="select-wrapper">
              <select 
                id="category"
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="setting-select"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="quiz-info">
          <div className="info-card">
            <h3>📊 Quiz Features</h3>
            <ul>
              <li>10 multiple choice questions</li>
              <li>30 seconds per question</li>
              <li>Real-time scoring</li>
              <li>Detailed results</li>
              <li>Progress tracking</li>
              <li>Fallback questions if API is busy</li>
            </ul>
          </div>
        </div>

        <div className="home-actions">
          <button 
            className="btn btn-primary btn-large"
            onClick={handleStartQuiz}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Start Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
