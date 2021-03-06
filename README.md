# Translations &middot; [![Netlify Status](https://api.netlify.com/api/v1/badges/93c1247d-4c97-476c-b6ab-f178c980dd1e/deploy-status)](https://app.netlify.com/sites/translations/deploys) [![Build Status](https://travis-ci.com/azdanov/translations.svg?branch=master)](https://travis-ci.com/azdanov/translations) [![Renovate](https://badges.renovateapi.com/github/azdanov/translations)](https://renovatebot.com/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/azdanov/translations/blob/master/LICENSE)

An English - Estonian dictionary built with React and Netlify Functions. [Live version](https://translations.netlify.com).

[![Translations App](https://user-images.githubusercontent.com/6123841/53202366-f0ed7480-362e-11e9-9324-892654b78db9.png)](https://translations.netlify.com)

## Setup

### Clone the project

```bash
https://github.com/azdanov/translations.git
cd translations
cp .env.example .env
```

### NPM Scripts

```bash
# Setup
yarn

# Compiles and hot-reloads will use .env with 'production' variables
yarn start

# Use local environment from .env.test + json-server with src/fixtures/data.json
yarn start:env

# Compiles and minifies for production
yarn build

# Run your tests
yarn test

# Open cypress
yarn cypress:open

# Run jest
yarn unit

# Run cypress once
yarn cypress:run

# Run jest once
yarn unit:no-watch
```

## More Information

About React you can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) and [React documentation](https://reactjs.org/).

About [Netlify](https://www.netlify.com/docs/welcome/) and [Netlify Functions](https://www.netlify.com/docs/functions/).
