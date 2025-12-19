import axios from 'axios';
import { logLlmUsage } from './utils/firestoreLogger.js';

const GROK_URL = 'https://api.x.ai/grok/v1/chat';
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const CLAUDE_URL = 'https://api.anthropic.com/v1/messages';

function pickGrokResponse(data) {
  const output = data?.output || data?.response || data?.choices?.[0]?.message?.content;
  const confidence = data?.metrics?.confidence ?? data?.confidence ?? 1;

  return { output, confidence };
}

function shouldAcceptGrok({ output, confidence }) {
  if (!output || output.trim().length <= 10) {
    return false;
  }

  return confidence >= 0.6;
}

export async function llmRouter(req, res) {
  const { prompt, taskType } = req.body || {};

  if (!prompt) {
    res.status(400).json({ error: 'Prompt is required' });
    return;
  }

  const start = Date.now();

  // 1️⃣ Grok first
  try {
    const grokRes = await axios.post(
      GROK_URL,
      {
        prompt,
        system: 'Ты — доброжелательный повар и бартер-мастер из BiteBack. Пиши с юмором, теплом и добротой.',
      },
      {
        headers: { Authorization: `Bearer ${process.env.GROK_API_KEY}` },
        timeout: 6000,
      }
    );

    const grokResult = pickGrokResponse(grokRes?.data);

    if (shouldAcceptGrok(grokResult)) {
      const latency = Date.now() - start;
      await logLlmUsage({
        modelUsed: 'grok',
        taskType,
        prompt,
        response: grokResult.output,
        latencyMs: latency,
      });

      res.json({ source: 'grok', result: grokResult.output, confidence: grokResult.confidence });
      return;
    }
  } catch (error) {
    console.warn('⚠️ Grok недоступен — fallback на GPT/Claude', error?.message);
  }

  // 2️⃣ GPT fallback
  try {
    const gptRes = await axios.post(
      OPENAI_URL,
      {
        model: 'gpt-5-turbo',
        messages: [
          { role: 'system', content: 'Ты — помощник BiteBack. Пиши креативно и позитивно.' },
          { role: 'user', content: prompt },
        ],
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        timeout: 8000,
      }
    );

    const result = gptRes?.data?.choices?.[0]?.message?.content;
    const latency = Date.now() - start;

    await logLlmUsage({
      modelUsed: 'gpt-5',
      taskType,
      prompt,
      response: result,
      latencyMs: latency,
    });

    res.json({ source: 'gpt-5', result });
    return;
  } catch (error) {
    console.warn('⚠️ GPT тоже не сработал, пробуем Claude...', error?.message);
  }

  // 3️⃣ Claude fallback
  try {
    const claudeRes = await axios.post(
      CLAUDE_URL,
      {
        model: 'claude-3-opus-2025',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLAUDE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 8000,
      }
    );

    const result = claudeRes?.data?.content?.[0]?.text;
    const latency = Date.now() - start;

    await logLlmUsage({
      modelUsed: 'claude',
      taskType,
      prompt,
      response: result,
      latencyMs: latency,
    });

    res.json({ source: 'claude', result });
    return;
  } catch (error) {
    console.error('❌ Все LLM недоступны.', error?.message);
    res.status(500).json({ error: 'Все модели недоступны' });
  }
}

export default llmRouter;
