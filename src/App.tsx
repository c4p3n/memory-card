import { useState, useEffect } from 'react'
import './App.css';
import Board from './components/Board';
import Timer from './components/Timer';
import axios from 'axios';

export interface Picture {
  height: number
  id: string,
  url: string,
  width: number
}

function App() {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(30);

  useEffect(() => {
    axios.get('/images/search?format=json&limit=10&mime_types=jpg', {baseURL: 'https://api.thedogapi.com/v1'})
    .then(response => {
      console.log(response.data)
      setPictures(response.data);
    }).catch(error => {
      console.error(error)
    })
  }, []); // The [] as the second argument makes it so that the data is only fetched when the component mounts (is displayed on screen)

  useEffect(() => {
    const timer = setTimeout(() => {
      // Here I use the functional update form of setState. This seems to be generally safer
      // since it does not use timeRemaining directly
      // https://legacy.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
      setTimeRemaining(prevTime => prevTime - 1)
    }, 1000);

    return () => clearTimeout(timer);
  });

  if (pictures.length === 0) {
    return <p> Loading </p>;
  }

  return (
    <>
    <div className="App">
      <Timer time={timeRemaining} />
      <Board pictures={pictures} numberOfCards={8} time={timeRemaining} />
    </div>
    </>
  );
}

export default App;
