// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songReducer from './songSlice';
import { watchFetchSongs, watchFetchStats, statsSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

function* rootSaga() {
  yield* watchFetchSongs();
  yield* watchFetchStats();
  yield* statsSaga();
}

sagaMiddleware.run(rootSaga);

export default store;
