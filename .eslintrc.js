module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "rules": {
    "no-console": 0, // allow to use console.log
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], 
    "comma-dangle": ["error", "never"], // no comma at the end of an element inside array, hash
    "react/forbid-prop-types": 0, // allow all prop types such as any, object...
    "no-alert": 0, // no alert
    "linebreak-style": 0, // disable line break differences between unix and windows
    "import/first": 0, // no need for absolute imports to be first
    "no-prototype-builtins": 0, // to use object.hasOwnProperty
    "no-use-before-define": ["error", { "functions": false, "classes": true }], /* allow to use
              function before declaration, functions are hoisted in js, so this is safe */
    "jsx-a11y/no-static-element-interactions": 0, /* allow to add binding to static element
              such as div, span ... */
    "no-case-declarations": 0, // allow to declare fields and methods in case statements
    "no-param-reassign": 0,  // parameter e on img onError need reassign
    "max-len": ["error", { "code": 120, "ignoreComments": true }], // max-len 120
    "object-curly-newline": 0,  // allow both object curly brackets inline and newline
    "jsx-a11y/anchor-is-valid": 0, // allow no href on a tag
    "function-paren-newline": 0 // allow newline inside function parentheses
  }
};
