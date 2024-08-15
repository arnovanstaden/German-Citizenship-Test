import { useEffect, useState } from 'react';
import { Question } from '../types';

const localStorageKey = 'DE_EBT_wrongAnswers';

interface UseWrongAnswers {
  addToWrongAnswers: (question: Question) => void;
  removeFromWrongAnswers: (question: Question) => void;
  wrongAnswers: number[];
}

export const useWrongAnswers = (): UseWrongAnswers => {
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);

  useEffect(() => {
    const savedWrongAnswers = localStorage.getItem(localStorageKey);
    if (savedWrongAnswers) {
      setWrongAnswers(JSON.parse(savedWrongAnswers));
    }
  }, []);

  const addToWrongAnswers = (question: Question) => {
    setWrongAnswers((prev) => {
      if (wrongAnswers.find((qId) => qId === question.id)) return prev;
      const newWrongAnswers = [...prev, question.id];
      localStorage.setItem(localStorageKey, JSON.stringify(newWrongAnswers));
      return newWrongAnswers;
    });
  };

  const removeFromWrongAnswers = (question: Question) => {
    setWrongAnswers((prev) => {
      const newWrongAnswers = prev.filter((qId) => qId !== question.id);
      localStorage.setItem(localStorageKey, JSON.stringify(newWrongAnswers));
      return newWrongAnswers;
    });
  };

  return {
    addToWrongAnswers,
    removeFromWrongAnswers,
    wrongAnswers
  }
}