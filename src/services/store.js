import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { orderReducer } from './slices/order';
import { modalReducer } from './slices/modal';
import { constructorReducer } from './slices/constructor';
import { userAdmissionReducer } from './slices/user-admission';

export const store = configureStore({
  reducer: combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    modal: modalReducer,
    burgerConstructor: constructorReducer,
    userAdmission: userAdmissionReducer,
  }),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});
