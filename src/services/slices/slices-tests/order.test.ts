import { store } from '../../store';
import { closeOrderModal, initialState, orderReducer } from '../order';
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
    expect(state).toEqual(initialState);
  });
  it('should set showModal to false', () => {
    const orderNumber = 3518;
    const reducer = orderReducer(
      { ...initialState, orderNumber, showModal: true },
      {
        type: closeOrderModal,
      }
    );
    expect(reducer).toEqual({ ...initialState, orderNumber });
  });
  it('should set order number and show modal on fulfilled', () => {
    const reducer = orderReducer(
      { ...initialState, isLoading: true },
      {
        type: onNewOrder.fulfilled,
        payload: TEST_ORDER_DATA_RESPONSE.order,
      }
    );
    expect(reducer).toEqual({
      ...initialState,
      orderNumber: TEST_ORDER_DATA_RESPONSE.order.number,
      showModal: true,
    });
  });
  it('should reset order number, error and set is loading on pending', () => {
    const reducer = orderReducer(
      { ...initialState, orderNumber: 2555, isFailed: true },
      {
        type: onNewOrder.pending,
      }
    );
    expect(reducer).toEqual({ ...initialState, isLoading: true });
  });
  it('should reset state and set is failed on rejected', () => {
    const reducer = orderReducer(
      { ...initialState, isLoading: true },
      {
        type: onNewOrder.rejected,
      }
    );
    expect(reducer).toEqual({
      ...initialState,
      isFailed: true,
      showModal: true,
    });
  });
  it('should fire pending and fulfilled actions', async () => {
    const mockedOrderStore = mockStore({
      order: initialState,
      burgerConstructor: TEST_CONSTRUCTOR_STATE,
    });
    mock
      .onPost(`${BASE_URL}${AppUrlsEnum.ORDERS}`)
      .reply(200, TEST_ORDER_DATA_RESPONSE);
    const expectedActions = [
      { type: onNewOrder.pending.type, payload: undefined },
      {
        type: onNewOrder.fulfilled.type,
        payload: TEST_ORDER_DATA_RESPONSE.order,
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
      order: initialState,
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

const TEST_ORDER_DATA_RESPONSE = {
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
