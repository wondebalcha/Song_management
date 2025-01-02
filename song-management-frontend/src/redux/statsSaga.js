import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_STATS_REQUEST, fetchStatsSuccess, fetchStatsFailure } from './statsActions';

function* fetchStatsSaga() {
  try {
    const response = yield call(fetch, 'http://localhost:5000/api/songs/stats');
    if (response.ok) {
      const data = yield response.json();
      yield put(fetchStatsSuccess(data));
    } else {
      throw new Error('Failed to fetch statistics');
    }
  } catch (error) {
    yield put(fetchStatsFailure(error.message));
  }
}

export default function* statsSaga() {
  yield takeLatest(FETCH_STATS_REQUEST, fetchStatsSaga);
}
