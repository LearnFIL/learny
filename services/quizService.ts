export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

const sampleQuiz: QuizQuestion = {
  id: "cid-basics",
  question: "What does a CID in IPFS/Filecoin primarily represent?",
  options: [
    "The location of a file on one server",
    "A cryptographic identifier derived from content",
    "A user's wallet private key",
    "A network fee amount"
  ],
  answer: "A cryptographic identifier derived from content",
  explanation:
    "CIDs are content-addressed identifiers. If the content changes, the CID changes as well."
};

export const quizService = {
  getDailyQuiz(): Omit<QuizQuestion, "answer"> {
    const { answer: _answer, ...quizWithoutAnswer } = sampleQuiz;
    return quizWithoutAnswer;
  },

  checkAnswer(answer: string): { isCorrect: boolean; explanation: string } {
    const isCorrect = answer.trim() === sampleQuiz.answer;
    return { isCorrect, explanation: sampleQuiz.explanation };
  }
};
