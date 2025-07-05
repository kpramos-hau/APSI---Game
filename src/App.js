import React, { useState } from 'react';
import './App.css';

const imageUrls = [
  { url: 'https://shop.hololivepro.com/cdn/shop/files/hololivefriends_vol.20_top_GigiMurin_1024x1024.png?v=1750221364', type: 'Gigi' },
  { url: 'https://shop.hololivepro.com/cdn/shop/files/hololivefriends_vol.20_top_CeciliaImmergreen_1024x1024.png?v=1750221418', type: 'Cece' },
];

function App() {
  const randomizeImages = () => {
    return Array(36).fill().map(() => Math.random() < 0.5 
      ? imageUrls.find(img => img.type === 'Gigi') 
      : imageUrls.find(img => img.type === 'Cece'));
  };

  const [images, setImages] = useState(randomizeImages());

  //set player choice here
  const [playerChoice, setPlayerChoice] = useState(null);  
  const [revealed, setRevealed] = useState(Array(36).fill(false));  
  const [score, setScore] = useState(0);  


  //call randomize images, set false to hide board again
  const resetAndRandomizeBoard = () => {
    setRevealed(Array(36).fill(false));  
    setImages(randomizeImages());  
  };

  const handleCellChoice = (index) => {
    if (revealed[index]) return;  

    if (playerChoice === null) {
      alert('select GG MURIN or CC.');
      return;
    }

    const selectedImage = images[index];
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

   
    if (selectedImage.type === playerChoice) {
      setScore(prevScore => prevScore + 1);
      alert('Correct! Your score: ' + (score + 1));
    } else {
      alert(`Wrong! It was a ${selectedImage.type}.`);

      resetAndRandomizeBoard();
      setScore(score); 
      setPlayerChoice(null);
      
    }
    // setPlayerChoice(null);
  };

  //player choice
  const handleChoice = (choice) => {
    setPlayerChoice(choice);
  }

  return (
    <div className="container">
      <h1>Cece Gigi Game!</h1>
      <div className='button-container'>
        <div className="scoreboard">
          <h3>Score</h3>
          <p>Your Score: {score}</p>
        </div>
        <h3>Selected: {playerChoice}</h3>
        <button onClick={() => handleChoice('Gigi')}>Gigi</button>
        <button onClick={() => handleChoice('Cece')}>Cece</button>
      </div>

      <div className="grid">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => handleCellChoice(index)}
            className={revealed[index] ? 'revealed-cell' : ''}
          >
            {revealed[index] ? (
              <img src={img.url} className="square" alt={`image-${index}`} />
            ) : (
              <div className="square hidden-cell">{index + 1}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
