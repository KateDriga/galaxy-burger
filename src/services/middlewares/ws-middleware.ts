import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../store';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  onConnectionCloseFeed,
  onConnectionCloseProfileFeed,
  onConnectionErrorFeed,
  onConnectionStartFeed,
  onConnectionStartProfileFeed,
  onConnectionSuccessFeed,
  onMessageReceiveFeed,
} from '../slices/feed';
import {
  WS_URL_ALL,
  WS_URL_PROFILE,
} from '../../utils/const-variables/app-variables';
import { IFeedData } from '../../utils/ts-types/api-types';

export const wsMiddleware = (): Middleware<{}, RootState> => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socketAll: WebSocket | null = null;
    // TODO: implement feed profile actions
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let socketProfile: WebSocket | null = null;

    return next => (action: PayloadAction) => {
      const { dispatch } = store;

      if (onConnectionStartFeed.match(action)) {
        socketAll = new WebSocket(WS_URL_ALL);
      }
      if (onConnectionStartProfileFeed.match(action)) {
        // TODO add access token
        socketProfile = new WebSocket(WS_URL_PROFILE);
      }
      if (onConnectionCloseFeed.match(action)) {
        if (socketAll?.readyState === 1) {
          socketAll.close(1000);
        }
      }
      if (onConnectionCloseProfileFeed.match(action)) {
        if (socketProfile?.readyState === 1) {
          socketProfile?.close(1000);
        }
      }

      if (socketAll) {
        socketAll.onopen = () => {
          dispatch(onConnectionSuccessFeed());
        };

        socketAll.onerror = () => {
          dispatch(onConnectionErrorFeed());
        };

        socketAll.onmessage = (event: MessageEvent) => {
          try {
            const { data }: { data: string } = event;
            const feedData: IFeedData = JSON.parse(data);
            feedData.success
              ? dispatch(onMessageReceiveFeed(feedData))
              : dispatch(onConnectionErrorFeed());
          } catch (err: any) {
            console.error('Error parsing feed data:', err);
            dispatch(onConnectionErrorFeed());
          }
        };

        socketAll.onclose = () => {
          dispatch(onConnectionCloseFeed());
        };
      }

      next(action);
    };
  }) as Middleware;
};
