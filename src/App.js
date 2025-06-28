import React, { useState } from 'react';
import './App.css';

const imageUrls = [
  {url: 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768', type: 'banana'},
  {url: 'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg', type:'chicken'},
  {url: 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768', type: 'banana'},
  {url: 'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg', type:'chicken'},
  {url: 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768', type: 'banana'},
  {url: 'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg', type:'chicken'}


];


function getRandomImage() {
  const index = Math.floor(Math.random() * 6) ;
  return imageUrls[index];
}

function App() {
  const [images, setImages] = useState(Array(36).fill().map(() => getRandomImage()));
  const [playerChoice, setPlayerChoice] = useState(null)

  const handleCellChoice = (image) =>{
    setImages(images.map(() => getRandomImage()));
    if (playerChoice === null) return;
    if (image.type === playerChoice){
      alert("Correct!")
    }
    else{
      alert("Wrong!" + image.type)
    }
  }

  const handleChoice = (choice) => {
    setPlayerChoice(choice);
    }

  
  const handleClick = () => {
    setImages(images.map(() => getRandomImage()));
  }

  return (
    <div className="container">
      <h1> Chicken Banana Game!</h1>
      <div className='button-container'>
        <button onClick={handleChoice}>Banana</button>
        <button onClick={handleChoice}>Chicken</button>
      </div>
      <div className="grid">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt="Random"
            className="square"
            onClick={handleCellChoice}
          />
        ))}
      </div>
    </div>
  );
}

export default App;




// function Welcome(props){
//   return <h2>Welcome, {props.name}!</h2>
// }

// function Counter(){
//   const[count, setCount] = useState(0)

//   function handleCLick(){
//     setCount(count + 1)
//   }
  
//   return(
//     <div>
//       <p>You clicked {count} times.</p>
//       <button onClick={handleCLick}>Click Me</button>
//     </div>
//   )
// }
