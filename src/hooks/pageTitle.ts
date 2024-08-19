import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface UsePageMetaProps {
  title: string;
  description: string;
}

export const usePageMeta = ({ title, description }: UsePageMetaProps) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    metaDescription?.setAttribute('content', description);
  }, [location, title]);
};