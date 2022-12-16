import { store } from '../../store';
import {
  addBurgerIngredients,
  failLoadingIngredients,
  ingredientsReducer,
  startLoadingIngredients,
} from '../ingredients';
import { generateObjFromArray } from '../../../utils/util-functions';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../../utils/api/make-request';
import { mockStore } from './mock-store-config';
import { loadIngredients } from '../../thunks/ingredients';
import { BASE_URL } from '../../../utils/const-variables/app-variables';
import { AppUrlsEnum } from '../../../utils/ts-types/api-types';

describe('Ingredients redux slice test', () => {
  let mock: MockAdapter;
  beforeAll(() => (mock = new MockAdapter(axiosInstance)));
  afterAll(() => mock.reset());

  it('should return initial state without ingredients', () => {
    const state = store.getState().ingredients;
    expect(state).toEqual(TEST_DEFAULT_INGREDIENTS_STATE);
  });
  it('should set loading state', () => {
    const reducer = ingredientsReducer(TEST_DEFAULT_INGREDIENTS_STATE, {
      type: startLoadingIngredients,
    });
    expect(reducer).toEqual({
      ...TEST_DEFAULT_INGREDIENTS_STATE,
      isLoading: true,
    });
  });
  it('should set failed state', () => {
    const reducer = ingredientsReducer(TEST_DEFAULT_INGREDIENTS_STATE, {
      type: failLoadingIngredients,
    });
    expect(reducer).toEqual({
      ...TEST_DEFAULT_INGREDIENTS_STATE,
      isFailed: true,
    });
  });
  it('should add burger ingredients', () => {
    const reducer = ingredientsReducer(TEST_DEFAULT_INGREDIENTS_STATE, {
      type: addBurgerIngredients,
      payload: generateObjFromArray(TEST_INGREDIENTS_RESPONSE.data),
    });
    expect(reducer.burgerIngredients).toEqual(
      generateObjFromArray(TEST_INGREDIENTS_RESPONSE.data)
    );
  });
  it('should fire loading and add ingredient actions', async () => {
    const mockedOrderStore = mockStore({
      ingredients: TEST_DEFAULT_INGREDIENTS_STATE,
    });
    mock
      .onGet(`${BASE_URL}${AppUrlsEnum.INGREDIENTS}`)
      .reply(200, TEST_INGREDIENTS_RESPONSE);
    const expectedActions = [
      { type: startLoadingIngredients.type },
      {
        type: addBurgerIngredients.type,
        payload: generateObjFromArray(TEST_INGREDIENTS_RESPONSE.data),
      },
    ];

    await mockedOrderStore.dispatch(loadIngredients());
    const actions = mockedOrderStore.getActions();

    expect(actions[0].type).toEqual(expectedActions[0].type);
    expect(actions[1].type).toEqual(expectedActions[1].type);
    expect(actions[1].payload).toEqual(expectedActions[1].payload);
  });
  it('should fire loading and fail loading actions', async () => {
    const mockedOrderStore = mockStore({
      ingredients: TEST_DEFAULT_INGREDIENTS_STATE,
    });
    mock.onGet(`${BASE_URL}${AppUrlsEnum.INGREDIENTS}`).reply(404);
    const expectedActions = [
      { type: startLoadingIngredients.type, payload: undefined },
      { type: failLoadingIngredients.type, payload: undefined },
    ];

    await mockedOrderStore.dispatch(loadIngredients());
    const actions = mockedOrderStore.getActions();

    expect(actions).toEqual(expectedActions);
  });
  it('should not fire any actions if ingredients were loaded', async () => {
    const mockedOrderStore = mockStore({
      ingredients: {
        ...TEST_DEFAULT_INGREDIENTS_STATE,
        burgerIngredients: generateObjFromArray(TEST_INGREDIENTS_RESPONSE.data),
      },
    });

    await mockedOrderStore.dispatch(loadIngredients());
    const actions = mockedOrderStore.getActions();

    expect(actions).toEqual([]);
  });
});

const TEST_DEFAULT_INGREDIENTS_STATE = {
  isLoading: false,
  isFailed: false,
  burgerIngredients: null,
};

const TEST_INGREDIENTS_RESPONSE = {
  success: true,
  data: [
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
      _id: '60d3b41abdacab0026a733c8',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0,
    },
    {
      _id: '60d3b41abdacab0026a733cc',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      __v: 0,
    },
  ],
};
