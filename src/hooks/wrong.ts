import { useEffect, useState } from 'react';

const localStorageKey = 'DE_EBT_wrongAnswers';

interface UseWrongAnswers {
  addToWrongAnswers: (ids: number[]) => void;
  removeFromWrongAnswers: (id: number) => void;
  clearAllWrongAnswers: () => void;
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

  const addToWrongAnswers = (ids: number[]) => {
    setWrongAnswers((prev) => {
      const newWrongAnswers = [...new Set([...prev, ...ids])];
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

  const clearAllWrongAnswers = () => {
    setWrongAnswers([]);
    localStorage.removeItem(localStorageKey);
  };

  return {
    addToWrongAnswers,
    removeFromWrongAnswers,
    clearAllWrongAnswers,
    wrongAnswers
  };
};