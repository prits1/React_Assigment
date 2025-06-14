# React To-Do List App

A modern, feature-rich to-do list application built with React that helps you manage your tasks efficiently with persistent storage.

![To-Do App Preview](https://via.placeholder.com/800x400/3b82f6/ffffff?text=React+To-Do+List+App)

## ✨ Features

### Core Functionality
- ✅ **Add Tasks** - Create new tasks with input validation
- ✅ **Mark Complete** - Toggle task completion status
- ✅ **Delete Tasks** - Remove individual tasks
- ✅ **Persistent Storage** - Tasks saved automatically using localStorage

### Advanced Features
-  **Smart Filtering** - View all, active, or completed tasks
-  **Multiple Sorting** - Sort by newest, oldest, or alphabetical
-  **Task Statistics** - Real-time count of total, active, and completed tasks
-  **Bulk Actions** - Clear completed tasks or all tasks at once
-  **Input Validation** - Prevents empty, duplicate, or overly long tasks

### User Experience
-  **Clean UI** - Modern, responsive design
-  **Fast Performance** - Optimized React components
-  **Real-time Updates** - Instant feedback on all actions
-  **Mobile Friendly** - Works on all screen sizes

## 🚀 Quick Start

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/react-todo-app.git
   cd react-todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install required packages**
   ```bash
   npm install lucide-react
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```


## 🔧 Technical Details

### Technologies Used
- **React 18** - Frontend framework
- **Lucide React** - Icon library
- **localStorage** - Browser storage for persistence
- **CSS-in-JS** - Inline styles for component styling

### Key Components
- **TodoApp** - Main component containing all functionality
- **State Management** - React hooks (useState, useEffect)
- **Local Storage Integration** - Automatic save/load functionality

## 🧪 Testing

### Manual Testing Checklist

#### Input Validation
- [ ] Empty task rejection
- [ ] Duplicate task prevention
- [ ] Character limit enforcement (100 chars)
- [ ] Error message display/clearing

#### Task Operations
- [ ] Add new tasks
- [ ] Toggle completion status
- [ ] Delete individual tasks
- [ ] Clear completed tasks
- [ ] Clear all tasks

#### Filtering & Sorting
- [ ] Filter: All tasks
- [ ] Filter: Active tasks only
- [ ] Filter: Completed tasks only
- [ ] Sort: Newest first
- [ ] Sort: Oldest first
- [ ] Sort: Alphabetical order

#### Persistence
- [ ] Tasks saved on page refresh
- [ ] Tasks saved on browser restart
- [ ] Corrupted data handling
- [ ] Multiple browser tabs sync

### Automated Testing Setup

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

Example test cases:
```javascript
// src/App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from './App';

test('adds a new task', () => {
  render(<TodoApp />);
  const input = screen.getByPlaceholderText('Add a new task...');
  const addButton = screen.getByRole('button');
  
  fireEvent.change(input, { target: { value: 'Test task' } });
  fireEvent.click(addButton);
  
  expect(screen.getByText('Test task')).toBeInTheDocument();
});

test('validates empty input', () => {
  render(<TodoApp />);
  const addButton = screen.getByRole('button');
  
  fireEvent.click(addButton);
  
  expect(screen.getByText('Task cannot be empty')).toBeInTheDocument();
});
```

### Coding Standards
- Use functional components with hooks
- Follow React best practices
- Add comments for complex logic
- Maintain consistent styling
- Test your changes thoroughly

**Made with ❤️ using React**