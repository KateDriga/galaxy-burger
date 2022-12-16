import { store } from '../../store';
import {
  addIngredient,
  changeIngredientsOrder,
  constructorReducer,
  removeIngredient,
} from '../constructor';
import { IngredientTypesEnum } from '../../../utils/ts-types/ingredient-types';
import { onNewOrder } from '../../thunks/order';

describe('Constructor redux slice test', () => {
  it('should return initial state without any ingredients', () => {
    const state = store.getState().burgerConstructor;
    expect(state).toEqual(TEST_DEFAULT_CONSTRUCTOR_STATE);
  });
  it('should handle add bun ingredient', () => {
    const testBunIngredientId = 'testBunIngredientId';
    const reducer = constructorReducer(TEST_DEFAULT_CONSTRUCTOR_STATE, {
      type: addIngredient,
      payload: {
        ingredientId: testBunIngredientId,
        type: IngredientTypesEnum.BUN,
      },
    });
    const expectedState = {
      bunIngredientId: { ingredientId: testBunIngredientId },
      middleIngredientIds: null,
    };
    expect(reducer).toEqual(expectedState);
  });
  it('should handle add middle ingredient', () => {
    const testMiddleIngredientId = 'testMiddleIngredientId';
    const reducer = constructorReducer(TEST_DEFAULT_CONSTRUCTOR_STATE, {
      type: addIngredient,
      payload: {
        ingredientId: testMiddleIngredientId,
        type: IngredientTypesEnum.MAIN,
      },
    });
    const expectedState = {
      bunIngredientId: null,
      middleIngredientIds: [{ ingredientId: testMiddleIngredientId }],
    };
    expect(reducer).toEqual(expectedState);
  });
  it('should handle remove ingredient', () => {
    const reducer = constructorReducer(TEST_CONSTRUCTOR_STATE, {
      type: removeIngredient,
      payload: 1,
    });
    const expectedState = {
      bunIngredientId: null,
      middleIngredientIds: [
        {
          ingredientId: 'testMiddleIngredientId1',
          constructorId: 'testConstructorId1',
        },
        {
          ingredientId: 'testMiddleIngredientId3',
          constructorId: 'testConstructorId3',
        },
      ],
    };
    expect(reducer).toEqual(expectedState);
  });
  it('should handle change ingredient order', () => {
    const reducer = constructorReducer(TEST_CONSTRUCTOR_STATE, {
      type: changeIngredientsOrder,
      payload: { oldIndex: 2, newIndex: 1 },
    });
    const expectedState = {
      bunIngredientId: null,
      middleIngredientIds: [
        {
          ingredientId: 'testMiddleIngredientId1',
          constructorId: 'testConstructorId1',
        },
        {
          ingredientId: 'testMiddleIngredientId3',
          constructorId: 'testConstructorId3',
        },
        {
          ingredientId: 'testMiddleIngredientId2',
          constructorId: 'testConstructorId2',
        },
      ],
    };
    expect(reducer).toEqual(expectedState);
  });
  it('should reset state on new order fulfilled', () => {
    const reducer = constructorReducer(TEST_CONSTRUCTOR_STATE, {
      type: onNewOrder.fulfilled,
    });
    expect(reducer).toEqual(TEST_DEFAULT_CONSTRUCTOR_STATE);
  });
  it('should keep state on new order rejected', () => {
    const reducer = constructorReducer(TEST_CONSTRUCTOR_STATE, {
      type: onNewOrder.rejected,
    });
    expect(reducer).toEqual(TEST_CONSTRUCTOR_STATE);
  });
});

const TEST_DEFAULT_CONSTRUCTOR_STATE = {
  bunIngredientId: null,
  middleIngredientIds: null,
};

export const TEST_CONSTRUCTOR_STATE = {
  bunIngredientId: null,
  middleIngredientIds: [
    {
      ingredientId: 'testMiddleIngredientId1',
      constructorId: 'testConstructorId1',
    },
    {
      ingredientId: 'testMiddleIngredientId2',
      constructorId: 'testConstructorId2',
    },
    {
      ingredientId: 'testMiddleIngredientId3',
      constructorId: 'testConstructorId3',
    },
  ],
};
