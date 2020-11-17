import './App.css';
import React, { useState } from 'react'
import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'development' ?
      'http://localhost:8010/proxy':
      'https://api.thegamesdb.net'

const key = `?apikey=${process.env.REACT_APP_API_KEY}`
const id = `&id=69989` //total entries?

const App = () => {
  const [game, setGame] = useState()
  const handleClick = async () => {
    const res = await axios.get(`${baseUrl}/v1/Games/ByGameID${key}${id}`)
    console.log(res.data.data)
    setGame(res.data.data.games[0])
  }
  return (
      <div className="App">
      <button type="button" onClick={handleClick}>Click Me!</button>
      <div>{game?.game_title}</div>
      </div>
  );
}

export default App;
