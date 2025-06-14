import React, { useState, useEffect } from 'react';
import { Plus, X, Check, Filter, SortAsc } from 'lucide-react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [inputError, setInputError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('todoTasks');
      if (savedTasks && savedTasks !== 'undefined' && savedTasks !== 'null') {
        const parsedTasks = JSON.parse(savedTasks);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
          console.log('Loaded tasks from localStorage:', parsedTasks);
        }
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem('todoTasks');
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
        console.log('Saved tasks to localStorage:', tasks);
      } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
      }
    }
  }, [tasks, isLoaded]);

  const validateInput = (value) => {
    if (!value.trim()) {
      return 'Task cannot be empty';
    }
    if (value.trim().length > 100) {
      return 'Task must be less than 100 characters';
    }
    if (tasks.some(task => task.text.toLowerCase() === value.trim().toLowerCase())) {
      return 'Task already exists';
    }
    return '';
  };

  const addTask = (e) => {
    e.preventDefault();
    const error = validateInput(inputValue);
    
    if (error) {
      setInputError(error);
      return;
    }

    const newTask = {
      id: Date.now() + Math.random(), // More unique ID
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setInputValue('');
    setInputError('');
  };

  const removeTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearAllTasks = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setTasks([]);
      localStorage.removeItem('todoTasks');
    }
  };

  const getFilteredTasks = () => {
    let filtered = tasks;
    
    switch (filter) {
      case 'active':
        filtered = tasks.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = tasks.filter(task => task.completed);
        break;
      default:
        filtered = tasks;
    }

    switch (sortBy) {
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'alphabetical':
        return filtered.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));
      default:
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    return { total, completed, active };
  };

  const filteredTasks = getFilteredTasks();
  const stats = getStats();

  const styles = {
    container: {
      maxWidth: '768px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      marginBottom: '24px'
    },
    title: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px'
    },
    stats: {
      fontSize: '14px',
      color: '#6b7280'
    },
    inputContainer: {
      marginBottom: '24px'
    },
    inputWrapper: {
      display: 'flex',
      gap: '8px'
    },
    input: {
      flex: 1,
      padding: '8px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    addButton: {
      padding: '8px 16px',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    error: {
      marginTop: '8px',
      fontSize: '14px',
      color: '#dc2626'
    },
    controls: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      marginBottom: '24px',
      padding: '16px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      alignItems: 'center'
    },
    controlGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    controlLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151'
    },
    select: {
      padding: '4px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      fontSize: '14px',
      outline: 'none'
    },
    clearAllButton: {
      padding: '6px 12px',
      fontSize: '12px',
      color: '#dc2626',
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginLeft: 'auto'
    },
    taskList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '32px',
      color: '#6b7280'
    },
    taskItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      transition: 'all 0.2s'
    },
    taskItemCompleted: {
      backgroundColor: '#f0fdf4',
      borderColor: '#bbf7d0'
    },
    taskItemActive: {
      backgroundColor: '#f9fafb',
      borderColor: '#e5e7eb'
    },
    checkButton: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      border: '2px solid #d1d5db',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s'
    },
    checkButtonCompleted: {
      backgroundColor: '#22c55e',
      borderColor: '#22c55e',
      color: 'white'
    },
    taskText: {
      flex: 1,
      color: '#1f2937'
    },
    taskTextCompleted: {
      color: '#6b7280',
      textDecoration: 'line-through'
    },
    deleteButton: {
      padding: '4px',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#9ca3af',
      cursor: 'pointer',
      borderRadius: '4px',
      transition: 'color 0.2s'
    },
    clearButton: {
      marginTop: '24px',
      textAlign: 'center'
    },
    clearButtonInner: {
      padding: '8px 16px',
      fontSize: '14px',
      color: '#dc2626',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    debugInfo: {
      marginTop: '20px',
      padding: '10px',
      backgroundColor: '#f3f4f6',
      borderRadius: '4px',
      fontSize: '12px',
      color: '#6b7280'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>To-Do List</h1>
        <div style={styles.stats}>
          {stats.total} total • {stats.active} active • {stats.completed} completed
          {!isLoaded && ' • Loading...'}
        </div>
      </div>

      <div style={styles.inputContainer}>
        <div style={styles.inputWrapper}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (inputError) setInputError('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTask(e);
              }
            }}
            placeholder="Add a new task..."
            style={styles.input}
            maxLength={100}
          />
          <button
            onClick={addTask}
            style={styles.addButton}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            <Plus size={20} />
          </button>
        </div>
        {inputError && (
          <p style={styles.error}>{inputError}</p>
        )}
      </div>

      <div style={styles.controls}>
        <div style={styles.controlGroup}>
          <Filter size={16} style={{color: '#6b7280'}} />
          <span style={styles.controlLabel}>Filter:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={styles.select}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div style={styles.controlGroup}>
          <SortAsc size={16} style={{color: '#6b7280'}} />
          <span style={styles.controlLabel}>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.select}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>

        {tasks.length > 0 && (
          <button
            onClick={clearAllTasks}
            style={styles.clearAllButton}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#fee2e2';
              e.target.style.borderColor = '#fca5a5';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#fef2f2';
              e.target.style.borderColor = '#fecaca';
            }}
          >
            Clear All
          </button>
        )}
      </div>

      <div style={styles.taskList}>
        {filteredTasks.length === 0 ? (
          <div style={styles.emptyState}>
            {tasks.length === 0 ? 'No tasks yet. Add one above!' : 'No tasks match your filter.'}
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              style={task.completed ? {...styles.taskItem, ...styles.taskItemCompleted} : {...styles.taskItem, ...styles.taskItemActive}}
            >
              <button
                onClick={() => toggleTask(task.id)}
                style={task.completed ? {...styles.checkButton, ...styles.checkButtonCompleted} : styles.checkButton}
              >
                {task.completed && <Check size={14} />}
              </button>
              
              <span
                style={task.completed ? {...styles.taskText, ...styles.taskTextCompleted} : styles.taskText}
              >
                {task.text}
              </span>
              
              <button
                onClick={() => removeTask(task.id)}
                style={styles.deleteButton}
                onMouseOver={(e) => e.target.style.color = '#dc2626'}
                onMouseOut={(e) => e.target.style.color = '#9ca3af'}
              >
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {stats.completed > 0 && (
        <div style={styles.clearButton}>
          <button
            onClick={() => setTasks(tasks.filter(task => !task.completed))}
            style={styles.clearButtonInner}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#fef2f2';
              e.target.style.color = '#b91c1c';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#dc2626';
            }}
          >
            Clear {stats.completed} completed task{stats.completed !== 1 ? 's' : ''}
          </button>
        </div>
      )}
      
    </div>
  );
};

export default TodoApp;