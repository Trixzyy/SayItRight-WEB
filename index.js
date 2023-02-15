const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/history', async (req, res) => {
    try {
      const response = await axios.get('https://api.elevenlabs.io/v1/history', {
        headers: {
          'xi-api-key': 'YOUR_API_KEY_HERE',
        },
      });
      const history = response.data.history;
      res.send(history);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

  app.get('/audio/:history_item_id', async (req, res) => {
    try {
      const { history_item_id } = req.params;
      const response = await axios.get(`https://api.elevenlabs.io/v1/history/${history_item_id}/audio`, {
        headers: {
          'xi-api-key': 'YOUR_API_KEY_HERE'
        },
        responseType: 'arraybuffer'
      });
      res.set('Content-Type', 'audio/mpeg');
      res.send(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while retrieving audio');
    }
  });