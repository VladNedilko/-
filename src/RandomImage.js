import React from 'react';

function RandomImage() {
  const imageUrl = 'https://picsum.photos/200';

  return (
    <div>
      <h3>Випадкова картинка</h3>
      <img src={imageUrl} alt="Random" style={{ borderRadius: '8px' }} />
    </div>
  );
}

export default RandomImage;
