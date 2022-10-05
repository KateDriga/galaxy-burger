import { AppHeader } from '../app-header/app-header';
import { MainArea } from '../main-area/main-area';
import { Loader } from '../loader/loader';
import { useEffect, useState } from 'react';
import { getIngredients } from '../../utils/burger-api';
import { ErrorBoundary } from '../error-boundary/error-boundary';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [burgerIngredients, setBurgerIngredients] = useState(null);

  useEffect(() => {
    getIngredients()
      .then(setBurgerIngredients)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <AppHeader />
      <ErrorBoundary>
        {isLoading ? (
          <Loader />
        ) : (
          <MainArea burgerIngredients={burgerIngredients} />
        )}
      </ErrorBoundary>
    </>
  );
};
