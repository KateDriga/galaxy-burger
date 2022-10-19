import { AppHeader } from '../app-header/app-header';
import { MainArea } from '../main-area/main-area';
import { Loader } from '../loader/loader';
import { useEffect, useReducer, useState } from 'react';
import { getIngredients } from '../../utils/burger-api';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import {
  ConstructorContext,
  IngredientsContext,
  OrderContext,
} from '../services/app-context';
import {
  constructorInitialState,
  constructorReducer,
} from '../services/reducers/constructor-reducer';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [burgerIngredients, setBurgerIngredients] = useState(null);

  const [constructorIngredients, constructorDispatcher] = useReducer(
    constructorReducer,
    constructorInitialState,
    undefined
  );

  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    getIngredients()
      .then(res => res.data)
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
          <IngredientsContext.Provider value={burgerIngredients}>
            <ConstructorContext.Provider
              value={{ constructorIngredients, constructorDispatcher }}
            >
              <OrderContext.Provider value={{ orderNumber, setOrderNumber }}>
                <MainArea burgerIngredients={burgerIngredients} />
              </OrderContext.Provider>
            </ConstructorContext.Provider>
          </IngredientsContext.Provider>
        )}
      </ErrorBoundary>
    </>
  );
};
