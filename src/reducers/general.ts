import i18n from 'i18next';
import { DEFAULT_LANGUAGE } from '../constants/general';
import { CHANGE_LANGUAGE } from '../actionTypes/general';
import { ActionI } from '../interfaces/general';

const initialState = {
  selectedLanguage: DEFAULT_LANGUAGE
};

interface GeneralStateI {
  selectedLanguage: string;
}

export default function general(
  state: GeneralStateI = initialState,
  action: ActionI
) {
  switch (action.type) {
    case CHANGE_LANGUAGE: {
      return {
        ...state,
        selectedLanguage: i18n.language
      };
    }

    default: {
      return state;
    }
  }
}
