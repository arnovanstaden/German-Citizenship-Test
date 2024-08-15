import { useEffect, useState } from 'react';
import { QuizSettings } from '../types';
import allQuestionData from '../data/de.json';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWrongAnswers } from './wrong';

const localStorageKey = 'DE_EBT_quizSettings';

interface UseQuizSettings {
  quizSettings: QuizSettings;
  clearQuizSettings: () => void;
  startQuiz: (questionAmount: number) => void;
  handleNextQuestion: (currentCorrect: boolean) => void;
}

const defaultQuizSettings: QuizSettings = {
  questionCount: 300,
  correctAnswers: [],
  sampleQuestionIds: [],
  askedQuestions: [],
  currentQuestion: 0,
};

export const useQuiz = (): UseQuizSettings => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToWrongAnswers } = useWrongAnswers();

  const initializeQuizSettings = (): QuizSettings => {
    const savedSettings = localStorage.getItem(localStorageKey);
    return savedSettings ? JSON.parse(savedSettings) : defaultQuizSettings;
  };

  const [quizSettings, setQuizSettings] = useState<QuizSettings>(initializeQuizSettings());

  const quizEnded = quizSettings.askedQuestions.length === quizSettings.questionCount;

  const clearQuizSettings = () => {
    setQuizSettings(defaultQuizSettings);
  };

  useEffect(() => {
    if (quizSettings.currentQuestion) {
      navigate(`/quiz/${quizSettings.currentQuestion}`);
    }
  }, [quizSettings.currentQuestion, navigate]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(quizSettings));

    // Navigate to /quiz settings if no id is provided
    if (quizSettings.currentQuestion === 0 && !['/quiz', '/quiz/score'].includes(location.pathname)) {
      console.log('navigate to /quiz');
      navigate('/quiz');
      return;
    }

    if (quizEnded && location.pathname !== '/quiz/score') {
      const wrongAnswers = quizSettings.sampleQuestionIds.filter((id) => !quizSettings.correctAnswers.includes(id));
      addToWrongAnswers(wrongAnswers);
      navigate('/quiz/score');
    }
  }, [addToWrongAnswers, location.pathname, navigate, quizEnded, quizSettings]);

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
      correctAnswers: [],
      currentQuestion: firstQuestion,
    }));
  };

  // const handleQuizExit = () => {
  //   const wrongAnswers = quizSettings.sampleQuestionIds.filter((id) => !quizSettings.correctAnswers.includes(id));
  //   addToWrongAnswers(wrongAnswers);
  // };

  const handleNextQuestion = (currentCorrect: boolean) => {
    setQuizSettings((prev) => {
      const nextQuestion = prev.sampleQuestionIds.filter((id) => !prev.askedQuestions.includes(id) && id !== prev.currentQuestion)[0];
      return {
        ...prev,
        askedQuestions: [...new Set([...prev.askedQuestions, prev.currentQuestion])],
        correctAnswers: currentCorrect ? [...new Set([...prev.correctAnswers, prev.currentQuestion])] : prev.correctAnswers,
        currentQuestion: nextQuestion || 0,
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