import { createAction } from '@reduxjs/toolkit';
import { IShouldConnect, IWSActions } from '../../utils/ts-types/ws-types';
import {
  onClearReconnectAttemptsProfileFeed,
  onIncrementReconnectAttemptsProfileFeed,
  onWsCloseProfileFeed,
  onWsConnectingProfileFeed,
  onWsErrorProfileFeed,
  onWsMessageReceiveProfileFeed,
  onWsOpenProfileFeed,
} from '../slices/feed';

const WS_START_PROFILE_FEED = 'feed/onConnectionStartProfileFeed';
const WS_CLOSING_PROFILE_FEED = 'feed/onConnectionClosingProfileFeed';
const WS_SEND_MESSAGE_PROFILE_FEED = 'feed/onConnectionSendMessageProfileFeed';

export const onWsShouldConnectProfileFeed = createAction<
  IShouldConnect,
  typeof WS_START_PROFILE_FEED
>(WS_START_PROFILE_FEED);
export const onWsShouldCloseProfileFeed = createAction(WS_CLOSING_PROFILE_FEED);
export const onWsMessageSendFeed = createAction<string>(
  WS_SEND_MESSAGE_PROFILE_FEED
);

export const wsFeedProfileActions: IWSActions = {
  onShouldConnect: onWsShouldConnectProfileFeed,
  onShouldClose: onWsShouldCloseProfileFeed,
  onConnecting: onWsConnectingProfileFeed,
  onOpen: onWsOpenProfileFeed,
  onError: onWsErrorProfileFeed,
  onClose: onWsCloseProfileFeed,
  onMessageReceive: onWsMessageReceiveProfileFeed,
  onMessageSend: onWsMessageSendFeed,
  onIncrementReconnectAttempts: onIncrementReconnectAttemptsProfileFeed,
  onClearReconnectAttempts: onClearReconnectAttemptsProfileFeed,
};
