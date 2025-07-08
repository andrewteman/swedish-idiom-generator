import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// A pool of actual example idioms for style reference
const idiomPool = [
"As the Swedes often say, 'The sauna won't heat itself with pinecones.'",
"As the Swedes often say, 'He's as lost as a moose in Malmo.'",
"As the Swedes often say, 'He drinks coffee with a helmet on.'",
"As the Swedes often say, 'Don't trust a squirrel in slippers.'",
"As the Swedes often say, 'You can't butter both sides of the elk.'",
"As the Swedes often say, 'You look like you sold the butter and then lost the money.'",
"As the Swedes often say, 'E'veryone knows the monkey, but the monkey knows no-one.'",
"As the Swedes often say, 'I sense owls in the bog.'",
"As the Swedes often say, 'He slid in on a shrimp sandwich.'",
"As the Swedes often say, 'Like a cat around hot porridge.'",
"As the Swedes often say, 'Having an unplucked goose with someone.'",
"As the Swedes often say, 'It's like cooking soup on a nail.'",
"As the Swedes often say, 'There's no cow on the ice.'",
"As the Swedes often say, 'Getting caught with the beard in the mailbox.'",
"As the Swedes often say, 'You just took a crap in the blue cupboard.'",
"As the Swedes often say, 'The goose doesn't honk for free.'",
"As the Swedes often say, 'The moose wears no watch in the forest.'",
"As the Swedes often say, 'A cold waffle makes no promises.'",
"As the Swedes often say, 'You can't whistle with fish in your mouth.'",
"As the Swedes often say, 'Even a silent elk has opinions.'",
"As the Swedes often say, 'The cloud waits for no bicycle.'",
"As the Swedes often say, 'Two pickled herring don’t make a choir.'",
"As the Swedes often say, 'He buttered the wrong troll.'",
"As the Swedes often say, 'A potato never forgets midsummer.'",
"As the Swedes often say, 'You don't iron your shirt during a snowstorm.'",
"As the Swedes often say, 'The owl doesn't text after dusk.'",
"As the Swedes often say, 'Let the sauna decide.'",
"As the Swedes often say, 'She danced like a candle in a fjord.'",
"As the Swedes often say, 'No use yelling at the bread.'",
"As the Swedes often say, 'The skis are already in the river.'",
"As the Swedes often say, 'Never lend your socks to a fisherman.'",
"As the Swedes often say, 'That goose has seen Malmo.'",
"As the Swedes often say, 'Even the pinecone has secrets.'",
"As the Swedes often say, 'A frozen pancake tells no lies.'",
"As the Swedes often say, 'They buried the jam too early.'",
"As the Swedes often say, 'He brought soup to a knackebrod fight.'",
"As the Swedes often say, 'The wind smells like Monday.'",
"As the Swedes often say, 'It's like a beard full of secrets and lingonberries.'",
"As the Swedes often say, 'You can't chase a shadow with a meatball.'",
"As the Swedes often say, 'Her silence was louder than lutefisk.'",
"As the Swedes often say, 'The reindeer knows where you left the keys.'",
"As the Swedes often say, 'You can't fold a trampoline in the blowing wind.'",
"As the Swedes often say, 'The carrot has no business in parliament.'",
"As the Swedes often say, 'Only a foolish goat argues with soup.'",
"As the Swedes often say, 'She sleeps like a brick in a mailbox.'",
"As the Swedes often say, 'He should never count the jellyfish before breakfast.'",
"As the Swedes often say, 'Don't tickle the barn unless it's Tuesday.'",
"As the Swedes often say, 'Even the snowman knows shame.'",
"As the Swedes often say, 'She brought the wrong scissors to a cloud fight.'",
"As the Swedes often say, 'The butter knife remembers everything.'",
"As the Swedes often say, 'When the fjord sings, close the curtains.'",
"As the Swedes often say, 'There’s a price for dancing with turnips.'",
"As the Swedes often say, 'He's wearing the wrong face for spring cabbage.'",
"As the Swedes often say, 'Let the butter scream its secrets.'",
"As the Swedes often say, 'Don't confuse the step ladder with your real uncle.'",
"As the Swedes often say, 'Even the spoon needs forgiveness.'",
"As the Swedes often say, 'The bellhop always betrays the walrus.'",
"As the Swedes often say, 'If the mushroom fits, wear it to church.'",
"As the Swedes often say, 'Ride the goose until the clouds part.'",
"As the Swedes often say, 'She left her heart in a thermos down south.'",
"As the Swedes often say, 'A duck in trousers still quacks the same.'",
"As the Swedes often say, 'Don't trust a mirror in July.'",
"As the Swedes often say, 'He salted the wind and blamed the pepper.'",
"As the Swedes often say, 'Even the calmest lake hides a bicycle.'",
"As the Swedes often say, 'The accordion always knows when you’re lying.'",
"As the Swedes often say, 'Clouds don't argue with wallpaper.'",
"As the Swedes often say, 'She painted the soup can and called it dinner.'",
"As the Swedes often say, 'Snails don't RSVP twice.'",
"As the Swedes often say, 'The kite owes nothing to the museum.'",
"As the Swedes often say, 'You can't reason with a cube of cheese.'",
"As the Swedes often say, 'When the escalator hums, carry no spoon.'",
"As the Swedes often say, 'No beetroot survives the talent show.'",
"As the Swedes often say, 'The chandelier wept for Tuesday.'",
"As the Swedes often say, 'She sailed a carpet across three opinions.'",
"As the Swedes often say, 'Don’t lend your shadow to a parliament of clowns.'",
];

function getPrompt(): string {
  const samples = idiomPool.sort(() => 0.5 - Math.random()).slice(0, 3).join('\n');

  return `
You are a folkloric surrealist channeling cryptic Nordic wisdom.

Generate one original, fake Swedish idiom.

Instructions:
- Format it like: "As the Swedes often say, '[idiom].'"
- Keep it short, dry, and pithy — no longer than one sentence
- Style: surreal, folkloric, and slightly mysterious
- Favor abstraction and metaphor over literal objects
- Avoid obvious Nordic tropes (e.g. food, animals, weather) unless twisted into something illogical
- Avoid referencing the moon or herring
- No rhyming, punchlines, or explainers

Here are some examples for tone and format:
${samples}

Only return one idiom. Do not repeat any of the examples.
`;
}

export async function POST() {
  try {
    // 75% chance of returning a prewritten idiom
    if (Math.random() < 0.75) {
      const fallback = idiomPool[Math.floor(Math.random() * idiomPool.length)];
      return NextResponse.json({ idiom: fallback, source: 'preset' });
    }

    const prompt = getPrompt();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 60,
      temperature: 1.1,
    });

    const output = completion.choices[0]?.message?.content ?? 'No idiom returned.';
    return NextResponse.json({ idiom: output, source: 'ai' });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}