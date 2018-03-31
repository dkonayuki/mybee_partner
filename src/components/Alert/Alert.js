import React from 'react';
import PropTypes from 'prop-types';
import { Alert as BootstrapAlert } from 'react-bootstrap';

function Alert(props) {
  return (
    <BootstrapAlert
      bsStyle={props.style}
      onDismiss={props.onDismiss}
    >
      {props.title && <h4>{props.title}</h4>}
      <p>{props.message}</p>
    </BootstrapAlert>
  );
}

Alert.propTypes = {
  style: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func
};

Alert.defaultProps = {
  title: '',
  style: 'success',
  onDismiss: null
};

export default Alert;
