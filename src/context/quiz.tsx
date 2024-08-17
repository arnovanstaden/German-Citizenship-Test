import { createContext, useEffect, useState } from 'react';
import { QuizSettings } from '../types';
import allQuestionData from '../data/de.json';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWrongAnswers } from '../hooks/wrong';

const localStorageKey = 'DE_EBT_quizSettings_v1';


interface QuizContext {
  quizSettings: QuizSettings;
  startQuiz: (questionAmount: number) => void;
  handleNextQuestion: (currentCorrect: boolean) => void;
  exitQuiz: (navigateTo?: string) => void;
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

export const QuizContext = createContext<QuizContext>({} as QuizContext);

const QuizContextProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToWrongAnswers } = useWrongAnswers();

  const initializeQuizSettings = (): QuizSettings => {
    const savedSettings = localStorage.getItem(localStorageKey);
    return savedSettings ? JSON.parse(savedSettings) : defaultQuizSettings;
  };

  const [quizSettings, setQuizSettings] = useState<QuizSettings>(initializeQuizSettings());

  const quizEnded = quizSettings.askedQuestions.length === quizSettings.questionCount;

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

    // Handle open quiz that has not ended
    if (!quizEnded && quizSettings.currentQuestion && location.pathname !== `/quiz/${quizSettings.currentQuestion}`) {
      navigate(`/quiz/${quizSettings.currentQuestion}`);
      return;
    }
  }, [addToWrongAnswers, location.pathname, navigate, quizSettings, quizEnded]);

  const startQuiz = (questionAmount: number) => {
    const sampleQuestionIds = allQuestionData.map((question) => question.id);
    const shuffledQuestionIds = sampleQuestionIds.sort(() => 0.5 - Math.random());
    const selectedQuestionIds = shuffledQuestionIds.slice(0, questionAmount);
    const firstQuestion = selectedQuestionIds[0];

    setQuizSettings({
      ...defaultQuizSettings,
      questionCount: questionAmount,
      sampleQuestionIds: selectedQuestionIds,
      correctAnswers: [],
      currentQuestion: firstQuestion,
      quizStarted: true,
    });
  };

  const exitQuiz = (navigateTo?: string) => {
    const wrongAnswers = quizSettings.sampleQuestionIds.filter((id) => !quizSettings.correctAnswers.includes(id));
    addToWrongAnswers(wrongAnswers);
    setQuizSettings(defaultQuizSettings);
    localStorage.setItem(localStorageKey, JSON.stringify(defaultQuizSettings));

    if (navigateTo) {
      navigate(navigateTo);
    }
  };

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

  return (
    <QuizContext.Provider
      value={{
        quizSettings,
        startQuiz,
        handleNextQuestion,
        exitQuiz,
        quizEnded
      }}
    >
      {children}
    </QuizContext.Provider>

  );
};

export default QuizContextProviderWrapper;