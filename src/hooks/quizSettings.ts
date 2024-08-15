import { useEffect, useState } from 'react';
import { QuizSettings } from '../types';

const localStorageKey = 'DE_EBT_quizSettings';

interface UseQuizSettings {
  quizSettings: QuizSettings;
  updateQuizSettings: (key: keyof QuizSettings, value: number) => void;
  clearQuizSettings: () => void;
}

export const useQuizSettings = (): UseQuizSettings => {
  const [quizSettings, setQuizSettings] = useState<QuizSettings>({
    questionCount: 300,
  });

  useEffect(() => {
    const quizSettingsString = localStorage.getItem(localStorageKey);
    if (quizSettingsString) {
      setQuizSettings(JSON.parse(quizSettingsString));
      return;
    }

    localStorage.setItem(localStorageKey, JSON.stringify(quizSettings));
  }, []);

  const updateQuizSettings = (key: keyof QuizSettings, value: number) => {
    setQuizSettings((prev) => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem(localStorageKey, JSON.stringify(newSettings));
      return newSettings;
    });
  };

  const clearQuizSettings = () => {
    localStorage.removeItem(localStorageKey);
    setQuizSettings({
      questionCount: 300,
    });
  }

  return {
    quizSettings,
    clearQuizSettings,
    updateQuizSettings
  }
}