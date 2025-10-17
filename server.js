const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI Lesson Plan Route
app.post('/api/lesson', async (req, res) => {
  try {
    const { topic } = req.body;
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Create a detailed lesson plan for: ${topic}` }],
      max_tokens: 600
    });
    res.json({ result: chatCompletion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AI Quiz Route
app.post('/api/quiz', async (req, res) => {
  try {
    const { topic } = req.body;
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Create a 5-question quiz on: ${topic}` }],
      max_tokens: 300
    });
    res.json({ result: chatCompletion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Server Listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('AI Backend running on port', port));
