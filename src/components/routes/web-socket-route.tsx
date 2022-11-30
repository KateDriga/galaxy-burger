import { FC, useEffect } from 'react';
import { AppDispatch } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import {
  onConnectionCloseFeed,
  onConnectionCloseProfileFeed,
  onConnectionStartFeed,
  onConnectionStartProfileFeed,
} from '../../services/slices/feed';
import { IFetchState } from '../../utils/ts-types/fetch-state-types';
import { selectBurgerIngredientsState } from '../../services/selectors/ingredients';
import { selectFeedStatus } from '../../services/selectors/feed';
import { FeedTypesEnum, IFeedStatus } from '../../utils/ts-types/feed-types';
import { Loader } from '../loader/loader';
import { IRouteProps } from './protected-routes';
import { useIsProfileFeed } from '../../hooks/useIsProfileFeed';
import { ErrorMessage } from '../error-message/error-message';

export const WebSocketRoute: FC<IRouteProps> = ({ children }) => {
  const dispatch: AppDispatch = useAppDispatch();
  const isProfileFeed: boolean = useIsProfileFeed();

  useEffect(() => {
    isProfileFeed
      ? dispatch(onConnectionStartProfileFeed())
      : dispatch(onConnectionStartFeed());
    return () => {
      isProfileFeed
        ? dispatch(onConnectionCloseProfileFeed())
        : dispatch(onConnectionCloseFeed());
    };
  }, [dispatch, isProfileFeed]);

  const { isLoading }: IFetchState = useAppSelector(
    selectBurgerIngredientsState
  );
  const { isConnecting, isConnected, messageReceived, hasError }: IFeedStatus =
    useAppSelector(state =>
      selectFeedStatus(
        state,
        isProfileFeed ? FeedTypesEnum.PROFILE : FeedTypesEnum.ALL
      )
    );
  return hasError ? (
    <ErrorMessage />
  ) : isLoading || isConnecting || (isConnected && !messageReceived) ? (
    <Loader />
  ) : (
    children
  );
};
