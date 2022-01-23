import { ActionI } from '../interfaces/general';
import {
  EDIT_TOURNAMENT,
  SET_ALL_TOURNAMENTS,
  START_LOADING,
  THROW_ERROR_ON_LOADING
} from '../actionTypes/tournaments';

interface TournamentsI {
  tournamentsList: any[];
  errorOnLoading: boolean;
  isLoading: boolean;
}

const initialState: TournamentsI = {
  tournamentsList: [],
  errorOnLoading: false,
  isLoading: false
};

export default function tournaments(
  state: TournamentsI = initialState,
  action: ActionI
) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALL_TOURNAMENTS: {
      return {
        ...state,
        tournamentsList: payload,
        errorOnLoading: false,
        isLoading: false
      };
    }
    case EDIT_TOURNAMENT: {
      return {
        ...state
      };
    }
    case START_LOADING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case THROW_ERROR_ON_LOADING: {
      return {
        ...state,
        errorOnLoading: true,
        isLoading: false
      };
    }
    default: {
      return state;
    }
  }
}
