import PropTypes from 'prop-types';
import React from 'react';
import Alert from '../Alert';
import { connect } from 'react-redux';
import { clearAlert } from '../../actions/alert';

import './Page.css';

function Page({
  alert,
  onClearAlert,
  children
}) {
  const { className, title, message, style } = alert;
  return (
    <div className="page">
      <div className={`page__alert ${className || ''}`}>
        {alert.show &&
        <Alert
          title={title}
          message={message}
          style={style}
          onDismiss={onClearAlert}
        />}
      </div>
      <div className="page__content">
        {children}
      </div>
    </div>
  );
}

Page.propTypes = {
  alert: PropTypes.object.isRequired,
  children: PropTypes.node,
  onClearAlert: PropTypes.func.isRequired
};

Page.defaultProps = {
  children: null
};

function mapStateToProps(state) {
  const { alert } = state;
  return { alert };
}

export default connect(
  mapStateToProps,
  { onClearAlert: clearAlert }
)(Page);
