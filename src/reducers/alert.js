import CONSTANTS from '../data/Constants';

const initialState = {
  title: CONSTANTS.ALERT.TITLE.ERROR,
  message: '',
  style: 'danger',
  show: false
};

function alert(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.ACTION_TYPES.SHOW_ERROR:
      return {
        ...action.alert,
        show: true
      };
    case CONSTANTS.ACTION_TYPES.SHOW_MESSAGE:
      return {
        ...action.alert,
        show: true
      };
    case CONSTANTS.ACTION_TYPES.CLEAR_ALERT:
      return {
        show: false
      };
    default:
      return state;
  }
}

export default alert;
