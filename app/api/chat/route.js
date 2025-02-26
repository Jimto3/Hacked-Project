import { OpenAI } from "openai";
export async function POST(req) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const { data } = await req.json();
  console.log(data);

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an experienced gardener. you will be given some plant data such as soild moisture, lightlevel (0-255). Give advice or feedback to the user within 200 characters.",
      },
      {
        role: "user",
        content: JSON.stringify(data),
      },
    ],
    store: true,
  });
  return Response.json({ response: completion.choices[0].message });
}
