import { store } from '../../store';
import {
  addIngredient,
  changeIngredientsOrder,
  constructorReducer,
  IInitialState,
  initialState,
  removeIngredient,
} from '../constructor';
import {
  IConstructorId,
  IngredientTypesEnum,
} from '../../../utils/ts-types/ingredient-types';
import { onNewOrder } from '../../thunks/order';

describe('Constructor redux slice test', () => {
  it('should return initial state without any ingredients', () => {
    const state = store.getState().burgerConstructor;
    expect(state).toEqual(initialState);
  });
  it('should handle add bun ingredient', () => {
    const reducer = constructorReducer(initialState, {
      type: addIngredient,
      payload: {
        ingredientId: bunIngredient.ingredientId,
        type: IngredientTypesEnum.BUN,
      },
    });
    const expectedState = {
      ...initialState,
      bunIngredientId: { ingredientId: bunIngredient.ingredientId },
    };
    expect(reducer).toEqual(expectedState);
  });
  it('should handle add middle ingredient', () => {
    const reducer = constructorReducer(initialState, {
      type: addIngredient,
      payload: {
        ingredientId: middleIngredient1.ingredientId,
        type: IngredientTypesEnum.MAIN,
      },
    });
    const expectedState = {
      ...initialState,
      middleIngredientIds: [{ ingredientId: middleIngredient1.ingredientId }],
    };
    expect(reducer).toEqual(expectedState);
  });
  it('should handle remove ingredient', () => {
    const index = 1;
    const reducer = constructorReducer(TEST_CONSTRUCTOR_STATE, {
      type: removeIngredient,
      payload: index,
    });
    const expectedState = {
      ...TEST_CONSTRUCTOR_STATE,
      middleIngredientIds: TEST_CONSTRUCTOR_STATE.middleIngredientIds!.filter(
        (_, idx) => idx !== index
      ),
    };
    expect(reducer).toEqual(expectedState);
  });
  it('should handle change ingredient order', () => {
    const reducer = constructorReducer(TEST_CONSTRUCTOR_STATE, {
      type: changeIngredientsOrder,
      payload: { oldIndex: 2, newIndex: 1 },
    });
    const expectedState = {
      ...TEST_CONSTRUCTOR_STATE,
      middleIngredientIds: [
        middleIngredient1,
        middleIngredient3,
        middleIngredient2,
      ],
    };
    expect(reducer).toEqual(expectedState);
  });
  it('should reset state on new order fulfilled', () => {
    const reducer = constructorReducer(TEST_CONSTRUCTOR_STATE, {
      type: onNewOrder.fulfilled,
    });
    expect(reducer).toEqual(initialState);
  });
  it('should keep state on new order rejected', () => {
    const reducer = constructorReducer(TEST_CONSTRUCTOR_STATE, {
      type: onNewOrder.rejected,
    });
    expect(reducer).toEqual(TEST_CONSTRUCTOR_STATE);
  });
});

const middleIngredient1: IConstructorId = {
  ingredientId: 'testMiddleIngredientId1',
  constructorId: 'testConstructorId1',
};
const middleIngredient2: IConstructorId = {
  ingredientId: 'testMiddleIngredientId2',
  constructorId: 'testConstructorId2',
};
const middleIngredient3: IConstructorId = {
  ingredientId: 'testMiddleIngredientId3',
  constructorId: 'testConstructorId3',
};
const bunIngredient: IConstructorId = {
  ingredientId: 'testBunIngredientId',
  constructorId: 'testBunConstructorId',
};

export const TEST_CONSTRUCTOR_STATE: IInitialState = {
  bunIngredientId: bunIngredient,
  middleIngredientIds: [
    middleIngredient1,
    middleIngredient2,
    middleIngredient3,
  ],
};
