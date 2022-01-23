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
`;

const TournamentDataLine: React.FC<{ field: string; value: string }> = ({
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

  return (
    <div>
      {tournamentsList.map(
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
      )}
    </div>
  );
};
