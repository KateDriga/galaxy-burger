import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from '../actions/constructor-actions';

export const constructorInitialState = {
  bunIngredient: null,
  middleIngredients: null,
};

export function constructorReducer(state, action) {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return action.payload.type === 'bun'
        ? { ...state, bunIngredient: action.payload }
        : {
            ...state,
            middleIngredients: state.middleIngredients
              ? [...state.middleIngredients, action.payload]
              : [action.payload],
          };
    }
    case REMOVE_INGREDIENT:
      return {
        ...state,
        middleIngredients: state.middleIngredients.filter(
          (_, idx) => idx !== action.payload.idx
        ),
      };
    default:
      return state;
  }
}
