import {
  SET_ALL_TOURNAMENTS,
  START_LOADING,
  THROW_ERROR_ON_LOADING
} from '../actionTypes/tournaments';
import { Dispatch } from 'redux';
import axios from 'axios';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { ActionI } from '../interfaces/general';

function getTournaments(data: any): ActionI {
  return {
    type: SET_ALL_TOURNAMENTS,
    payload: data
  };
}

const startLoading = (): ActionI => ({
  type: START_LOADING
});

const getErrorOnLoading = (): ActionI => ({
  type: THROW_ERROR_ON_LOADING
});

export const getAllTournaments = (): any => {
  return async (dispatch: Dispatch<ActionI>) => {
    dispatch(startLoading());

    try {
      const { data } = await axios.get(API_TOURNAMENTS_URL);
      return dispatch(getTournaments(data));
    } catch (e) {
      return dispatch(getErrorOnLoading());
    }
  };
};

export const editTournamentName = (id: string, name: string) => {
  return async (dispatch: Dispatch<ActionI>) => {
    dispatch(startLoading());

    try {
      await axios.patch(`${API_TOURNAMENTS_URL}/${id}`, { name });
      return dispatch(getAllTournaments());
    } catch (e) {
      return dispatch(getErrorOnLoading());
    }
  };
};

export const deleteTournament = (id: string) => {
  return async (dispatch: Dispatch<ActionI>) => {
    dispatch(startLoading());

    try {
      await axios.delete(`${API_TOURNAMENTS_URL}/${id}`);
      return dispatch(getAllTournaments());
    } catch (e) {
      return dispatch(getErrorOnLoading());
    }
  };
};

export const searchTournaments = (query: string) => {
  return async (dispatch: Dispatch<ActionI>) => {
    dispatch(startLoading());

    try {
      const { data } = await axios.get(`${API_TOURNAMENTS_URL}?q=${query}`);
      return dispatch(getTournaments(data));
    } catch (e) {
      return dispatch(getErrorOnLoading());
    }
  };
};

export const createTournament = (name: string) => {
  return async (dispatch: Dispatch<ActionI>) => {
    dispatch(startLoading());

    try {
      await axios.post(`${API_TOURNAMENTS_URL}`, { name });
      return dispatch(getAllTournaments());
    } catch (e) {
      return dispatch(getErrorOnLoading());
    }
  };
};
