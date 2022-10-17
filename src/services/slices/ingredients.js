import { createSlice } from '@reduxjs/toolkit';
import {
  generateConstructorIngredientId,
  getIdFromConstructorIngredientId,
} from '../../utils/util-functions';

const initialState = {
  isLoading: false,
  isFailed: false,
  burgerIngredients: {},
  constructorIngredientIds: {
    bunIngredientId: null,
    middleIngredientIds: [],
  },
  currentIngredientId: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    startLoadingIngredients: state => {
      return {
        ...state,
        isLoading: true,
        isFailed: false,
      };
    },
    failLoadingIngredients: state => {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
      };
    },
    addBurgerIngredients: (state, { payload: { ingredients } }) => {
      return {
        ...state,
        isLoading: false,
        isFailed: false,
        burgerIngredients: ingredients,
      };
    },
    viewIngredientDetails: (state, { payload: { id } }) => {
      return {
        ...state,
        currentIngredientId: id,
      };
    },
    closeIngredientDetails: state => {
      return {
        ...state,
        currentIngredientId: null,
      };
    },
    addBunIngredientToConstructor: (state, { payload: { id } }) => {
      if (state.constructorIngredientIds.bunIngredientId === id) {
        return state;
      }
      const newBun = { ...state.burgerIngredients[id] };
      newBun.count = 2;
      const newBurgerIngredients = { ...state.burgerIngredients, [id]: newBun };

      const replacedBunId = state.constructorIngredientIds.bunIngredientId;
      if (replacedBunId) {
        const replacedBun = { ...state.burgerIngredients[replacedBunId] };
        replacedBun.count = 0;
        newBurgerIngredients[replacedBunId] = replacedBun;
      }

      return {
        ...state,
        burgerIngredients: newBurgerIngredients,
        constructorIngredientIds: {
          ...state.constructorIngredientIds,
          bunIngredientId: id,
        },
      };
    },
    addMiddleIngredientToConstructor: (state, { payload: { id } }) => {
      const newBurgerIngredient = { ...state.burgerIngredients[id] };
      newBurgerIngredient.count = (newBurgerIngredient.count || 0) + 1;

      const newBurgerIngredients = {
        ...state.burgerIngredients,
        [id]: newBurgerIngredient,
      };

      const newMiddleIngredientIds = [
        ...state.constructorIngredientIds.middleIngredientIds,
        generateConstructorIngredientId(id),
      ];
      return {
        ...state,
        burgerIngredients: newBurgerIngredients,
        constructorIngredientIds: {
          ...state.constructorIngredientIds,
          middleIngredientIds: newMiddleIngredientIds,
        },
      };
    },
    removeIngredientFromConstructor: (state, { payload: { id, index } }) => {
      const newMiddleIngredientIds = [
        ...state.constructorIngredientIds.middleIngredientIds,
      ];
      newMiddleIngredientIds.splice(index, 1);

      const ingredientId = getIdFromConstructorIngredientId(id);
      const ingredientToDecrement = {
        ...state.burgerIngredients[ingredientId],
      };
      ingredientToDecrement.count = --ingredientToDecrement.count;
      const newBurgerIngredients = {
        ...state.burgerIngredients,
        [ingredientId]: ingredientToDecrement,
      };

      return {
        ...state,
        burgerIngredients: newBurgerIngredients,
        constructorIngredientIds: {
          ...state.constructorIngredientIds,
          middleIngredientIds: newMiddleIngredientIds,
        },
      };
    },
    changeConstructorIngredientsOrder: (
      state,
      { payload: { oldIndex, newIndex } }
    ) => {
      const id = state.constructorIngredientIds.middleIngredientIds[oldIndex];
      const newMiddleIngredientIds =
        state.constructorIngredientIds.middleIngredientIds.filter(
          (_, index) => index !== oldIndex
        );
      newMiddleIngredientIds.splice(newIndex, 0, id);
      return {
        ...state,
        constructorIngredientIds: {
          ...state.constructorIngredientIds,
          middleIngredientIds: newMiddleIngredientIds,
        },
      };
    },
    clearConstructorIngredients: state => {
      const newConstructorIngredientIds = initialState.constructorIngredientIds;
      const newBurgerIngredients = Object.values(
        state.burgerIngredients
      ).reduce((acc, ing) => {
        const newIngredient = { ...ing };
        newIngredient.count = 0;
        return { ...acc, [newIngredient._id]: newIngredient };
      }, {});

      return {
        ...state,
        burgerIngredients: newBurgerIngredients,
        constructorIngredientIds: newConstructorIngredientIds,
      };
    },
  },
});

export const {
  startLoadingIngredients,
  failLoadingIngredients,
  addBurgerIngredients,
  viewIngredientDetails,
  closeIngredientDetails,
  addBunIngredientToConstructor,
  addMiddleIngredientToConstructor,
  removeIngredientFromConstructor,
  changeConstructorIngredientsOrder,
  clearConstructorIngredients,
} = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;
