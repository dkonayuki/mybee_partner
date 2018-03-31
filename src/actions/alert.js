import CONSTANTS from '../data/Constants';

export function showError(message) {
  return {
    type: CONSTANTS.ACTION_TYPES.SHOW_ERROR,
    alert: {
      title: '',
      message,
      style: 'danger'
    }
  };
}

export function showMessage(message) {
  return {
    type: CONSTANTS.ACTION_TYPES.SHOW_MESSAGE,
    alert: {
      title: '',
      message,
      style: 'success'
    }
  };
}

export function clearAlert() {
  return {
    type: CONSTANTS.ACTION_TYPES.CLEAR_ALERT
  };
}
