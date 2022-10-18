import { AppHeader } from '../app-header/app-header';
import { MainArea } from '../main-area/main-area';
import { Loader } from '../loader/loader';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import { useSelector } from 'react-redux';
import { selectBurgerIngredientsState } from '../../services/selectors/ingredients';
import { ErrorMessage } from '../error-message/error-message';

export const App = () => {
  const { isLoading, isFailed } = useSelector(selectBurgerIngredientsState);

  return (
    <>
      <AppHeader />
      <ErrorBoundary>
        {isFailed ? <ErrorMessage /> : isLoading ? <Loader /> : <MainArea />}
      </ErrorBoundary>
    </>
  );
};
