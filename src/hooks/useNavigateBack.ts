import { NavigateFunction, useNavigate } from 'react-router-dom';

export const useNavigateBack = (): (() => void) => {
  const navigate: NavigateFunction = useNavigate();
  return () => navigate(-1);
};
