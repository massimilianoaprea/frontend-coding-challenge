import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTournaments } from '../../actionCreators/tournaments';
import { RootState } from '../../reducers';
import styled from 'styled-components';
import theme from '../../theme';
import { TournamentI } from '../../interfaces/tournament';
import H6 from '../H6';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
import Row from '../Row';

const Tournament = styled.div`
  background-color: ${theme.palette.background.base};
  border-radius: ${theme.borderRadius};
  margin: ${theme.spacing(3)};
  padding: ${theme.spacing(4)} ${theme.spacing(3)};
  box-sizing: border-box;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${theme.breakpoints.sm.viewport}px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }

  @media (min-width: ${theme.breakpoints.sm.viewport}px) and (max-width: ${theme
      .breakpoints.md.viewport}px) {
    width: calc(calc(100% - ${theme.spacing(3)} * 2) / 2);

    &:nth-child(2n + 1) {
      margin-left: 0;
    }

    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  @media (min-width: ${theme.breakpoints.md.viewport}px) and (max-width: ${theme
      .breakpoints.lg.viewport}px) {
    width: calc(calc(100% - ${theme.spacing(3)} * 2) / 2);

    &:nth-child(2n + 1) {
      margin-left: 0;
    }

    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  @media (min-width: ${theme.breakpoints.lg.viewport}px) {
    width: calc(calc(100% - ${theme.spacing(3)} * 4) / 3);
    height: 195px;

    &:nth-child(3n + 1) {
      margin-left: 0;
    }

    &:nth-child(3n) {
      margin-right: 0;
    }
  }
`;

interface TournamentDataLineI {
  field: string;
  value: string;
}

const TournamentDataLine: React.FC<TournamentDataLineI> = ({
  field,
  value
}) => (
  <div>
    <span>{field}: </span>
    <span>{value}</span>
  </div>
);

export const TournamentsList: React.FC = () => {
  const dispatch = useDispatch();
  const { tournamentsList, errorOnLoading, isLoading } = useSelector(
    (state: RootState) => state.tournaments
  );
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllTournaments());
  }, [dispatch]);

  const getMessage = () => {
    return t(
      `tournament.${
        isLoading ? 'loading' : errorOnLoading ? 'error' : 'notFound'
      }`
    );
  };

  return (
    <div>
      {tournamentsList.length > 0 ? (
        tournamentsList.map(
          ({
            id,
            name,
            game,
            organizer,
            participants: { max, current },
            startDate
          }: TournamentI) => (
            <Tournament key={id} className="tournament">
              <H6>{name}</H6>
              <TournamentDataLine field={t('organizer')} value={organizer} />
              <TournamentDataLine field={t('game')} value={game} />
              <TournamentDataLine
                field={t('participants')}
                value={`${current}/${max}`}
              />
              <TournamentDataLine
                field={t('start')}
                value={t('dateFormat', { date: new Date(startDate) })}
              />
              <div>
                <Button onClick={() => {}}>{t('edit')}</Button>
                <Button onClick={() => {}}>{t('delete')}</Button>
              </div>
            </Tournament>
          )
        )
      ) : (
        <Row centered>
          <p>{getMessage()}</p>
        </Row>
      )}
    </div>
  );
};
