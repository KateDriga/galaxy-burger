import { WSStatusEnum } from '../../../utils/ts-types/ws-types';
import { store } from '../../store';
import {
  feedReducer,
  initialState,
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
  TFeedOrders,
} from '../feed';
import { generateObjFromArray } from '../../../utils/util-functions';
import { OrderStatusEnum } from '../../../utils/ts-types/order-types';
import { IFeedData } from '../../../utils/ts-types/api-types';

describe('Feed redux slice test', () => {
  it('should return initial state without feed data', () => {
    const state = store.getState().feed;
    expect(state).toEqual(initialState);
  });

  // feed
  it('should set connecting state (feed)', () => {
    const reducer = feedReducer(initialState, {
      type: onWsConnectingFeed,
    });
    expect(reducer).toEqual({
      ...initialState,
      feedAll: {
        ...initialState.feedAll,
        state: {
          ...initialState.feedAll.state,
          wsStatus: WSStatusEnum.CONNECTING,
        },
      },
    });
  });
  it('should set open state (feed)', () => {
    const reducer = feedReducer(initialState, {
      type: onWsOpenFeed,
    });
    expect(reducer).toEqual({
      ...initialState,
      feedAll: {
        ...initialState.feedAll,
        state: {
          ...initialState.feedAll.state,
          wsStatus: WSStatusEnum.ONLINE,
        },
      },
    });
  });
  it('should set error (feed)', () => {
    const reducer = feedReducer(initialState, {
      type: onWsErrorFeed,
    });
    expect(reducer).toEqual({
      ...initialState,
      feedAll: {
        ...initialState.feedAll,
        state: {
          ...initialState.feedAll.state,
          hasError: true,
        },
      },
    });
  });
  it('should set offline state (feed)', () => {
    const reducer = feedReducer(initialState, {
      type: onWsCloseFeed,
    });
    expect(reducer).toEqual({
      ...initialState,
      feedAll: {
        ...initialState.feedAll,
        state: {
          ...initialState.feedAll.state,
          wsStatus: WSStatusEnum.OFFLINE,
        },
      },
    });
  });
  it('should set feed data on message received (feed)', () => {
    const testInitialState: TFeedOrders = {
      ...initialState,
      feedAll: {
        ...initialState.feedAll,
        state: {
          ...initialState.feedAll.state,
          wsStatus: WSStatusEnum.ONLINE,
          reconnectAttempts: 3,
        },
      },
    };
    const reducer = feedReducer(testInitialState, {
      type: onWsMessageReceiveFeed,
      payload: TEST_FEED_DATA_RESPONSE,
    });
    const expectedState: TFeedOrders = {
      ...testInitialState,
      feedAll: {
        state: {
          ...testInitialState.feedAll.state,
          messageReceived: true,
          reconnectAttempts: 0,
        },
        orders: generateObjFromArray(TEST_FEED_DATA_RESPONSE.orders),
        aggregate: {
          total: TEST_FEED_DATA_RESPONSE.total,
          totalToday: TEST_FEED_DATA_RESPONSE.totalToday,
        },
      },
    };
    expect(reducer).toEqual(expectedState);
  });
  it('should increment reconnect attempts (feed)', () => {
    const reducer = feedReducer(initialState, {
      type: onIncrementReconnectAttemptsFeed,
    });
    expect(reducer).toEqual({
      ...initialState,
      feedAll: {
        ...initialState.feedAll,
        state: {
          ...initialState.feedAll.state,
          reconnectAttempts: initialState.feedAll.state.reconnectAttempts + 1,
        },
      },
    });
  });
  it('should clear reconnect attempts (feed)', () => {
    const testInitialState: TFeedOrders = {
      ...initialState,
      feedAll: {
        ...initialState.feedAll,
        state: {
          ...initialState.feedAll.state,
          wsStatus: WSStatusEnum.ONLINE,
          reconnectAttempts: 1,
        },
      },
    };
    const reducer = feedReducer(testInitialState, {
      type: onClearReconnectAttemptsFeed,
    });
    expect(reducer).toEqual({
      ...testInitialState,
      feedAll: {
        ...testInitialState.feedAll,
        state: {
          ...testInitialState.feedAll.state,
          reconnectAttempts: 0,
        },
      },
    });
  });

  // profile feed
  it('should set connecting state (profile feed)', () => {
    const reducer = feedReducer(initialState, {
      type: onWsConnectingProfileFeed,
    });
    expect(reducer).toEqual({
      ...initialState,
      feedProfile: {
        ...initialState.feedProfile,
        state: {
          ...initialState.feedProfile.state,
          wsStatus: WSStatusEnum.CONNECTING,
        },
      },
    });
  });
  it('should set open state (profile feed)', () => {
    const reducer = feedReducer(initialState, {
      type: onWsOpenProfileFeed,
    });
    expect(reducer).toEqual({
      ...initialState,
      feedProfile: {
        ...initialState.feedProfile,
        state: {
          ...initialState.feedProfile.state,
          wsStatus: WSStatusEnum.ONLINE,
        },
      },
    });
  });
  it('should set error (profile feed)', () => {
    const reducer = feedReducer(initialState, {
      type: onWsErrorProfileFeed,
    });
    expect(reducer).toEqual({
      ...initialState,
      feedProfile: {
        ...initialState.feedProfile,
        state: {
          ...initialState.feedProfile.state,
          hasError: true,
        },
      },
    });
  });
  it('should set offline state (profile feed)', () => {
    const reducer = feedReducer(initialState, {
      type: onWsCloseProfileFeed,
    });
    expect(reducer).toEqual({
      ...initialState,
      feedProfile: {
        ...initialState.feedProfile,
        state: {
          ...initialState.feedProfile.state,
          wsStatus: WSStatusEnum.OFFLINE,
        },
      },
    });
  });
  it('should set feed data on message received (profile feed)', () => {
    const testInitialState: TFeedOrders = {
      ...initialState,
      feedProfile: {
        ...initialState.feedProfile,
        state: {
          ...initialState.feedProfile.state,
          wsStatus: WSStatusEnum.ONLINE,
          reconnectAttempts: 5,
        },
      },
    };
    const reducer = feedReducer(testInitialState, {
      type: onWsMessageReceiveProfileFeed,
      payload: TEST_FEED_DATA_RESPONSE,
    });
    const expectedState: TFeedOrders = {
      ...testInitialState,
      feedProfile: {
        state: {
          ...testInitialState.feedProfile.state,
          messageReceived: true,
          reconnectAttempts: 0,
        },
        orders: generateObjFromArray(TEST_FEED_DATA_RESPONSE.orders),
      },
    };
    expect(reducer).toEqual(expectedState);
  });
  it('should increment reconnect attempts (profile feed)', () => {
    const reducer = feedReducer(initialState, {
      type: onIncrementReconnectAttemptsProfileFeed,
    });
    expect(reducer).toEqual({
      ...initialState,
      feedProfile: {
        ...initialState.feedProfile,
        state: {
          ...initialState.feedProfile.state,
          reconnectAttempts:
            initialState.feedProfile.state.reconnectAttempts + 1,
        },
      },
    });
  });
  it('should clear reconnect attempts (profile feed)', () => {
    const testInitialState: TFeedOrders = {
      ...initialState,
      feedProfile: {
        ...initialState.feedProfile,
        state: {
          ...initialState.feedProfile.state,
          wsStatus: WSStatusEnum.ONLINE,
          reconnectAttempts: 2,
        },
      },
    };
    const reducer = feedReducer(testInitialState, {
      type: onClearReconnectAttemptsProfileFeed,
    });
    expect(reducer).toEqual({
      ...testInitialState,
      feedProfile: {
        ...testInitialState.feedProfile,
        state: {
          ...testInitialState.feedProfile.state,
          reconnectAttempts: 0,
        },
      },
    });
  });
});

const TEST_FEED_DATA_RESPONSE: IFeedData = {
  success: true,
  orders: [
    {
      _id: '639c451c99a25c001cd69d62',
      ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cd'],
      status: OrderStatusEnum.DONE,
      name: 'Space флюоресцентный бургер',
      createdAt: '2022-12-16T10:14:52.597Z',
      updatedAt: '2022-12-16T10:14:52.987Z',
      number: 34149,
    },
    {
      _id: '639c449d99a25c001cd69d5c',
      ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c6'],
      status: OrderStatusEnum.DONE,
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
      status: OrderStatusEnum.DONE,
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
      status: OrderStatusEnum.DONE,
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
      status: OrderStatusEnum.DONE,
      name: 'Space люминесцентный флюоресцентный антарианский бургер',
      createdAt: '2022-12-15T20:11:33.749Z',
      updatedAt: '2022-12-15T20:11:34.178Z',
      number: 34102,
    },
    {
      _id: '639b7f4c99a25c001cd69ab9',
      ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733cc'],
      status: OrderStatusEnum.DONE,
      name: 'Spicy краторный бургер',
      createdAt: '2022-12-15T20:10:52.719Z',
      updatedAt: '2022-12-15T20:10:53.118Z',
      number: 34101,
    },
  ],
  total: 34058,
  totalToday: 88,
};
