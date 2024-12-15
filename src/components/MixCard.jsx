import React from 'react';
import './MixCard.css';

const MixCard = ({ title, description }) => {
  return (
    <div className="mix-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default MixCard;
