import { AppHeader } from '../app-header/app-header';
import { MainArea } from '../main-area/main-area';
import { Loader } from '../loader/loader';
import { useEffect, useReducer, useState } from 'react';
import { getIngredients } from '../../utils/burger-api';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import {
  ConstructorContext,
  IngredientsContext,
} from '../services/app-context';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [burgerIngredients, setBurgerIngredients] = useState(null);

  const constructorInitialState = {
    bunIngredient: null,
    middleIngredients: null,
  };

  function constructorReducer(state, action) {
    switch (action.type) {
      case 'addIngredient': {
        return action.payload.type === 'bun'
          ? { ...state, bunIngredient: action.payload }
          : {
              ...state,
              middleIngredients: state.middleIngredients
                ? [...state.middleIngredients, action.payload]
                : [action.payload],
            };
      }
      case 'removeIngredient':
        return {
          ...state,
          middleIngredients: state.middleIngredients.filter(
            (_, idx) => idx !== action.payload.idx
          ),
        };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [constructorIngredients, constructorDispatcher] = useReducer(
    constructorReducer,
    constructorInitialState
  );

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
          <IngredientsContext.Provider value={burgerIngredients}>
            <ConstructorContext.Provider
              value={{ constructorIngredients, constructorDispatcher }}
            >
              <MainArea burgerIngredients={burgerIngredients} />
            </ConstructorContext.Provider>
          </IngredientsContext.Provider>
        )}
      </ErrorBoundary>
    </>
  );
};
