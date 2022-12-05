import { createAction } from '@reduxjs/toolkit';
import { IShouldConnect, IWSActions } from '../../utils/ts-types/ws-types';
import {
  onClearReconnectAttemptsFeed,
  onIncrementReconnectAttemptsFeed,
  onWsCloseFeed,
  onWsConnectingFeed,
  onWsErrorFeed,
  onWsMessageReceiveFeed,
  onWsOpenFeed,
} from '../slices/feed';

const WS_START_FEED = 'feed/onConnectionStartFeed';
const WS_CLOSING_FEED = 'feed/onConnectionClosingFeed';
const WS_SEND_MESSAGE_FEED = 'feed/onConnectionSendMessageFeed';

export const onWsShouldConnectFeed = createAction<
  IShouldConnect,
  typeof WS_START_FEED
>(WS_START_FEED);
export const onWsShouldCloseFeed = createAction(WS_CLOSING_FEED);
export const onWsMessageSendFeed = createAction<string>(WS_SEND_MESSAGE_FEED);

export const wsFeedActions: IWSActions = {
  onShouldConnect: onWsShouldConnectFeed,
  onShouldClose: onWsShouldCloseFeed,
  onConnecting: onWsConnectingFeed,
  onOpen: onWsOpenFeed,
  onError: onWsErrorFeed,
  onClose: onWsCloseFeed,
  onMessageReceive: onWsMessageReceiveFeed,
  onMessageSend: onWsMessageSendFeed,
  onIncrementReconnectAttempts: onIncrementReconnectAttemptsFeed,
  onClearReconnectAttempts: onClearReconnectAttemptsFeed,
};
