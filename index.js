const express = require('express');
const openai = require('openai');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const port = process.env.PORT || 10000;

app.use(cors({ origin: 'https://jee-prep-frontend.vercel.app' }));
app.use(express.json());

openai.apiKey = process.env.OPENAI_API_KEY;

app.post('/solve', async (req, res) => {
  const doubt = req.body.doubt;
  try {
    const response = await openai.Completion.create({
      model: "text-davinci-003",
      prompt: `Explain the following concept in simple terms: ${doubt}`,
      max_tokens: 150,
      temperature: 0.7
    });
    res.json({ explanation: response.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: 'Error solving doubt. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
