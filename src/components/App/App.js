import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../data/Constants';
import {
  getLoginStatus,
  getPageAccessToken,
  subscribe,
  getSubscribedApps
} from '../../utils/FbsdkHelper';
import {
  Button
} from 'react-bootstrap';
import Page from '../Page';
import { connect } from 'react-redux';
import {
  showMessage
} from '../../actions/alert';

import './App.css';

function loadSdkAsynchronously() {
  ((d, s, id) => {
    let js = d.getElementsByTagName(s)[0];
    const fjs = js;
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubscribed: false,
      showButton: false
    };

    this.setFbAsyncInit = this.setFbAsyncInit.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
  }

  componentWillMount() {
    this.setFbAsyncInit();
    loadSdkAsynchronously();
  }

  setFbAsyncInit() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: CONSTANTS.FB_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: CONSTANTS.FB_API_VERSION,
        status: true,
        cookie: true // use cookie to persist login state
      });

      window.FB.Event.subscribe('auth.statusChange', this.checkLoginState);
    };
  }

  async checkLoginState() {
    const response = await getLoginStatus();
    if (response.authResponse) {
      // authorized
      const accounts = await getPageAccessToken();
      const {
        access_token: accessToken,
        id,
        name
      } = accounts[0];
      this.setState({
        pageName: name,
        pageId: id,
        accessToken
      });

      const apps = await getSubscribedApps(id, accessToken);
      let showButton = true;

      apps.forEach((app) => {
        const { id: appId } = app;
        if (appId === CONSTANTS.FB_APP_ID) {
          this.props.onShowMessage(CONSTANTS.ALERT.MESSAGE.ALREADLY_SUBSCRIBED(name));
          showButton = false;
        }
      });

      this.setState({
        showButton
      });
    }
  }

  async handleSubscribe() {
    const { pageId, accessToken, pageName } = this.state;
    if (window.confirm(`Subscribe MyBee to page '${pageName}'?`)) {
      // subscribe mybee app to this page
      await subscribe(pageId, accessToken);
      this.props.onShowMessage(CONSTANTS.ALERT.MESSAGE.SUBSCRIBED_SUCCESS);
      this.setState({
        showButton: false
      });
    }
  }

  render() {
    return (
      <Page>
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="large"
          data-button-type="login_with"
          data-show-faces="false"
          data-auto-logout-link="true"
          data-use-continue-as="true"
          data-scope="public_profile,email,manage_pages"
        />
        <br />
        {this.state.showButton &&
          <Button
            className="subscribe-btn"
            bsStyle="primary"
            onClick={this.handleSubscribe}
          >
            Subscribe
          </Button>
        }
      </Page>
    );
  }
}

App.propTypes = {
  onShowMessage: PropTypes.func.isRequired
};

export default connect(
  null,
  { onShowMessage: showMessage } // mapDispatchToProps
)(App);
