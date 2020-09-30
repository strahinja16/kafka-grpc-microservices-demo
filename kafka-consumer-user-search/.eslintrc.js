const path = require('path');

module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "linebreak-style": "off",
    "eqeqeq": ["error", "always", { "null": "ignore" }],
    "no-mixed-operators": ["error", { "allowSamePrecedence": true }],
    "no-trailing-spaces": ["warn", { "skipBlankLines": true }],
    "lines-between-class-members": ["error", "always"],
    "prefer-destructuring": "warn",
    "no-plusplus": "off",
    "no-console": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-tabs": "off",
  },
  "env": {
    "node": true,
  },
};
