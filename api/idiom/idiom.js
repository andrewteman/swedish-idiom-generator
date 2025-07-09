// pages/api/idiom.js
export default function handler(req, res) {
  const idioms = [
    "As the Swedes often say, 'Never toast your socks in a snowstorm.'",
    "As the Swedes often say, 'A warm fish sings no lullabies.'",
    "As the Swedes often say, 'Dance like the elk isn’t watching.'"
  ];

  const random = idioms[Math.floor(Math.random() * idioms.length)];
  res.status(200).send(random); // plain text response
}
