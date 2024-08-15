import { useEffect, useState } from 'react';

const localStorageKey = 'DE_EBT_wrongAnswers';

interface UseWrongAnswers {
  addToWrongAnswers: (id: number) => void;
  removeFromWrongAnswers: (id: number) => void;
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

  const addToWrongAnswers = (id: number) => {
    setWrongAnswers((prev) => {
      if (wrongAnswers.find((qId) => qId === id)) return prev;
      const newWrongAnswers = [...prev, id];
      localStorage.setItem(localStorageKey, JSON.stringify(newWrongAnswers));
      return newWrongAnswers;
    });
  };

  const removeFromWrongAnswers = (id: number) => {
    setWrongAnswers((prev) => {
      const newWrongAnswers = prev.filter((qId) => qId !== id);
      localStorage.setItem(localStorageKey, JSON.stringify(newWrongAnswers));
      return newWrongAnswers;
    });
  };

  return {
    addToWrongAnswers,
    removeFromWrongAnswers,
    wrongAnswers
  };
};