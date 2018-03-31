import React from 'react';
import CONSTANTS from '../../data/Constants';
import {
  getLoginStatus,
  getPageAccessToken,
  subscribe
} from '../../utils/FbsdkHelper';
import Alert from '../Alert';

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
      isSubscribed: false
    };

    this.setFbAsyncInit = this.setFbAsyncInit.bind(this);
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
        version: CONSTANTS.FB_API_VERSION
        // cookie: true // use cookie to persist login state
      });

      window.FB.Event.subscribe('auth.statusChange', this.checkLoginState);
    };
  }

  async checkLoginState() {
    const response = await getLoginStatus();
    if (response.authResponse) {
      // authorized
        console.log(response.authResponse);
        const accounts = await getPageAccessToken();
        console.log(accounts);
        const {
          access_token: accessToken,
          id,
          name
        } = accounts[0];
      if (window.confirm(`Subscribe page ${name} to MyBee?`)) {
        console.log("Going to subscribe: pageId=", id);
        const result = await subscribe(id, accessToken);
        if (result) {
          this.setState({
            isSubscribed: true
          });
        }
      }
    }
  }

  render() {
    return (
      <div>
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
        {this.state.isSubscribed &&
          <Alert
            message='Subscribed successfully!'
          />
        }
      </div>
    );
  }
}


export default App;
