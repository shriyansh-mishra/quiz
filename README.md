# 🧠 Quiz Master - Interactive Quiz App

A modern, responsive React quiz application that tests your knowledge with questions from the Open Trivia Database API.

## ✨ Features

### Core Features
- **Interactive Quiz Interface**: Clean, user-friendly design with one question at a time
- **Multiple Choice Questions**: 4 answer options per question with visual feedback
- **Real-time Scoring**: Track correct/incorrect answers throughout the quiz
- **Progress Tracking**: Visual progress bar and question counter
- **Detailed Results**: Comprehensive results page showing all answers and explanations
- **Quiz Restart**: Easy option to take the quiz again

### Advanced Features
- **Timer per Question**: 30-second countdown with visual warnings
- **Difficulty Levels**: Easy, Medium, and Hard question difficulties
- **Category Selection**: Choose from 25+ different question categories
- **API Integration**: Real questions from Open Trivia Database with fallback support
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **Error Handling**: Graceful handling of API failures with fallback questions

### Technical Features
- **React Router**: Clean navigation between pages
- **Modern CSS**: Beautiful gradients, animations, and responsive design
- **State Management**: Efficient state handling with React hooks
- **Local Storage**: Persistent quiz settings and results
- **Loading States**: Smooth loading animations and error handling

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone "https://github.com/shriyansh-mishra/quiz.git"
cd quiz-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## 🎮 How to Use

1. **Home Page**: Choose your preferred difficulty level and category
2. **Start Quiz**: Click "Start Quiz" to begin
3. **Answer Questions**: Select your answer and click "Submit Answer"
4. **Navigate**: Use "Next Question" to proceed or "Previous" to go back
5. **View Results**: See your final score and detailed answer breakdown
6. **Restart**: Click "Take Quiz Again" to start over

## 🎯 Quiz Features

### Question Types
- Multiple choice questions with 4 options
- Questions from various categories including:
  - General Knowledge
  - Science & Nature
  - History
  - Geography
  - Entertainment
  - Sports
  - And many more!

### Scoring System
- Real-time score tracking
- Percentage calculation
- Performance feedback with encouraging messages
- Detailed answer review

### Timer System
- 30 seconds per question
- Visual countdown with color-coded warnings
- Automatic answer submission when time runs out
- Pause during answer review

## 🛠️ Technical Details

### Built With
- **React 18**: Modern React with functional components and hooks
- **React Router**: Client-side routing
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **Open Trivia Database API**: Real-time question fetching

### Project Structure
```
src/
├── components/
│   ├── Home.js              # Landing page with quiz settings
│   ├── QuizPage.js          # Main quiz page with API integration
│   ├── Quiz.js              # Quiz logic and state management
│   ├── Question.js          # Individual question component
│   ├── Results.js           # Results display component
│   ├── ResultsPage.js       # Results page wrapper
│   ├── ProgressBar.js       # Progress indicator
│   ├── Timer.js             # Countdown timer
│   ├── LoadingSpinner.js    # Loading animation
│   └── Components.css       # Component-specific styles
├── App.js                   # Main app with routing
├── App.css                  # Global styles
└── index.js                 # App entry point
```

### Key Components

#### Quiz Component
- Manages quiz state and flow
- Handles answer submission and navigation
- Integrates timer and progress tracking

#### Question Component
- Displays individual questions
- Handles answer selection with keyboard navigation
- Shows immediate feedback for correct/incorrect answers

#### Results Component
- Displays comprehensive quiz results
- Shows score breakdown and answer details
- Provides restart functionality

## 🎨 Design Features

### Visual Design
- **Modern Gradient Background**: Beautiful purple-blue gradient
- **Card-based Layout**: Clean, organized content presentation
- **Smooth Animations**: Hover effects and transitions
- **Color-coded Feedback**: Green for correct, red for incorrect
- **Responsive Typography**: Scalable text for all devices

### User Experience
- **Intuitive Navigation**: Clear buttons and progress indicators
- **Immediate Feedback**: Instant visual response to user actions
- **Error Prevention**: Disabled states and validation
- **Accessibility**: Full keyboard navigation and screen reader support

## 🔧 Customization

### Adding New Categories
Edit the `categories` array in `Home.js` to add new question categories.

### Modifying Timer Duration
Change the timer duration in `Quiz.js` by updating the `timeLeft` initial state.

### Styling Changes
- Global styles: `src/App.css`
- Component styles: `src/components/Components.css`

## 🐛 Error Handling

The app includes comprehensive error handling:
- **API Failures**: Falls back to local questions if API is unavailable
- **Network Issues**: Graceful handling of connection problems
- **Invalid Data**: Validation and sanitization of API responses
- **User Errors**: Prevention of invalid actions and clear error messages

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing the quiz questions API
- React team for the amazing framework
- The open-source community for inspiration and tools

---

**Happy Quizzing! 🎉**