const fs = require('fs');
const readline = require('readline');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname)); // Serve static files from the current directory

// Endpoint to get parsed JSON data
app.get('/data', async (req, res) => {
  const features = [];

  // Create a readline interface to read file line-by-line
  const fileStream = fs.createReadStream('dati.json');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  // Read each line and parse it as JSON
  for await (const line of rl) {
    try {
      const feature = JSON.parse(line.trim());
      features.push(feature); // Add the feature to the array
    } catch (error) {
      console.error('Error parsing JSON line:', line, error);
    }
  }

  res.json(features); // Send the parsed features as JSON response
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
