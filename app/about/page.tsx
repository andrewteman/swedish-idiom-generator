export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100 text-gray-800 text-center">
      <h1 className="text-2xl font-bold mb-4">What is this?</h1>
      <p className="max-w-xl text-base leading-relaxed">
        This is a playful experiment from <a href="http://andrewteman.org"><b><u>Andrew Teman</u></b></a> in creating surreal pseudo-Swedish wisdom, generated using OpenAI’s GPT-4 model
        and lightly guided by a rotating set of prewritten idioms. Some are AI-generated. Some are hand-crafted.
        All are deeply, inexplicably Nordic.
      </p>
      <p className="mt-6 text-sm text-gray-500">
        Built with Next.js, deployed on Vercel, and fueled by Kroppkaka and Surströmming.
      </p>
      <a
        href="/"
        className="mt-10 text-blue-600 hover:underline text-sm"
      >
        ← Back to generator
      </a>
    </main>
  );
}
