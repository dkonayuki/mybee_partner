export async function getLoginStatus() {
  return new Promise((resolve, reject) => {
    window.FB.getLoginStatus((response) => {
      const { error } = response;
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

export async function getProfilePicture(id) {
  return new Promise((resolve, reject) => {
    window.FB.api(`/${id}/picture?redirect=false`, (response) => {
      const { data, error } = response;
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    }, {
      scope: 'public_profile'
    });
  });
}

export async function getPageAccessToken() {
  return new Promise((resolve, reject) => {
    window.FB.api('/me/accounts', (response) => {
      const { data, error } = response;
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

export async function subscribe(pageId = '', accessToken) {
  if (!pageId) return null;
  return new Promise((resolve, reject) => {
    window.FB.api(`/${pageId}/subscribed_apps`, 'post', { access_token: accessToken }, (response) => {
      const { data, error } = response;
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

export async function getSubscribedApps(pageId, accessToken) {
  return new Promise((resolve, reject) => {
    window.FB.api(`/${pageId}/subscribed_apps`, { access_token: accessToken }, (response) => {
      const { data, error } = response;
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
