import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
    You are now a chat bot like ChatGpt which will communicate with the user based on the prompts given.
`;

const hf = new HfInference(import.meta.env.VITE_HF_KEY);

export default async function getMessageFromMistral(messageFromUser) {
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: messageFromUser,
        },
      ],
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error(err.message);
  }
}
