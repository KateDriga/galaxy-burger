import { IOrder, IOrdersObj } from '../../utils/ts-types/order-types';
import { IFeedData, IFeedOrdersTotal } from '../../utils/ts-types/api-types';
import { FeedTypesEnum, IFeedStatus } from '../../utils/ts-types/feed-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TFeedOrders = {
  [key in FeedTypesEnum]: {
    state: IFeedStatus;
    orders: IOrdersObj | null;
    aggregate?: IFeedOrdersTotal | null;
  };
};

const initialStatus: IFeedStatus = {
  isConnecting: false,
  isConnected: false,
  hasError: false,
  messageReceived: false,
};

const initialState: TFeedOrders = {
  [FeedTypesEnum.ALL]: { state: initialStatus, orders: null, aggregate: null },
  [FeedTypesEnum.PROFILE]: { state: initialStatus, orders: null },
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    // feed
    onConnectionStartFeed: state => {
      state[FeedTypesEnum.ALL].state.isConnecting = true;
      state[FeedTypesEnum.ALL].state.isConnected = false;
      state[FeedTypesEnum.ALL].state.hasError = false;
    },
    onConnectionSuccessFeed: state => {
      state[FeedTypesEnum.ALL].state.isConnected = true;
      state[FeedTypesEnum.ALL].state.isConnecting = false;
      state[FeedTypesEnum.ALL].state.hasError = false;
    },
    onConnectionErrorFeed: state => {
      state[FeedTypesEnum.ALL].state.isConnected = false;
      state[FeedTypesEnum.ALL].state.isConnecting = false;
      state[FeedTypesEnum.ALL].state.hasError = true;
    },
    onConnectionCloseFeed: state => {
      state[FeedTypesEnum.ALL].state = initialStatus;
    },
    onMessageReceiveFeed: (state, action: PayloadAction<IFeedData>) => {
      const orders: IOrdersObj = action.payload.orders.reduce(
        (acc: Record<string, IOrder>, order: IOrder) => ({
          ...acc,
          [order._id]: order,
        }),
        {}
      );
      state[FeedTypesEnum.ALL].orders = orders;
      state[FeedTypesEnum.ALL].aggregate = {
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
      state[FeedTypesEnum.ALL].state.messageReceived = true;
    },
    // profile feed
    onConnectionStartProfileFeed: state => {
      state[FeedTypesEnum.PROFILE].state.isConnecting = true;
      state[FeedTypesEnum.PROFILE].state.isConnected = false;
      state[FeedTypesEnum.PROFILE].state.hasError = false;
    },
    onConnectionSuccessProfileFeed: state => {
      state[FeedTypesEnum.PROFILE].state.isConnected = true;
      state[FeedTypesEnum.PROFILE].state.isConnecting = false;
      state[FeedTypesEnum.PROFILE].state.hasError = false;
    },
    onConnectionErrorProfileFeed: state => {
      state[FeedTypesEnum.PROFILE].state.isConnected = false;
      state[FeedTypesEnum.PROFILE].state.isConnecting = false;
      state[FeedTypesEnum.PROFILE].state.hasError = true;
    },
    onConnectionCloseProfileFeed: state => {
      state[FeedTypesEnum.PROFILE].state = initialStatus;
    },
    onMessageReceiveProfileFeed: (state, action: PayloadAction<IOrdersObj>) => {
      state[FeedTypesEnum.PROFILE].orders = action.payload;
    },
  },
});

export const {
  onConnectionStartFeed,
  onConnectionSuccessFeed,
  onConnectionErrorFeed,
  onConnectionCloseFeed,
  onMessageReceiveFeed,
  onConnectionStartProfileFeed,
  onConnectionSuccessProfileFeed,
  onConnectionErrorProfileFeed,
  onConnectionCloseProfileFeed,
  onMessageReceiveProfileFeed,
} = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
