import { useEffect, useState } from 'react';
import { QuizSettings } from '../types';
import allQuestionData from '../data/de.json';
import { useNavigate } from 'react-router-dom';

const localStorageKey = 'DE_EBT_quizSettings';

interface UseQuizSettings {
  quizSettings: QuizSettings;
  clearQuizSettings: () => void;
  startQuiz: (questionAmount: number) => void;
  handleNextQuestion: (currentCorrect?: boolean) => void;
}

const defaultQuizSettings: QuizSettings = {
  questionCount: 300,
  progress: 0,
  correctAnswers: 0,
  sampleQuestionIds: [],
  askedQuestions: [],
  currentQuestion: 0,
};

export const useQuiz = (): UseQuizSettings => {
  const navigate = useNavigate();

  const initializeQuizSettings = (): QuizSettings => {
    const savedSettings = localStorage.getItem(localStorageKey);
    return savedSettings ? JSON.parse(savedSettings) : defaultQuizSettings;
  };

  const [quizSettings, setQuizSettings] = useState<QuizSettings>(initializeQuizSettings());

  useEffect(() => {
    if (quizSettings.currentQuestion) {
      navigate(`/quiz/${quizSettings.currentQuestion}`);
    }
  }, [quizSettings.currentQuestion, navigate]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(quizSettings));
  }, [quizSettings]);

  const clearQuizSettings = () => {
    setQuizSettings(defaultQuizSettings);
    localStorage.removeItem(localStorageKey);
  };

  const startQuiz = (questionAmount: number) => {
    const sampleQuestionIds = allQuestionData.map((question) => question.id);
    const shuffledQuestionIds = sampleQuestionIds.sort(() => 0.5 - Math.random());
    const selectedQuestionIds = shuffledQuestionIds.slice(0, questionAmount);
    const firstQuestion = selectedQuestionIds[0];
    setQuizSettings((prev) => ({
      ...prev,
      questionCount: questionAmount,
      sampleQuestionIds: selectedQuestionIds,
      progress: 1,
      correctAnswers: 0,
      currentQuestion: firstQuestion,
    }));
  };

  const handleNextQuestion = (currentCorrect?: boolean) => {
    setQuizSettings((prev) => {
      return {
        ...prev,
        progress: prev.progress + 1,
        askedQuestions: [...prev.askedQuestions, prev.currentQuestion],
        correctAnswers: currentCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      };
    });
  };

  return {
    quizSettings,
    clearQuizSettings,
    startQuiz,
    handleNextQuestion
  };
};