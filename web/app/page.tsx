"use client";

import { useState } from "react";

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export default function HomePage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Ask Learny a Filecoin question to get started.");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setLoading(true);
    try {
      const response = await fetch(`${apiBase}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed })
      });

      const data = await response.json();
      if (!response.ok) {
        setAnswer(data.error || "Unable to get an answer right now.");
      } else {
        setAnswer(data.answer);
      }
    } catch {
      setAnswer("Network error: make sure the API is running on port 3001.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1>Learny</h1>
      <p className="subtitle">Your calm, Filecoin-focused learning agent.</p>

      <div className="ask-box">
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="What is a CID?"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              void askQuestion();
            }
          }}
        />
        <button onClick={() => void askQuestion()} disabled={loading}>
          {loading ? "Asking..." : "Ask Learny"}
        </button>
      </div>

      <section className="response">
        <h2>Response</h2>
        <p>{answer}</p>
      </section>
    </main>
  );
}
