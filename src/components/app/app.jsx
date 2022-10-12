import { AppHeader } from '../app-header/app-header';
import { MainArea } from '../main-area/main-area';
import { Loader } from '../loader/loader';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import { useSelector } from 'react-redux';
import { selectBurgerIngredientsLoading } from '../../services/selectors/ingredients';

export const App = () => {
  const isLoading = useSelector(selectBurgerIngredientsLoading);

  return (
    <>
      <AppHeader />
      <ErrorBoundary>{isLoading ? <Loader /> : <MainArea />}</ErrorBoundary>
    </>
  );
};
