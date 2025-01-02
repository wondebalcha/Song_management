import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';
import { fetchStatsSuccess, fetchStatsFailure, fetchSongsSuccess, fetchSongsFailure } from './songSlice';
import { FETCH_STATS_REQUEST, fetchStatsSuccess as statsSuccess, fetchStatsFailure as statsFailure } from './statsActions';

// Function to fetch stats from API (from statsActions)
function* fetchStatsSaga() {
  try {
    const response = yield call(fetch, 'http://localhost:5000/api/songs/stats');
    if (response.ok) {
      const data = yield response.json();
      yield put(statsSuccess(data)); // Using actions from statsActions
    } else {
      throw new Error('Failed to fetch statistics');
    }
  } catch (error) {
    yield put(statsFailure(error.message)); // Using actions from statsActions
  }
}

// Function to fetch stats from API (from songSlice)
function* fetchStats() {
  try {
    const response = yield call(fetch, 'http://localhost:5000/api/songs/stats');
    const data = yield response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch statistics');
    yield put(fetchStatsSuccess(data));
  } catch (error) {
    yield put(fetchStatsFailure(error.message));
  }
}

// Function to fetch songs from API
function* fetchSongs() {
  try {
    const response = yield call(fetch, 'http://localhost:5000/api/songs');
    const data = yield response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch songs');
    yield put(fetchSongsSuccess(data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

// Watcher for songs
export function* watchFetchSongs() {
  yield takeEvery('songs/fetchSongsStart', fetchSongs);
}

// Watcher for stats (from songSlice)
export function* watchFetchStats() {
  yield takeEvery('songs/fetchStatsStart', fetchStats);
}

// Watcher for stats (from statsActions)
export function* statsSaga() {
  yield takeLatest(FETCH_STATS_REQUEST, fetchStatsSaga);
}
