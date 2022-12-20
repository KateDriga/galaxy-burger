import { IOrder, IOrdersObj } from '../../utils/ts-types/order-types';
import { IFeedData, IFeedOrdersTotal } from '../../utils/ts-types/api-types';
import { FeedTypesEnum, IFeedStatus } from '../../utils/ts-types/feed-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateObjFromArray } from '../../utils/util-functions';
import { WSStatusEnum } from '../../utils/ts-types/ws-types';

export type TFeedOrders = {
  [key in FeedTypesEnum]: {
    state: IFeedStatus;
    orders: IOrdersObj | null;
    aggregate?: IFeedOrdersTotal | null;
  };
};

const initialStatus: IFeedStatus = {
  wsStatus: WSStatusEnum.OFFLINE,
  hasError: false,
  messageReceived: false,
  reconnectAttempts: 0,
};

export const initialState: TFeedOrders = {
  [FeedTypesEnum.ALL]: { state: initialStatus, orders: null, aggregate: null },
  [FeedTypesEnum.PROFILE]: { state: initialStatus, orders: null },
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    // feed
    onWsConnectingFeed: state => {
      state[FeedTypesEnum.ALL].state.wsStatus = WSStatusEnum.CONNECTING;
      state[FeedTypesEnum.ALL].state.messageReceived = false;
    },
    onWsOpenFeed: state => {
      state[FeedTypesEnum.ALL].state.wsStatus = WSStatusEnum.ONLINE;
      state[FeedTypesEnum.ALL].state.hasError = false;
    },
    onWsErrorFeed: state => {
      state[FeedTypesEnum.ALL].state.hasError = true;
    },
    onWsCloseFeed: state => {
      state[FeedTypesEnum.ALL].state.wsStatus = WSStatusEnum.OFFLINE;
      state[FeedTypesEnum.ALL].state.messageReceived = false;
    },
    onWsMessageReceiveFeed: (
      state,
      action: PayloadAction<IFeedData | null>
    ) => {
      state[FeedTypesEnum.ALL].state.messageReceived = true;
      if (action.payload) {
        state[FeedTypesEnum.ALL].orders = generateObjFromArray<IOrder>(
          action.payload.orders
        );
        state[FeedTypesEnum.ALL].aggregate = {
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        };
        state[FeedTypesEnum.ALL].state.hasError = false;
        state[FeedTypesEnum.ALL].state.reconnectAttempts = 0;
      }
    },
    onIncrementReconnectAttemptsFeed: state => {
      state[FeedTypesEnum.ALL].state.reconnectAttempts++;
    },
    onClearReconnectAttemptsFeed: state => {
      state[FeedTypesEnum.ALL].state.reconnectAttempts = 0;
    },
    // profile feed
    onWsConnectingProfileFeed: state => {
      state[FeedTypesEnum.PROFILE].state.wsStatus = WSStatusEnum.CONNECTING;
      state[FeedTypesEnum.PROFILE].state.messageReceived = false;
    },
    onWsOpenProfileFeed: state => {
      state[FeedTypesEnum.PROFILE].state.wsStatus = WSStatusEnum.ONLINE;
      state[FeedTypesEnum.PROFILE].state.hasError = false;
    },
    onWsErrorProfileFeed: state => {
      state[FeedTypesEnum.PROFILE].state.hasError = true;
    },
    onWsCloseProfileFeed: state => {
      state[FeedTypesEnum.PROFILE].state.wsStatus = WSStatusEnum.OFFLINE;
      state[FeedTypesEnum.PROFILE].state.messageReceived = false;
    },
    onWsMessageReceiveProfileFeed: (
      state,
      action: PayloadAction<IFeedData | null>
    ) => {
      state[FeedTypesEnum.PROFILE].state.messageReceived = true;
      if (action.payload) {
        state[FeedTypesEnum.PROFILE].orders = generateObjFromArray<IOrder>(
          action.payload.orders
        );
        state[FeedTypesEnum.PROFILE].state.hasError = false;
        state[FeedTypesEnum.PROFILE].state.reconnectAttempts = 0;
      }
    },
    onIncrementReconnectAttemptsProfileFeed: state => {
      state[FeedTypesEnum.PROFILE].state.reconnectAttempts++;
    },
    onClearReconnectAttemptsProfileFeed: state => {
      state[FeedTypesEnum.PROFILE].state.reconnectAttempts = 0;
    },
  },
});

export const {
  onWsConnectingFeed,
  onWsOpenFeed,
  onWsErrorFeed,
  onWsCloseFeed,
  onWsMessageReceiveFeed,
  onIncrementReconnectAttemptsFeed,
  onClearReconnectAttemptsFeed,
  onWsConnectingProfileFeed,
  onWsOpenProfileFeed,
  onWsErrorProfileFeed,
  onWsCloseProfileFeed,
  onWsMessageReceiveProfileFeed,
  onIncrementReconnectAttemptsProfileFeed,
  onClearReconnectAttemptsProfileFeed,
} = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
