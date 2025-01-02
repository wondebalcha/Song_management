export const FETCH_STATS_REQUEST = 'FETCH_STATS_REQUEST';
export const FETCH_STATS_SUCCESS = 'FETCH_STATS_SUCCESS';
export const FETCH_STATS_FAILURE = 'FETCH_STATS_FAILURE';

export const fetchStats = () => ({
  type: FETCH_STATS_REQUEST,
});

export const fetchStatsSuccess = (stats) => ({
  type: FETCH_STATS_SUCCESS,
  payload: stats,
});

export const fetchStatsFailure = (error) => ({
  type: FETCH_STATS_FAILURE,
  payload: error,
});
