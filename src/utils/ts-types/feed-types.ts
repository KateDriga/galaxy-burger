export enum FeedTypesEnum {
  ALL = 'feedAll',
  PROFILE = 'feedProfile',
}

export interface IFeedStatus {
  isConnecting: boolean;
  isConnected: boolean;
  hasError: boolean;
  messageReceived: boolean;
}
