import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { orderReducer } from './slices/order';
import { modalReducer } from './slices/modal';

export const store = configureStore({
  reducer: combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    modal: modalReducer,
  }),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});
