import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { orderReducer } from './slices/order';
import { constructorReducer } from './slices/constructor';
import { userAdmissionReducer } from './slices/user-admission';
import { userProfileReducer } from './slices/user-profile';

export const store = configureStore({
  reducer: combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    burgerConstructor: constructorReducer,
    userAdmission: userAdmissionReducer,
    userProfile: userProfileReducer,
  }),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
