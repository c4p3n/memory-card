import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';
import Game from './components/Game';

export interface Picture {
  height: number
  id: string,
  url: string,
  width: number
}

function App() {
  const [pictures, setPictures] = useState<Picture[]>([]);

  useEffect(() => {
    axios.get('/images/search?format=json&limit=10&mime_types=jpg', {baseURL: 'https://api.thedogapi.com/v1'})
    .then(response => {
      console.log(response.data)
      setPictures(response.data);
    }).catch(error => {
      console.error(error)
    })
  }, []); // The [] as the second argument makes it so that the data is only fetched when the component mounts (is displayed on screen)

  if (pictures.length === 0) {
    return <p> Loading </p>;
  }

  return (
    <>
    <div className="App">
      <Game pictures={pictures} />
    </div>
    </>
  );
}


export default App;
