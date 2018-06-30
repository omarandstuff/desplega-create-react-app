# Desplega create react app
[![npm version](https://badge.fury.io/js/desplega-create-react-app.svg)](https://www.npmjs.com/package/desplega-create-react-app)

This is a prebuilt deplega configuration to deploy an app generated with [create react app](https://github.com/facebook/create-react-app). Using the branch master of the repository that holds your react app.

## Install

```
npm install --save-dev desplega-create-react-app
yarn add --dev desplega-create-react-app
```

## Configuration

Just create a desplega file in your proyect's root directory. This asumes you have configured a remote server to authenticate with your public key and a username in the sudoers group.

```js
//.desplega.js
const desplegaCreateReactApp = require("desplega-create-react-app");

module.exports = desplegaCreateReactApp({
  host: "yourdomain.com | your:IP",
  username: "deploy",
  deployTo: "apps/react-app",
  branchName: "master",
  repoUrl: "https://github.com/yourusername/yourreactapp",
  limitReleaseCount: 5,
  withNginx: true,
  serverName: "react-app.yourdomain.com",
  asDefault: true
});

```

### host
Remote server to connect and deploy your app

### username [root]
User name to connect in the remote server

### deployTo
Where to put the files of your app

### branchName [master]
Source branch to use

### repoUrl
Repository to clone and process

### limitReleaseCount
You can cache older version of the deployed apps just in case.

### withNginx [false]
Installs and configure nginx to serve your app

### serverName
Configure the nginx virtual server to leasen to this domain | ip

### asDefault [false]
if true it unlinks the default nginx conf file and set the app server as the default server
