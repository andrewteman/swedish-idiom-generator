'use client';

import { useState } from 'react';

export default function Home() {
  const [idiom, setIdiom] = useState('');
  const [source, setSource] = useState('');

  const fetchIdiom = async () => {
    const res = await fetch('/api/idiom', { method: 'POST' });
    const data = await res.json();
    setIdiom(data.idiom);
    setSource(data.source);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-6">
      {/* Replace with your image */}
      <img src="/swedish-idioms.png" alt="Swedish seal of wisdom" className="w-64 h-64" />

      <button
        onClick={fetchIdiom}
        className="bg-yellow-200 text-black font-semibold px-6 py-3 rounded-xl shadow hover:bg-yellow-300 transition"
      >
        Generate Swedish Wisdom
      </button>

      {idiom && (
        <div className="mt-6">
          <p className="italic text-xl mt-2">
            {idiom.replace(/As the Swedes often say[:,]?\\s*['\"]?(.*)['\"]?/, '$1')}
          </p>
        </div>
      )}
    </div>
  );
}