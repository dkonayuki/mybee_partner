import CONSTANTS from '../data/Constants';

export function storeUser(user) {
  return { type: CONSTANTS.ACTION_TYPES.STORE_USER, user };
}

export default storeUser;
