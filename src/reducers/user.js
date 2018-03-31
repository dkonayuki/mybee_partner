import CONSTANTS from '../data/Constants';

const initialState = {
  role: 1,
  loggedIn: false,
  pictureUrl: ''
};

function user(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.ACTION_TYPES.STORE_USER:
      return { ...action.user };
    default:
      return state;
  }
}

export default user;
