import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {categoriesApi} from "../api/categoriesApi";
import {productsApi} from "../api/productsApi";

const rootReducer = combineReducers({
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(categoriesApi.middleware)
        .concat(productsApi.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

