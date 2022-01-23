import React from 'react';
import H4 from '../H4';
import Row from '../Row';
import i18n, { changeLanguage } from 'i18next';
import { Language } from './Language';
import { useDispatch } from 'react-redux';
import changeSelectedLanguage from '../../actionCreators/general';

export const Header: React.FC = () => {
  const dispatch = useDispatch();

  const switchLanguage = (language: string) => {
    changeLanguage(language)
      .then(() => dispatch(changeSelectedLanguage()))
      .catch((err: unknown) => console.log(err, i18n.language));
  };

  return (
    <Row>
      <H4>FACEIT Tournaments</H4>
      <div>
        <Language onClick={switchLanguage} language="it">
          ITA
        </Language>
        <span>|</span>
        <Language onClick={switchLanguage} language="en">
          EN
        </Language>
      </div>
    </Row>
  );
};
