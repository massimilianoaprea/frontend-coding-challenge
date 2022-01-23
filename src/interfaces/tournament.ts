export interface TournamentI {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
  startDate: string;
}

export interface FabInterface {
  show: boolean;
}
