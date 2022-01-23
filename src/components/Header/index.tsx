import React from 'react';
import H4 from '../H4';
import Row from '../Row';
import i18n, { changeLanguage } from 'i18next';
import { Language } from './Language';
import { useDispatch } from 'react-redux';
import changeSelectedLanguage from '../../actionCreators/general';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const LanguageRow = styled(Row)`
  font-size: 1.2rem;
`;

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const switchLanguage = (language: string) => {
    sessionStorage.setItem('lan', language);

    changeLanguage(language)
      .then(() => dispatch(changeSelectedLanguage()))
      .catch((err: unknown) => console.log(err, i18n.language));
  };

  return (
    <Row>
      <H4>{t('title')}</H4>
      <LanguageRow>
        <Language onClick={switchLanguage} language="it">
          ITA
        </Language>
        <span>|</span>
        <Language onClick={switchLanguage} language="en">
          EN
        </Language>
      </LanguageRow>
    </Row>
  );
};
