import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { orderReducer } from './slices/order';
import { constructorReducer } from './slices/constructor';
import { userAdmissionReducer } from './slices/user-admission';
import { userProfileReducer } from './slices/user-profile';
import { feedReducer } from './slices/feed';
import { wsMiddleware } from './middlewares/ws-middleware';
import { wsFeedActions } from './actions/ws-feed';
import { wsFeedProfileActions } from './actions/ws-profile-feed';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  burgerConstructor: constructorReducer,
  userAdmission: userAdmissionReducer,
  userProfile: userProfileReducer,
  feed: feedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      wsMiddleware(wsFeedActions),
      wsMiddleware(wsFeedProfileActions)
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
