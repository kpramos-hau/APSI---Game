import React, { useState } from 'react';
import './App.css';

const imageUrls = [
  {url: 'https://shop.hololivepro.com/cdn/shop/files/hololivefriends_vol.20_top_GigiMurin_1024x1024.png?v=1750221364', type: 'Gigi'},
  {url: 'https://shop.hololivepro.com/cdn/shop/files/hololivefriends_vol.20_top_CeciliaImmergreen_1024x1024.png?v=1750221418', type:'Cece'},
  {url: 'https://shop.hololivepro.com/cdn/shop/files/hololivefriends_vol.20_top_GigiMurin_1024x1024.png?v=1750221364', type: 'Gigi'},
  {url: 'https://shop.hololivepro.com/cdn/shop/files/hololivefriends_vol.20_top_CeciliaImmergreen_1024x1024.png?v=1750221418', type:'Cece'},
  {url: 'https://shop.hololivepro.com/cdn/shop/files/hololivefriends_vol.20_top_GigiMurin_1024x1024.png?v=1750221364', type: 'Gigi'},
  {url: 'https://shop.hololivepro.com/cdn/shop/files/hololivefriends_vol.20_top_CeciliaImmergreen_1024x1024.png?v=1750221418', type:'Cece'}
];


function getRandomImage() {
  const index = Math.floor(Math.random() * imageUrls.length) ;
  return imageUrls[index];
}

function App() {
  const [images, setImages] = useState(Array(36).fill().map(() => getRandomImage()));
  const [playerChoice, setPlayerChoice] = useState(null)
  const [revealed, setRevealed] = useState(Array(36).fill(false));
  const [currentPlayer, setCurrentPlayer] = useState(1); 

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
  } else {
    alert(`Player ${currentPlayer}: Wrong! It was a ${selectedImage.type}`);
  }

  setPlayerChoice(null);
  setCurrentPlayer(currentPlayer === 1 ? 2 : 1); 
};

  const handleChoice = (choice) => {
    setPlayerChoice(choice);
    }

  
  // const handleClick = () => {
  //   setImages(Array(36).fill().map(() => getRandomImage()));
  //   setRevealed(Array(36).fill(false));
  //   setPlayerChoice(null);
  // }

  return (
    <div className="container">
      <h1> Cece Gigi Game!</h1>
      <div className='button-container'>
        <h2>Current Turn: Player {currentPlayer}</h2>
        {/* <h3>Scores - Player 1: {scores[1]} | Player 2: {scores[2]}</h3> */}
        <button onClick={() => handleChoice('Gigi')}>Gigi</button>
        <button onClick={() => handleChoice('Cece')}>Cece</button>
      </div>
      <div></div>
      <div className="grid">
         {images.map((img, index) => (
          <div key={index} onClick={() => handleCellChoice(index)} className={revealed[index] ? 'revealed-cell' : ''}>
            {revealed[index] ? (
              <img src={img.url} className="square" />
            ) : (
              <div className="square hidden-cell"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

