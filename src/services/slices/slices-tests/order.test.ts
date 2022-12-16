import { store } from '../../store';
import { closeOrderModal, orderReducer } from '../order';
import { onNewOrder } from '../../thunks/order';
import { mockStore } from './mock-store-config';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../../utils/api/make-request';
import { TEST_CONSTRUCTOR_STATE } from './constructor.test';
import { BASE_URL } from '../../../utils/const-variables/app-variables';
import { AppUrlsEnum } from '../../../utils/ts-types/api-types';

describe('Order redux slice test', () => {
  let mock: MockAdapter;
  beforeAll(() => (mock = new MockAdapter(axiosInstance)));
  afterAll(() => mock.reset());

  it('should return initial state without order data', () => {
    const state = store.getState().order;
    expect(state).toEqual(TEST_DEFAULT_ORDER_STATE);
  });
  it('should set showModal to false', () => {
    const reducer = orderReducer(TEST_ORDER_STATE, {
      type: closeOrderModal,
    });
    expect(reducer.showModal).toEqual(false);
  });
  it('should set order number and show modal on fulfilled', () => {
    const initialState = {
      orderNumber: null,
      isLoading: true,
      isFailed: false,
      showModal: false,
    };
    const reducer = orderReducer(initialState, {
      type: onNewOrder.fulfilled,
      payload: TEST_ORDER_RESPONSE_DATA.order,
    });
    const expectedState = {
      orderNumber: TEST_ORDER_RESPONSE_DATA.order.number,
      isLoading: false,
      isFailed: false,
      showModal: true,
    };

    expect(reducer).toEqual(expectedState);
  });
  it('should reset order number, error and set is loading on pending', () => {
    const initialState = {
      orderNumber: 8749,
      isLoading: false,
      isFailed: true,
      showModal: false,
    };
    const reducer = orderReducer(initialState, {
      type: onNewOrder.pending,
    });

    expect(reducer).toEqual(TEST_DEFAULT_ORDER_PENDING_STATE);
  });
  it('should reset state and set is failed on rejected', () => {
    const initialState = {
      orderNumber: null,
      isLoading: true,
      isFailed: false,
      showModal: false,
    };
    const reducer = orderReducer(initialState, {
      type: onNewOrder.rejected,
    });

    expect(reducer).toEqual(TEST_DEFAULT_ORDER_FAILED_STATE);
  });
  it('should fire pending and fulfilled actions', async () => {
    const mockedOrderStore = mockStore({
      order: TEST_DEFAULT_ORDER_STATE,
      burgerConstructor: TEST_CONSTRUCTOR_STATE,
    });
    mock
      .onPost(`${BASE_URL}${AppUrlsEnum.ORDERS}`)
      .reply(200, TEST_ORDER_RESPONSE_DATA);
    const expectedActions = [
      { type: onNewOrder.pending.type },
      {
        type: onNewOrder.fulfilled.type,
        payload: TEST_ORDER_RESPONSE_DATA.order,
      },
    ];

    await mockedOrderStore.dispatch(onNewOrder());
    const actions = mockedOrderStore.getActions();

    expect(actions[0].type).toEqual(expectedActions[0].type);
    expect(actions[0].payload).toEqual(expectedActions[0].payload);
    expect(actions[1].type).toEqual(expectedActions[1].type);
    expect(actions[1].payload).toEqual(expectedActions[1].payload);
  });
  it('should fire pending and rejected actions', async () => {
    const mockedOrderStore = mockStore({
      order: TEST_DEFAULT_ORDER_STATE,
      burgerConstructor: TEST_CONSTRUCTOR_STATE,
    });
    mock.onPost(`${BASE_URL}${AppUrlsEnum.ORDERS}`).reply(404);
    const expectedActions = [
      { type: onNewOrder.pending.type },
      { type: onNewOrder.rejected.type },
    ];

    await mockedOrderStore.dispatch(onNewOrder());
    const actions = mockedOrderStore.getActions();

    expect(actions[0].type).toEqual(expectedActions[0].type);
    expect(actions[1].type).toEqual(expectedActions[1].type);
  });
});

const TEST_DEFAULT_ORDER_STATE = {
  orderNumber: null,
  isLoading: false,
  isFailed: false,
  showModal: false,
};

const TEST_DEFAULT_ORDER_PENDING_STATE = {
  ...TEST_DEFAULT_ORDER_STATE,
  isLoading: true,
};

const TEST_DEFAULT_ORDER_FAILED_STATE = {
  ...TEST_DEFAULT_ORDER_STATE,
  isFailed: true,
  showModal: true,
};

const TEST_ORDER_STATE = {
  orderNumber: 3518,
  isLoading: false,
  isFailed: false,
  showModal: true,
};

const TEST_ORDER_RESPONSE_DATA = {
  success: true,
  name: 'Space люминесцентный краторный бургер',
  order: {
    ingredients: [
      {
        _id: '60d3b41abdacab0026a733c6',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
      },
      {
        _id: '60d3b41abdacab0026a733cd',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0,
      },
      {
        _id: '60d3b41abdacab0026a733c8',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0,
      },
      {
        _id: '60d3b41abdacab0026a733c6',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
      },
    ],
    _id: '639b138a99a25c001cd69997',
    owner: {
      name: 'Test Owner',
      email: 'test-owner@yandex.ru',
      createdAt: '2022-10-25T11:35:54.070Z',
      updatedAt: '2022-11-16T08:17:19.715Z',
    },
    status: 'done',
    name: 'Space люминесцентный краторный бургер',
    createdAt: '2022-12-15T12:31:06.257Z',
    updatedAt: '2022-12-15T12:31:06.715Z',
    number: 34072,
    price: 3578,
  },
};
