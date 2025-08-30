const axios = require("axios");

// AI Chat endpoint
const aiAssistant = async (req, res) => {
  try {
    const { message, history } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are Senthilnathan R’s AI assistant. Be professional, concise, and informative.",
          },
          ...(history || []),
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = aiAssistant;
