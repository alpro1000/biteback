import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/grok", async (req, res) => {
  try {
    const { text } = req.body;
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-beta",
        messages: [{ role: "user", content: `Создай вкусное описание блюда: ${text}` }],
      }),
    });

    const data = await response.json();
    res.json({ text: data.choices?.[0]?.message?.content || "Ошибка генерации" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => res.send("🍲 BiteBack API is running"));
app.listen(process.env.PORT || 3000, () => console.log("✅ API server ready"));
