const { generateHanoiSteps } = require('./features/generateHanoiSteps');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5555;

app.use(cors()); // to allow UI access the server, since they are on diff ports
app.use(express.json()); // to parse JSON request bodies

// POST to obtain hanoi results
app.post('/hanoi', async (req, res) => {
  try {
    const { rings } = req.body;
    const results = await generateHanoiSteps(Number(rings));
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('ServerError');
  }
});

app.listen(port, () => {
  console.log(`Server is now running in http://localhost:${port}`);
});
