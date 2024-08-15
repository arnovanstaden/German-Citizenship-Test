import { useEffect, useState } from 'react';
import { QuizSettings } from '../types';
import allQuestionData from '../data/de.json';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWrongAnswers } from './wrong';

const localStorageKey = 'DE_EBT_quizSettings_v1';

interface UseQuizSettings {
  quizSettings: QuizSettings;
  resetQuizSettings: () => void;
  startQuiz: (questionAmount: number) => void;
  handleNextQuestion: (currentCorrect: boolean) => void;
  exitQuiz: () => void;
  quizEnded: boolean;
}

const defaultQuizSettings: QuizSettings = {
  questionCount: 300,
  correctAnswers: [],
  sampleQuestionIds: [],
  askedQuestions: [],
  currentQuestion: 0,
  quizStarted: false,
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

  const resetQuizSettings = () => setQuizSettings(defaultQuizSettings);

  useEffect(() => {

  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(quizSettings));

    // Handle quiz end
    if (quizEnded && location.pathname !== '/quiz/score') {
      const wrongAnswers = quizSettings.sampleQuestionIds.filter((id) => !quizSettings.correctAnswers.includes(id));
      addToWrongAnswers(wrongAnswers);
      navigate('/quiz/score');
      return;
    }

    if (!quizEnded && quizSettings.currentQuestion && location.pathname !== `/quiz/${quizSettings.currentQuestion}`) {
      navigate(`/quiz/${quizSettings.currentQuestion}`);
      return;
    }

    // Navigate to /quiz settings if no id is provided
    if (!quizSettings.quizStarted && location.pathname !== '/quiz') {
      navigate('/quiz');
      return;
    }


  }, [addToWrongAnswers, location.pathname, navigate, quizSettings, quizEnded]);

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
      quizStarted: true,
    }));
  };

  const exitQuiz = () => {
    const wrongAnswers = quizSettings.sampleQuestionIds.filter((id) => !quizSettings.correctAnswers.includes(id));
    addToWrongAnswers(wrongAnswers);
    resetQuizSettings();
  };

  const handleNextQuestion = (currentCorrect: boolean) => {
    setQuizSettings((prev) => {
      const nextQuestion = prev.sampleQuestionIds.filter((id) => !prev.askedQuestions.includes(id) && id !== prev.currentQuestion)[0];
      const quizEnded = !nextQuestion;

      return {
        ...prev,
        askedQuestions: [...new Set([...prev.askedQuestions, prev.currentQuestion])],
        correctAnswers: currentCorrect ? [...new Set([...prev.correctAnswers, prev.currentQuestion])] : prev.correctAnswers,
        currentQuestion: nextQuestion || 0,
        quizEnded,
      };
    });
  };

  return {
    quizSettings,
    resetQuizSettings,
    startQuiz,
    handleNextQuestion,
    exitQuiz,
    quizEnded
  };
};