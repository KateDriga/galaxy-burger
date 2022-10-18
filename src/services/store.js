import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { orderReducer } from './slices/order';
import { modalReducer } from './slices/modal';
import { constructorReducer } from './slices/constructor';

export const store = configureStore({
  reducer: combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    modal: modalReducer,
    burgerConstructor: constructorReducer,
  }),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});
