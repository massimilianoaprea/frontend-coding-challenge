import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import GlobalStyle from './GlobalStyle';
import store from './store';
import Container from './components/Container';
import { Header } from './components/Header';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { TRANSLATIONS } from './i18/languages';
import { DEFAULT_LANGUAGE } from './constants/general';
import moment from 'moment-timezone';
import { TournamentsList } from './components/TournamentsList';
import { Toolbar } from './components/Toolbar';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: TRANSLATIONS.en
    },
    it: {
      translation: TRANSLATIONS.it
    }
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: ['it', 'en'],

  interpolation: {
    escapeValue: false,
    format: function(
      value: any,
      format: string | undefined,
      lng: string | undefined
    ) {
      if (value instanceof Date)
        return moment(value)
          .tz('Europe/London')
          .format(format);
      if (typeof value === 'number')
        return new Intl.NumberFormat().format(value);
      return value;
    }
  }
});

const App: React.FC = () => {
  return (
    <Container>
      <Header />
      <Toolbar />
      <TournamentsList />
    </Container>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root')
);
