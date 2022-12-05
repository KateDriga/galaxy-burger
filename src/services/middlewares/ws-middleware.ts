import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../store';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  IFeedData,
  isWsMessage,
  IWSMessage,
} from '../../utils/ts-types/api-types';
import { IWSActions } from '../../utils/ts-types/ws-types';
import { onTokenRefresh } from '../thunks/user-admission';
import { getAccessToken } from '../../utils/api/make-request';

export const wsMiddleware = (
  wsActions: IWSActions
): Middleware<{}, RootState> => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let shouldRefreshToken: boolean = false;
    let tokenRefreshed: boolean = false;
    let url: string = '';
    let withAuth: boolean = false;
    let isConnected: boolean = false;
    let reconnectTimer: number = 0;

    return next => async (action: PayloadAction) => {
      const { dispatch } = store;

      if (wsActions.onShouldConnect.match(action)) {
        socket?.close(1000);
        url = action.payload.url;
        withAuth = action.payload.withAuth;
        isConnected = true;
        dispatch(wsActions.onConnecting());
        socket = new WebSocket(
          withAuth ? `${url}?token=${getAccessToken()}` : url
        );
      }

      if (wsActions.onShouldClose.match(action)) {
        shouldRefreshToken = false;
        tokenRefreshed = false;
        isConnected = false;
        clearTimeout(reconnectTimer);
        reconnectTimer = 0;
        socket?.close(1000);
        dispatch(wsActions.onClose());
        dispatch(wsActions.onClearReconnectAttempts());
      }

      if (socket) {
        socket.onopen = () => {
          clearTimeout(reconnectTimer);
          dispatch(wsActions.onOpen());
        };

        socket.onerror = (err: Event) => {
          console.error('Web Socket connection error:', err);
          dispatch(wsActions.onError());
        };

        socket.onmessage = (event: MessageEvent) => {
          try {
            const data: IWSMessage | IFeedData = JSON.parse(event.data);
            if (data.success) {
              shouldRefreshToken = false;
              tokenRefreshed = false;
              dispatch(wsActions.onMessageReceive(data as IFeedData));
            } else if (
              isWsMessage(data) &&
              !tokenRefreshed &&
              data.message === 'Invalid or missing token'
            ) {
              shouldRefreshToken = true;
            } else {
              dispatch(wsActions.onError());
              dispatch(wsActions.onMessageReceive(null));
            }
          } catch (err: any) {
            console.error('Error parsing feed data:', err);
            dispatch(wsActions.onError());
            dispatch(wsActions.onMessageReceive(null));
          }
        };

        socket.onclose = async (event: CloseEvent) => {
          if (event.code !== 1000) {
            console.error(`Connection closed, error code ${event.code}`);
            dispatch(wsActions.onError());
          }
          if (isConnected) {
            dispatch(wsActions.onConnecting());
            if (shouldRefreshToken && !tokenRefreshed) {
              tokenRefreshed = true;
              await dispatch(onTokenRefresh());
            }
            reconnectTimer = window.setTimeout(() => {
              if (isConnected) {
                dispatch(wsActions.onIncrementReconnectAttempts());
                dispatch(wsActions.onShouldConnect({ url, withAuth }));
              }
            }, 3000);
          } else {
            dispatch(wsActions.onShouldClose());
          }
        };

        if (wsActions.onMessageSend.match(action)) {
          try {
            await waitForWsOpenWithCallback(socket, () =>
              socket!.send(JSON.stringify(action.payload))
            );
          } catch (err: any) {
            dispatch(wsActions.onError());
            console.error('Message was not sent:', err);
          }
        }
      }

      next(action);
    };
  }) as Middleware;
};

function waitForWsOpenWithCallback(socket: WebSocket, callback: () => void) {
  return new Promise<void>((resolve, reject) => {
    const intervalTime = 50;
    const maxNumberOfAttempts = 50;
    let attempts = 0;
    const interval = window.setInterval(() => {
      attempts++;
      if (socket.readyState === WebSocket.OPEN) {
        clearInterval(interval);
        callback();
        resolve();
      }
      if (
        socket.readyState === WebSocket.CLOSING ||
        socket.readyState === WebSocket.CLOSED
      ) {
        clearInterval(interval);
        reject(new Error('Web socket connection is closed'));
      }
      if (attempts > maxNumberOfAttempts) {
        clearInterval(interval);
        reject(new Error('Unable to open web socket connection'));
      }
    }, intervalTime);
  });
}
