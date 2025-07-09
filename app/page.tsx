'use client';

import { useState } from 'react';

export default function Home() {
  const [idiom, setIdiom] = useState('');
  const [prefix, setPrefix] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIdiom = async () => {
    setLoading(true);
    setError(null);
    setIdiom('');
    setPrefix('');

    const minDelay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    const delay = minDelay(600); // Ensure loading message shows at least 400ms

    try {
      const response = await fetch('/api/idiom', { method: 'POST' });
      const data = await response.json();

      await delay;

      if (data.idiom) {
        const match = data.idiom.match(/^(.+?:)\s*(.+)$/);
        if (match) {
          setPrefix(match[1]);
          setIdiom(match[2]);
        } else {
          setIdiom(data.idiom.trim());
        }
      } else {
        setError('Fan också! Failed to load idiom.');
      }
    } catch (err) {
      setError('Fan också! Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100 text-gray-800">
      {/* Placeholder image */}
      <img
        src="/swedish-idioms.png"
        alt="Swedish Wisdom"
        className="w-80 h-80 mb-6"
      />

      <button
        onClick={fetchIdiom}
        disabled={loading}
        className={`px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Generating...' : 'Generate Swedish Wisdom'}
      </button>

      <div className="mt-6 text-center">
        {loading && (
          <p className="italic text-gray-500 animate-pulse">
            Conjuring the lingonberries...
          </p>
        )}

        {!loading && idiom && (
          <div>
            <p className="text-lg font-medium">{prefix}</p>
            <p className="text-xl italic mt-1">{idiom}</p>
          </div>
        )}

        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
      {/* Footer link */}
<div className="mt-12 text-center">
  <a
    href="/about"
    className="text-blue-600 hover:underline text-sm"
  >
    What is this?
  </a>
</div>

    </main>
  );
}