import { combineReducers } from 'redux';
import tournaments from './tournaments';
import general from './general';

const rootReducer = combineReducers({
  tournaments,
  general
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
