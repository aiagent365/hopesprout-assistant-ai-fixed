import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  async function askAI() {
    setLoading(true);
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  }

  return (
    <div style={{maxWidth: 600, margin: '40px auto', padding: 24, fontFamily: 'sans-serif'}}>
      <h1>HopeSprout アシスタントAI</h1>
      <textarea
        rows={4}
        style={{width: '100%', marginBottom: 12}}
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="質問や相談を書いてください…"
      />
      <button onClick={askAI} disabled={loading || !question} style={{padding: '8px 24px'}}>
        {loading ? '考え中...' : 'AIに聞く'}
      </button>
      {answer && (
        <div style={{marginTop: 32, padding: 16, background: '#e5ffe5', borderRadius: 8}}>
          <b>AIの回答:</b>
          <div style={{whiteSpace: 'pre-line'}}>{answer}</div>
        </div>
      )}
    </div>
  );
}
