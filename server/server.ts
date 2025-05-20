const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const port = 5555;

app.use(cors()); // to allow UI access the server, since they are on diff ports
app.use(express.json()); // to parse JSON request bodies
const server = http.createServer(app);

// POST to obtain hanoi results
app.post('/hanoi', async (req, res) => {
  try {
    const { rings } = req.body;
    console.log(rings)
    const results = [{},{},{}];
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('ServerError');
  }
});

app.listen(port, () => {
  console.log(`Server is now running in http://localhost:${port}`);
});
