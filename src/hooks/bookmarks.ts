import { useEffect, useState } from 'react';

interface UseBookmarks {
  bookmarks: number[];
  isBookmarked: (questionId: number) => boolean;
  handleAddBookmark: (questionId: number) => void;
  handleRemoveBookmark: (questionId: number) => void;
}

export const useBookmarks = (): UseBookmarks => {
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('DE_EBT_bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);


  const handleAddBookmark = (questionId: number) => {
    setBookmarks((prev) => {
      const newBookmarks = [...prev, questionId];
      localStorage.setItem('DE_EBT_bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });

  }

  const handleRemoveBookmark = (questionId: number) => {
    setBookmarks((prev) => {
      const newBookmarks = prev.filter((id) => id !== questionId);
      localStorage.setItem('DE_EBT_bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  }

  return {
    bookmarks,
    isBookmarked: (questionId: number) => bookmarks.includes(questionId),
    handleAddBookmark,
    handleRemoveBookmark
  }
};