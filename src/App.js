import React, { useState } from 'react';
import './App.css';

const imageUrls = [
  {url: 'https://shop.hololivepro.com/cdn/shop/files/hololivefriends_vol.20_top_GigiMurin_1024x1024.png?v=1750221364', type: 'Gigi'},
  {url: 'https://shop.hololivepro.com/cdn/shop/files/hololivefriends_vol.20_top_CeciliaImmergreen_1024x1024.png?v=1750221418', type:'Cece'},
];


// function getRandomImage() {
//   const index = Math.floor(Math.random() * imageUrls.length) ;
//   return imageUrls[index];
// }

function App() {
  // 50% chance (not guaranteed 18 per image type)
  const [images, setImages] = useState(
  Array(36).fill().map(() => Math.random() < 0.5 
    ? imageUrls.find(img => img.type === 'Gigi') 
    : imageUrls.find(img => img.type === 'Cece'))
);
  const [playerChoice, setPlayerChoice] = useState(null)
  const [revealed, setRevealed] = useState(Array(36).fill(false));
  const [currentPlayer, setCurrentPlayer] = useState(1); 
  const [scores, setScores] = useState({ 1: 0, 2: 0 });

const handleCellChoice = (index) => {
  if (revealed[index]) return; 

  if (playerChoice === null) {
    alert(`Player ${currentPlayer}, please choose Gigi or Cece first.`);
    return;
  }
  
  const selectedImage = images[index];
  const newRevealed = [...revealed];
  newRevealed[index] = true;
  setRevealed(newRevealed);

  // checks if chosen image is correct
  if (selectedImage.type === playerChoice) {
    alert(`Player ${currentPlayer}: Correct!`);
    setScores(prevScores => ({
      ...prevScores,
      [currentPlayer]: prevScores[currentPlayer] + 1
    }));
  } else {
    alert(`Player ${currentPlayer}: Wrong! It was a ${selectedImage.type}`);
  }


  setPlayerChoice(null);
  setCurrentPlayer(currentPlayer === 1 ? 2 : 1); 
};

  const handleChoice = (choice) => {
    setPlayerChoice(choice);
    }

  
  return (
    <div className="container">
      <h1> Cece Gigi Game!</h1>
      <div className='button-container'>
        <div className="scoreboard">
          <h3>Scores</h3>
          <p>Player 1: {scores[1]}</p>
          <p>Player 2: {scores[2]}</p>
        </div>
        <h2>Current Turn: Player {currentPlayer}</h2>
        <h3>Selected: {playerChoice ? playerChoice : 'None'}</h3>
        <button onClick={() => handleChoice('Gigi')}>Gigi</button>
        <button onClick={() => handleChoice('Cece')}>Cece</button>
      </div>
      <div></div>
      <div className="grid">
         {images.map((img, index) => (
          <div 
            key={index} 
            onClick={() => handleCellChoice(index)} 
            className={revealed[index] ? 'revealed-cell' : ''}>
            {revealed[index] ? (
              <img src={img.url} className="square" />
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

