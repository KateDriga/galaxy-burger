import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import { IFeedData } from './api-types';

export enum WSStatusEnum {
  CONNECTING = 'connecting',
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export interface IShouldConnect {
  url: string;
  withAuth: boolean;
}

export interface IWSActions {
  onShouldConnect: ActionCreatorWithPayload<IShouldConnect>;
  onShouldClose: ActionCreatorWithoutPayload;
  onConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onMessageReceive: ActionCreatorWithPayload<IFeedData | null>;
  onMessageSend: ActionCreatorWithPayload<any>;
  onIncrementReconnectAttempts: ActionCreatorWithoutPayload;
  onClearReconnectAttempts: ActionCreatorWithoutPayload;
}
