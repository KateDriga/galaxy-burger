import { WSStatusEnum } from './ws-types';

export enum FeedTypesEnum {
  ALL = 'feedAll',
  PROFILE = 'feedProfile',
}

export interface IFeedStatus {
  wsStatus: WSStatusEnum;
  hasError: boolean;
  messageReceived: boolean;
  reconnectAttempts: number;
}
