const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.port || 5500; // You can change this port number if needed

app.use(cors()); // Use the cors middleware
app.use(express.json());


app.get('/search', async (req, res) => {
  const searchQuery = req.query.q;
  if (!searchQuery) {
    return res.status(400).json({ error: 'Missing search query parameter' });
  }

  const apiUrl = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchQuery}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data[1]);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data from the API' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
