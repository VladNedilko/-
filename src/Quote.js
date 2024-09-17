import React from 'react';

function Quote() {
  const quoteLine1 = 'Життя — цікаве, і мотивація то є сильна: філософія, психологія.Саме головне — залишайтеся людьми і кричіть, що ви живі.';
  const quoteLine2 = 'Я ЖИВИИИИИЙ! Я СИЛЬНИЙ!.';
  const author = 'автор ідеї МС Петя';

  return (
    <div style={{ fontStyle: 'italic', margin: '20px 0' }}>
      <p>“{quoteLine1}</p>
      <p>{quoteLine2}”</p>
      <p>- {author}</p>
    </div>
  );
}

export default Quote;
