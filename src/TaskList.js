import React from 'react';

function TaskList() {
  const tasks = ['Випить Revo', 'Пойняти думки репера мс Петі', 'Пес патрон таких як він нам батальон', 'Дивитися тік-ток Порошенка угарчік байкер'];

  return (
    <div>
      <h3>Мої завдання</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
