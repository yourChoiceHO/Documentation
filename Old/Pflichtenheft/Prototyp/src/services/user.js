import { equals } from 'ramda';
import { VOTER, SUPERVISOR, MODERATOR } from '../constants/roles';

export const isVoter = role => equals(VOTER, role);
export const isSupervisor = role => equals(SUPERVISOR, role);
export const isModerator = role => equals(MODERATOR, role);
