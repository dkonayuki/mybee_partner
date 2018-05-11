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
      pages: []
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
    if (response.status === 'connected') {
      // authorized
      const accounts = await getPageAccessToken();
      const promises = accounts.map(async (account) => {
        const {
          access_token: accessToken,
          id,
          name
        } = account;

        const apps = await getSubscribedApps(id, accessToken);
        let isSubscribed = false;

        apps.forEach((app) => {
          const { id: appId } = app;
          if (appId === CONSTANTS.FB_APP_ID) {
            isSubscribed = true;
          }
        });

        return {
          accessToken,
          id,
          name,
          isSubscribed
        };
      });

      const pages = await Promise.all(promises);

      this.setState({
        pages
      });
    } else {
      // reset page list
      this.setState({
        pages: []
      });
    }
  }

  async handleSubscribe(pageId) {
    const { id, accessToken, name } = this.state.pages.filter(page => page.id === pageId);

    if (window.confirm(`Subscribe MyBee to page '${name}'?`)) {
      // subscribe mybee app to this page
      await subscribe(pageId, accessToken);
      this.props.onShowMessage(CONSTANTS.ALERT.MESSAGE.SUBSCRIBED_SUCCESS);

      this.setState({
        pages: this.state.pages.map((page) => {
          // update subscribed list
          if (page.id === id) {
            return {
              ...page,
              isSubscribed: true
            };
          }
          return page;
        })
      });
    }
  }

  render() {
    const list = this.state.pages.map(page => (
      <div
        key={page.id}
        className="user-managed-page"
      >
        {page.isSubscribed ?
          <Button
            className="subscribe-btn"
            bsStyle="success"
            disabled
          >
            Subscribed
          </Button>
        :
          <Button
            className="subscribe-btn"
            bsStyle="primary"
            onClick={() => this.handleSubscribe(page.id)}
          >
            Subscribe
          </Button>
        }
        <ul>
          <li>{page.id}</li>
          <li>{page.name}</li>
          <li>{page.accessToken}</li>
        </ul>
      </div>
    ));

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
          data-scope="public_profile,email,manage_pages,pages_messaging,pages_messaging_phone_number,pages_messaging_subscriptions" // eslint-disable-line
        />
        <br />
        {list}
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
