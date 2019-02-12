# Translations &middot; [![Netlify Status](https://api.netlify.com/api/v1/badges/93c1247d-4c97-476c-b6ab-f178c980dd1e/deploy-status)](https://app.netlify.com/sites/translations/deploys) [![Build Status](https://travis-ci.com/azdanov/translations.svg?branch=master)](https://travis-ci.com/azdanov/translations) [![Renovate](https://badges.renovateapi.com/github/azdanov/translations)](https://renovatebot.com/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-teal.svg)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/azdanov/translations/blob/master/LICENSE)

An English - Estonian dictionary built with React and Netlify Functions. [Live version](https://translations.netlify.com).

![translations](https://user-images.githubusercontent.com/6123841/52497071-c8508e00-2bdd-11e9-822d-1c44cc8c5a2d.png)

## Setup

### Clone the project

```sh
https://github.com/azdanov/translations.git
cd translations
cp .env.example .env
```

### NPM Scripts

```bash
# Setup
npm install

# Compiles and hot-reloads for development
npm start

# Use environment from .env.test + json-server with src/fixtures/data.json
npm run start:env

# Compiles and minifies for production
npm build

# Run your tests
npm test

# Open cypress
npm run cypress:open

# Run jest
npm run unit

# Run cypress once
npm run cypress:run

# Run jest once
npm run unit:no-watch
```

## Learn React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
