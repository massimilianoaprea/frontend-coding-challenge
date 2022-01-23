import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import debounce from 'lodash/debounce';
import {
  createTournament,
  searchTournaments
} from '../../actionCreators/tournaments';
import Input from '../Input';
import Button from '../Button';
import Row from '../Row';
import styled from 'styled-components';
import theme from '../../theme';

const RowChild = styled(Row)`
  overflow: hidden;

  input {
    outline-offset: -2px;
  }

  @media (max-width: ${theme.breakpoints.xs.viewport}px) {
    flex-direction: column;
  }
`;

export const Toolbar: React.FC = () => {
  const { t } = useTranslation();
  const tournamentsFound = useSelector(
    (state: RootState) => state.tournaments.tournamentsList
  );
  const dispatch = useDispatch();

  const delayedInsert = debounce(q => {
    dispatch(searchTournaments(q));
  }, 500);

  const searchTournament = useCallback(
    (event: any) => delayedInsert(event.target.value),
    [delayedInsert]
  );

  const newTournament = () => {
    const name = prompt(`${t('newTournamentName')}:`);
    if (!name) return;
    if (name === '') {
      alert(t('noNameError'));
      return;
    } else {
      dispatch(createTournament(name || ''));
    }
  };

  return (
    <>
      <RowChild>
        <Input
          onChange={searchTournament}
          placeholder={t('tournament.search')}
        />
        <Button data-cy="createButton" onClick={newTournament}>
          {t('tournament.create')}
        </Button>
      </RowChild>
      {tournamentsFound.length > 0 && (
        <Row>
          <p>
            {t('tournament.found')}: {tournamentsFound.length}
          </p>
        </Row>
      )}
    </>
  );
};
