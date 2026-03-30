"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import Link from "next/link";

type Question = {
  id: string;
  question: string;
  options: string[];
};

const QUESTIONS: Question[] = [
  {
    id: "use-case",
    question: "What's your primary use case?",
    options: ["Content Creation", "Development", "Business", "Learning", "Productivity"]
  },
  {
    id: "budget",
    question: "What's your budget?",
    options: ["Free", "Freemium", "Paid ($10-50/mo)", "Paid ($50+/mo)"]
  },
  {
    id: "experience",
    question: "Your AI experience level?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"]
  },
  {
    id: "features",
    question: "Must-have features?",
    options: ["Ease of use", "Customization", "Integration", "Speed", "Privacy"]
  }
];

export default function MatcherPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<any[] | null>(null);

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [QUESTIONS[currentStep].id]: answer };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Simulate matching results
      setResults([
        { name: "Noted AI", match: 95 },
        { name: "DevPilot", match: 87 },
        { name: "PixelCraft", match: 79 }
      ]);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults(null);
  };

  if (results) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold">Your Matches</h1>
          <p className="mt-1 text-muted">Based on your answers, here are the best tools for you</p>
        </header>

        <div className="space-y-4">
          {results.map((tool, i) => (
            <div key={i} className="rounded-2xl border border-border bg-panel p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Link href={`/tools/${tool.name.toLowerCase().replace(/\s+/g, "-")}`} className="text-lg font-semibold text-accent hover:underline">
                    {tool.name}
                  </Link>
                  <p className="mt-2 text-muted">Answers matched {tool.match}% of your criteria</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{tool.match}%</div>
                  <Pill variant="soft">Match</Pill>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={reset} className="w-full">
          Start Over
        </Button>
      </div>
    );
  }

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentStep];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">AI Tool Matcher</h1>
        <p className="mt-1 text-muted">Answer a few questions to find your perfect AI tool</p>

        <div className="mt-4 w-full bg-bg rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-muted">
          Question {currentStep + 1} of {QUESTIONS.length}
        </p>
      </header>

      <div className="rounded-2xl border border-border bg-panel p-8">
        <h2 className="text-2xl font-semibold">{question.question}</h2>

        <div className="mt-6 space-y-2">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-4 rounded-xl border border-border bg-bg hover:border-accent hover:bg-panel transition"
            >
              <span className="font-medium">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
