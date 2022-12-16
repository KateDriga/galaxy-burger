import { WSStatusEnum } from '../../../utils/ts-types/ws-types';
import { store } from '../../store';
import { FeedTypesEnum } from '../../../utils/ts-types/feed-types';
import {
  feedReducer,
  onClearReconnectAttemptsFeed,
  onClearReconnectAttemptsProfileFeed,
  onIncrementReconnectAttemptsFeed,
  onIncrementReconnectAttemptsProfileFeed,
  onWsCloseFeed,
  onWsCloseProfileFeed,
  onWsConnectingFeed,
  onWsConnectingProfileFeed,
  onWsErrorFeed,
  onWsErrorProfileFeed,
  onWsMessageReceiveFeed,
  onWsMessageReceiveProfileFeed,
  onWsOpenFeed,
  onWsOpenProfileFeed,
} from '../feed';
import { generateObjFromArray } from '../../../utils/util-functions';

describe('Feed redux slice test', () => {
  it('should return initial state without feed data', () => {
    const state = store.getState().feed;
    expect(state).toEqual(TEST_DEFAULT_FEED_STATE);
  });

  // feed
  it('should set connecting state (feed)', () => {
    const reducer = feedReducer(TEST_DEFAULT_FEED_STATE, {
      type: onWsConnectingFeed,
    });
    expect(reducer.feedAll.state).toEqual({
      ...TEST_DEFAULT_FEED_STATUS,
      wsStatus: WSStatusEnum.CONNECTING,
    });
  });
  it('should set open state (feed)', () => {
    const reducer = feedReducer(TEST_DEFAULT_FEED_STATE, {
      type: onWsOpenFeed,
    });
    expect(reducer.feedAll.state).toEqual({
      ...TEST_DEFAULT_FEED_STATUS,
      wsStatus: WSStatusEnum.ONLINE,
    });
  });
  it('should set error (feed)', () => {
    const reducer = feedReducer(TEST_DEFAULT_FEED_STATE, {
      type: onWsErrorFeed,
    });
    expect(reducer.feedAll.state).toEqual({
      ...TEST_DEFAULT_FEED_STATUS,
      hasError: true,
    });
  });
  it('should set offline state (feed)', () => {
    const reducer = feedReducer(TEST_DEFAULT_FEED_STATE, {
      type: onWsCloseFeed,
    });
    expect(reducer.feedAll.state).toEqual({
      ...TEST_DEFAULT_FEED_STATUS,
      wsStatus: WSStatusEnum.OFFLINE,
    });
  });
  it('should set feed data on message received (feed)', () => {
    const reducer = feedReducer(
      {
        ...TEST_DEFAULT_FEED_STATE,
        feedAll: {
          ...TEST_DEFAULT_FEED_STATE[FeedTypesEnum.ALL],
          state: TEST_FEED_STATUS,
        },
      },
      {
        type: onWsMessageReceiveFeed,
        payload: TEST_FEED_DATA,
      }
    );
    const expectedOrders = generateObjFromArray(TEST_FEED_DATA.orders);
    const expectedStatus = {
      ...TEST_DEFAULT_FEED_STATUS,
      messageReceived: true,
      wsStatus: WSStatusEnum.ONLINE,
    };
    const expectedAggregate = {
      total: TEST_FEED_DATA.total,
      totalToday: TEST_FEED_DATA.totalToday,
    };

    expect(reducer.feedAll.orders).toEqual(expectedOrders);
    expect(reducer.feedAll.state).toEqual(expectedStatus);
    expect(reducer.feedAll.aggregate).toEqual(expectedAggregate);
  });
  it('should increment reconnect attempts (feed)', () => {
    const reducer = feedReducer(TEST_DEFAULT_FEED_STATE, {
      type: onIncrementReconnectAttemptsFeed,
    });
    expect(reducer.feedAll.state.reconnectAttempts).toEqual(
      TEST_DEFAULT_FEED_STATE[FeedTypesEnum.ALL].state.reconnectAttempts + 1
    );
  });
  it('should clear reconnect attempts (feed)', () => {
    const reducer = feedReducer(
      {
        ...TEST_DEFAULT_FEED_STATE,
        feedAll: {
          ...TEST_DEFAULT_FEED_STATE[FeedTypesEnum.ALL],
          state: TEST_FEED_STATUS,
        },
      },
      {
        type: onClearReconnectAttemptsFeed,
      }
    );
    expect(reducer.feedAll.state.reconnectAttempts).toEqual(0);
  });

  // profile feed
  it('should set connecting state (profile feed)', () => {
    const reducer = feedReducer(TEST_DEFAULT_FEED_STATE, {
      type: onWsConnectingProfileFeed,
    });
    expect(reducer.feedProfile.state).toEqual({
      ...TEST_DEFAULT_FEED_STATUS,
      wsStatus: WSStatusEnum.CONNECTING,
    });
  });
  it('should set open state (profile feed)', () => {
    const reducer = feedReducer(TEST_DEFAULT_FEED_STATE, {
      type: onWsOpenProfileFeed,
    });
    expect(reducer.feedProfile.state).toEqual({
      ...TEST_DEFAULT_FEED_STATUS,
      wsStatus: WSStatusEnum.ONLINE,
    });
  });
  it('should set error (profile feed)', () => {
    const reducer = feedReducer(TEST_DEFAULT_FEED_STATE, {
      type: onWsErrorProfileFeed,
    });
    expect(reducer.feedProfile.state).toEqual({
      ...TEST_DEFAULT_FEED_STATUS,
      hasError: true,
    });
  });
  it('should set offline state (profile feed)', () => {
    const reducer = feedReducer(TEST_DEFAULT_FEED_STATE, {
      type: onWsCloseProfileFeed,
    });
    expect(reducer.feedProfile.state).toEqual({
      ...TEST_DEFAULT_FEED_STATUS,
      wsStatus: WSStatusEnum.OFFLINE,
    });
  });
  it('should set feed data on message received (profile feed)', () => {
    const reducer = feedReducer(
      {
        ...TEST_DEFAULT_FEED_STATE,
        [FeedTypesEnum.PROFILE]: {
          ...TEST_DEFAULT_FEED_STATE[FeedTypesEnum.PROFILE],
          state: TEST_FEED_STATUS,
        },
      },
      {
        type: onWsMessageReceiveProfileFeed,
        payload: TEST_FEED_DATA,
      }
    );
    const expectedOrders = generateObjFromArray(TEST_FEED_DATA.orders);
    const expectedStatus = {
      ...TEST_DEFAULT_FEED_STATUS,
      messageReceived: true,
      wsStatus: WSStatusEnum.ONLINE,
    };

    expect(reducer.feedProfile.orders).toEqual(expectedOrders);
    expect(reducer.feedProfile.state).toEqual(expectedStatus);
  });
  it('should increment reconnect attempts (profile feed)', () => {
    const reducer = feedReducer(TEST_DEFAULT_FEED_STATE, {
      type: onIncrementReconnectAttemptsProfileFeed,
    });
    expect(reducer.feedProfile.state.reconnectAttempts).toEqual(
      TEST_DEFAULT_FEED_STATE[FeedTypesEnum.PROFILE].state.reconnectAttempts + 1
    );
  });
  it('should clear reconnect attempts (profile feed)', () => {
    const reducer = feedReducer(
      {
        ...TEST_DEFAULT_FEED_STATE,
        [FeedTypesEnum.PROFILE]: {
          ...TEST_DEFAULT_FEED_STATE[FeedTypesEnum.PROFILE],
          state: TEST_FEED_STATUS,
        },
      },
      {
        type: onClearReconnectAttemptsProfileFeed,
      }
    );
    expect(reducer.feedProfile.state.reconnectAttempts).toEqual(0);
  });
});

const TEST_DEFAULT_FEED_STATUS = {
  wsStatus: WSStatusEnum.OFFLINE,
  hasError: false,
  messageReceived: false,
  reconnectAttempts: 0,
};

const TEST_FEED_STATUS = {
  ...TEST_DEFAULT_FEED_STATUS,
  wsStatus: WSStatusEnum.ONLINE,
  reconnectAttempts: 3,
};

const TEST_DEFAULT_FEED_STATE = {
  [FeedTypesEnum.ALL]: {
    state: TEST_DEFAULT_FEED_STATUS,
    orders: null,
    aggregate: null,
  },
  [FeedTypesEnum.PROFILE]: { state: TEST_DEFAULT_FEED_STATUS, orders: null },
};

const TEST_FEED_DATA = {
  success: true,
  orders: [
    {
      _id: '639c451c99a25c001cd69d62',
      ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cd'],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2022-12-16T10:14:52.597Z',
      updatedAt: '2022-12-16T10:14:52.987Z',
      number: 34149,
    },
    {
      _id: '639c449d99a25c001cd69d5c',
      ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c6'],
      status: 'done',
      name: 'Краторный бургер',
      createdAt: '2022-12-16T10:12:45.393Z',
      updatedAt: '2022-12-16T10:12:45.777Z',
      number: 34148,
    },
    {
      _id: '639c438499a25c001cd69d50',
      ingredients: [
        '60d3b41abdacab0026a733cd',
        '60d3b41abdacab0026a733c7',
        '60d3b41abdacab0026a733c7',
      ],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2022-12-16T10:08:04.535Z',
      updatedAt: '2022-12-16T10:08:04.939Z',
      number: 34147,
    },
    {
      _id: '639b898599a25c001cd69ae5',
      ingredients: [
        '60d3b41abdacab0026a733cb',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733cf',
        '60d3b41abdacab0026a733cd',
        '60d3b41abdacab0026a733c7',
      ],
      status: 'done',
      name: 'Флюоресцентный space антарианский био-марсианский традиционный-галактический бургер',
      createdAt: '2022-12-15T20:54:29.885Z',
      updatedAt: '2022-12-15T20:54:30.292Z',
      number: 34104,
    },
    {
      _id: '639b7f7599a25c001cd69aba',
      ingredients: [
        '60d3b41abdacab0026a733c8',
        '60d3b41abdacab0026a733cf',
        '60d3b41abdacab0026a733cd',
        '60d3b41abdacab0026a733c7',
      ],
      status: 'done',
      name: 'Space люминесцентный флюоресцентный антарианский бургер',
      createdAt: '2022-12-15T20:11:33.749Z',
      updatedAt: '2022-12-15T20:11:34.178Z',
      number: 34102,
    },
    {
      _id: '639b7f4c99a25c001cd69ab9',
      ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733cc'],
      status: 'done',
      name: 'Spicy краторный бургер',
      createdAt: '2022-12-15T20:10:52.719Z',
      updatedAt: '2022-12-15T20:10:53.118Z',
      number: 34101,
    },
  ],
  total: 34058,
  totalToday: 88,
};
