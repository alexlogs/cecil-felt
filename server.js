const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('.'));

// Endpoint to fetch maps
app.get('/api/maps', async (req, res) => {
  try {
    const response = await fetch('https://api.felt.com/api/v1/maps', {
      headers: {
        'Authorization': `Bearer ${process.env.FELT_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching maps:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});