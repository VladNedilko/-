import React from 'react';
import '../styles/About.css';  
function About() {
  return (
    <div className="about-container">
      <h1>МС Петя</h1>
      <p className="about-description">
      Всіх людей є талант над своїм розумом потрібно удосконалювати свої знання критика це зброя у мозок творити нове 
      </p>
      <p>Автор✍️ репер мсПетя</p>
      <div className="meme-section">
      <h2>Автор✍️ репер мсПетя</h2>
      <iframe width="560" 
      height="517" 
       src="https://www.youtube.com/embed/OgrOlh7yFMI?autoplay=1"
      title="МС ПЕТЯ – Я ЖИВИЙ, Я СИЛЬНИЙ філософія, психологія" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerpolicy="strict-origin-when-cross-origin" 
      allowfullscreen>
      </iframe>
      </div>

      <div className="highlight">
        <p>МС Петя завжди казав, що він "найкрутіший на районі", і хто може з цим сперечатись? Якщо ти ще не чув його легендарні рядки, то ти, друже, щось пропустив.</p>
      </div>

      <div className="meme-finale">
        <h2>І головне:</h2>
        <p class="written" >"життя — цікаве, і мотивація то є сильна: філософія, психологія. саме головне — залишайтеся людьми і кричіть, що ви живі"</p> 
        <p  >"Я ЖИВИИИИИЙ! Я СИЛЬНИЙ!"</p>
      </div>
    </div>
  );

}

export default About;
