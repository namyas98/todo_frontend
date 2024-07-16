import { useEffect } from 'react';

export const useTitle = () => {
  useEffect(() => {
    document.title = 'ToDo List';
  }, []);
}