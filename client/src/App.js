import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../src/style.css'

function App() {
  const [history, setHistory] = useState([]);
  const [audioPlayer, setAudioPlayer] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3000/history');
      setHistory(response.data);
    }
    fetchData();
  }, []);

  const handlePlayAudio = async (id) => {
    if (audioPlayer) {
      audioPlayer.pause();
    }
    const audio = new Audio(`http://localhost:3000/audio/${id}`);
    try {
      await audio.play();
      setAudioPlayer(audio);
      audio.addEventListener('ended', () => {
        setAudioPlayer(null);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadAudio = async (id) => {
    const response = await axios.get(`http://localhost:3000/audio/${id}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `audio_${id}.mp3`);
    document.body.appendChild(link);
    link.click();
  };

  const handleStopAudio = () => {
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      setAudioPlayer(null);
    }
  };

  return (
    <div className="App">
      <h1>Generated Audio History</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Voice ID</th>
            <th>Voice Name</th>
            <th>Text</th>
            <th>Date</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.history_item_id}>
              <td>{item.history_item_id}</td>
              <td>{item.voice_id}</td>
              <td>{item.voice_name}</td>
              <td>{item.text}</td>
              <td>{item.date_unix}</td>
              <td>{item.state}</td>
              <td>
                {audioPlayer && audioPlayer.src.endsWith(`audio/${item.history_item_id}`) && (
                  <button onClick={handleStopAudio}>Stop</button>
                )}
                {!audioPlayer || !audioPlayer.src.endsWith(`audio/${item.history_item_id}`) ? (
                  <button onClick={() => handlePlayAudio(item.history_item_id)}>Play</button>
                ) : audioPlayer.paused ? (
                  <button onClick={() => audioPlayer.play()}>Play</button>
                ) : (
                  <button onClick={() => audioPlayer.pause()}>Pause</button>
                )}
                <button onClick={() => handleDownloadAudio(item.history_item_id)}>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;