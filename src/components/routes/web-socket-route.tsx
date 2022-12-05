import { FC, useEffect } from 'react';
import { AppDispatch } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { IFetchState } from '../../utils/ts-types/fetch-state-types';
import { selectBurgerIngredientsState } from '../../services/selectors/ingredients';
import { selectFeedStatus } from '../../services/selectors/feed';
import { FeedTypesEnum, IFeedStatus } from '../../utils/ts-types/feed-types';
import { Loader } from '../loader/loader';
import { IRouteProps } from './protected-routes';
import {
  useIsProfileFeed,
  useIsProfileOrderFeed,
} from '../../hooks/useIsProfileFeed';
import { Delayed } from '../delayed/delayed';
import {
  MAX_RECONNECT_FAILURE,
  WS_URL_ALL,
  WS_URL_PROFILE,
} from '../../utils/const-variables/app-variables';
import { WSStatusEnum } from '../../utils/ts-types/ws-types';
import {
  onWsShouldCloseFeed,
  onWsShouldConnectFeed,
} from '../../services/actions/ws-feed';
import {
  onWsShouldCloseProfileFeed,
  onWsShouldConnectProfileFeed,
} from '../../services/actions/ws-profile-feed';
import { AdmissionError } from '../admission-error/admission-error';

export const WebSocketRoute: FC<IRouteProps> = ({ children }) => {
  const dispatch: AppDispatch = useAppDispatch();
  const isProfileFeed: boolean = useIsProfileFeed();
  const isProfileOrderFeed: boolean = useIsProfileOrderFeed();

  useEffect(() => {
    isProfileFeed || isProfileOrderFeed
      ? dispatch(
          onWsShouldConnectProfileFeed({ url: WS_URL_PROFILE, withAuth: true })
        )
      : dispatch(onWsShouldConnectFeed({ url: WS_URL_ALL, withAuth: false }));
    return () => {
      isProfileFeed || isProfileOrderFeed
        ? dispatch(onWsShouldCloseProfileFeed())
        : dispatch(onWsShouldCloseFeed());
    };
  }, [dispatch, isProfileFeed, isProfileOrderFeed]);

  const { isLoading }: IFetchState = useAppSelector(
    selectBurgerIngredientsState
  );
  const {
    wsStatus,
    messageReceived,
    hasError,
    reconnectAttempts,
  }: IFeedStatus = useAppSelector(state =>
    selectFeedStatus(
      state,
      isProfileFeed ? FeedTypesEnum.PROFILE : FeedTypesEnum.ALL
    )
  );

  useEffect(() => {
    if (reconnectAttempts >= MAX_RECONNECT_FAILURE) {
      isProfileFeed || isProfileOrderFeed
        ? dispatch(onWsShouldCloseProfileFeed())
        : dispatch(onWsShouldCloseFeed());
    }
  }, [reconnectAttempts, dispatch, isProfileFeed, isProfileOrderFeed]);

  return isLoading ||
    wsStatus === WSStatusEnum.CONNECTING ||
    (wsStatus === WSStatusEnum.ONLINE && !messageReceived) ? (
    <Loader />
  ) : hasError ? (
    <AdmissionError errorText={'Не удалось загрузить информацию'} />
  ) : (
    <Delayed waitTimeMs={500}>{children}</Delayed>
  );
};
