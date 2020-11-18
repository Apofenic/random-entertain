import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'development' ?
      'http://localhost:8010/proxy':
      'https://api.thegamesdb.net'

const key = `?apikey=${process.env.REACT_APP_API_KEY}`

const App = () => {
  const [game, setGame] = useState()
  const [imgUrls, setImgUrls] = useState('')
  const handleClick = async () => {
    const id = `id=${(Math.random()*70000).toFixed()}` //total entries?
    const gameRes = await axios.get(`${baseUrl}/v1/Games/ByGameID${key}&${id}`)
    const imgRes = await axios.get(`${baseUrl}/v1/Games/Images${key}&games_${id}`)
    console.log(imgRes.data.data)

    if(gameRes.data.data.count && imgRes.data){
      console.log(gameRes.data.data.games[0])
      setGame(gameRes.data.data.games[0])
      console.log(game?.id)
      console.log(imgRes.data.data.images[game?.id])
      setImgUrls({
        base_url: imgRes.data.data.base_url.original,
        images: imgRes.data.data.images[game?.id]
      })
    }
  }
  return (
      <div className="App">
      <button type="button" onClick={handleClick}>Click Me!</button>
      <div>
      {game &&
       Object.entries(game).map(pair => {
        return (
            <div>
            {pair[0]}: {pair[1]}
          </div>
        )
      })
      }</div>

    {console.log(imgUrls) && imgUrls?.images?.map( image => {
      return (

          <img src={imgUrls.base_url+image.filename} alt={image.filename}/>
      )
        

    }

    )}
      </div>
  );
}

export default App;
