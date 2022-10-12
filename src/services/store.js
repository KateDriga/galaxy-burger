import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { orderReducer } from './slices/orders';

export const store = configureStore({
  reducer: combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
  }),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});
