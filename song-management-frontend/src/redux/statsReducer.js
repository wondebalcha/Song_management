import { FETCH_STATS_REQUEST, FETCH_STATS_SUCCESS, FETCH_STATS_FAILURE } from './statsActions';

const initialState = {
  totalSongs: 0,
  totalGenres: 0,
  totalArtists: 0,
  loading: false,
  error: null,
};

const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        totalSongs: action.payload.totalSongs,
        totalGenres: action.payload.totalGenres,
        totalArtists: action.payload.totalArtists,
      };
    case FETCH_STATS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default statsReducer;
