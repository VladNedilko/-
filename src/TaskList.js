import React, { useState, useEffect } from 'react';

function TaskList({ onTaskSelectionChange }) {
  const tasks = ['Випить Revo', 'Пойняти думки репера мс Петі', 'Пес патрон таких як він нам батальон', 'Дивитися тік-ток Порошенка угарчік байкер'];
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    if (onTaskSelectionChange) {
      onTaskSelectionChange(selectedTasks.length);
    }
  }, [selectedTasks, onTaskSelectionChange]);

  const handleCheckboxChange = (task) => {
    if (selectedTasks.includes(task)) {
      setSelectedTasks(selectedTasks.filter(t => t !== task));
    } else {
      setSelectedTasks([...selectedTasks, task]);
    }
  };

  return (
    <div style={taskListStyle}>
      <h3>Мої завдання</h3>
      <ul style={ulStyle}>
        {tasks.map((task, index) => (
          <li key={index} style={liStyle}>
            <label>
              <input 
                type="checkbox" 
                checked={selectedTasks.includes(task)}
                onChange={() => handleCheckboxChange(task)}
              />
              {task}
            </label>
          </li>
        ))}
      </ul>
      <div style={selectedTasksStyle}>
        <h4>Обрані завдання:</h4>
        {selectedTasks.length === 0 ? <p>Немає обраних завдань</p> : (
          <ul>
            {selectedTasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const taskListStyle = {
  textAlign: 'center', 
  margin: '20px auto', 
  maxWidth: '400px',
  padding: '10px', 
  backgroundColor: '#f9f9f9', 
  borderRadius: '10px', 
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};

const ulStyle = {
  listStyle: 'none', 
  padding: 0,
};

const liStyle = {
  margin: '10px 0',
};

const selectedTasksStyle = {
  marginTop: '20px',
  padding: '10px',
  backgroundColor: '#e0f7fa',
  borderRadius: '8px',
};

export default TaskList;
