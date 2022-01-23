import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

const LanguageToSelect = styled.span<{
  language: string;
  currentLanguage: string;
}>`
  margin: 0 5px;
  color: ${({ language, currentLanguage }) =>
    language === currentLanguage ? 'white' : 'gray'};
  cursor: pointer;

  &:hover {
    color: lightgray;
  }
`;

interface LanguageI {
  language: string;
  onClick: any;
}

export const Language: React.FC<LanguageI> = ({ language, onClick }) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.general.selectedLanguage
  );

  return (
    <LanguageToSelect
      className="language"
      language={language}
      currentLanguage={currentLanguage}
      onClick={() => onClick(language)}
    >
      {language}
    </LanguageToSelect>
  );
};
