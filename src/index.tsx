import React, { useEffect, useState } from 'react';
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
import styled from 'styled-components';
import theme from './theme';
import { FabInterface } from './interfaces/general';
import { scrollTop } from './utils';

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
    format: function(value: any, format: string | undefined) {
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

const Fab = styled.div<FabInterface>`
  position: fixed;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: ${theme.palette.secondary.main};
  color: white;
  bottom: 45px;
  right: 45px;
  z-index: -1;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-size: 26px;
  align-items: flex-start;
  opacity: 0;
  transition: 0.2s;

  ${({ show }) =>
    show &&
    `
    bottom: 30px;
    right: 30px;
    width: 40px;
    height: 40px;
    opacity: 1;
    z-index: 300000;
  `}
  &:hover {
    background-color: ${theme.palette.secondary.light};
  }

  &:active {
    background-color: ${theme.palette.secondary.dark};
  }
`;

const App: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const scroll = () => {
      setShow(document.documentElement.scrollTop > 250);
    };

    window.addEventListener('scroll', scroll);

    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, []);

  return (
    <Container>
      <Header />
      <Toolbar />
      <TournamentsList />
      <Fab show={show} onClick={() => scrollTop()}>
        &uarr;
      </Fab>
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
