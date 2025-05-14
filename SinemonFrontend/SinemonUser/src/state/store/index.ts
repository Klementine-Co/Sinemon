import {configureStore} from "@reduxjs/toolkit";

import {stateReducer} from '../App/reducer';
// import thunk from 'redux-thunk';
import { setSocket } from "../App/actions";


export const store = configureStore(
  {
      reducer: stateReducer
      ,middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  }
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch