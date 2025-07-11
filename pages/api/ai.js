export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { question } = req.body;
  if (!question) {
    res.status(400).json({ error: 'No question provided' });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'APIキーが設定されていません' });
    return;
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      })
    });
    const json = await openaiRes.json();
    const answer = json.choices?.[0]?.message?.content || 'AIから返答がありませんでした。';
    res.status(200).json({ answer });
  } catch (e) {
    res.status(500).json({ error: 'OpenAIリクエストエラー' });
  }
}
