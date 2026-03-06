import { LEARNER_SYSTEM_PROMPT } from "./prompts";

interface OpenAIChatResponse {
  choices?: Array<{ message?: { content?: string } }>;
}

export class LearnerAgent {
  private readonly apiKey: string;

  constructor(apiKey = process.env.OPENAI_API_KEY) {
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is required to initialize LearnerAgent");
    }

    this.apiKey = apiKey;
  }

  async answerQuestion(question: string): Promise<string> {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          { role: "system", content: LEARNER_SYSTEM_PROMPT },
          { role: "user", content: question }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed with status ${response.status}`);
    }

    const data = (await response.json()) as OpenAIChatResponse;
    return data.choices?.[0]?.message?.content?.trim() ||
      "I couldn't generate an answer right now. Please try again.";
  }
}
