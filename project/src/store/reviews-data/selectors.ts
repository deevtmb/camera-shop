import { NameSpace } from '../../const';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;
