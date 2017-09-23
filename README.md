# Hapi Dragon

[![Greenkeeper badge](https://badges.greenkeeper.io/joshferrell/hapi-dragon.svg)](https://greenkeeper.io/)

[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square)](https://gitter.im/peace-dragon/hapi-dragon)

An API that allows users to upload cards to a database for Peace Dragons.

## Getting Started

Before starting, you will first need to look at the `.env.example` file for your environment variables.
To get up and running, simply duplicate the `.env.example` file to `.env`.

***Install Application***
```
yarn install
```

***Run Application***
```
yarn start
```

## Available Commands

### `yarn start`
Runs the app in development mode.
Open http://localhost:3000/documentation to view documentation
for the server in the browser.

The server will reload if you make edits.

[View Server Documentation](http://localhost:3000/documentation)

### `yarn test`
Runs the test watcher in an interactive mode.
By default, runs tests related to files changed since the last commit.

[Read more about testing](https://facebook.github.io/jest/docs/en/getting-started.html)
### `yarn lint`
Runs the linting command, should be done before pull requests are made.
This application follows the airbnb linting styleguide with minor changes.

[Read more about the styleguide](https://github.com/airbnb/javascript)
### `yarn coverage`
Runs the jest coverage command, checks the current code coverage of the application.
The standard is keeping coverage above or at yellow status.

### `yarn deploy:local`
Builds a local docker container that can be accessed based on the environment
variables locally.
