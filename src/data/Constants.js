const environments = {
  production: {
    URL: {
      RECIPE_API: 'http://api.mybee.life:2701/reallife-agent/v1/recipes',
      DISCOVERY_API: 'http://api.mybee.life:2701/reallife-agent/v1/recipes/discovery',
      BASE_PATH: '/'
    },
    FB_APP_ID: process.env.REACT_APP_FB_APP_ID,
    MYBEE_TOKEN: process.env.REACT_APP_MYBEE_TOKEN
  },
  staging: { // not in used
  },
  development: { // for localhost
    URL: {
      RECIPE_API: 'http://api.mybee.life:2701/reallife-agent/v1/recipes',
      DISCOVERY_API: 'http://api.mybee.life:2701/reallife-agent/v1/recipes/discovery',
      BASE_PATH: '/'
    },
    FB_APP_ID: process.env.REACT_APP_FB_APP_ID,
    MYBEE_TOKEN: process.env.REACT_APP_MYBEE_TOKEN
  },
  test: { // for testing with jest, don't forget to mock stuff
    URL: {
    }
  }
};

const envConsts = environments[process.env.NODE_ENV];

const CONSTANTS = Object.assign({}, envConsts, {
  FB_API_VERSION: 'v2.12'
});

export default CONSTANTS;
