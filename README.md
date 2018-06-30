# Desplega create react app

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
  repoUrl: "https://github.com/yourusername/yourreactapp",
  limitReleaseCount: 5,
  withNginx: true,
  serverName: "react-app.yourdomain.com",
});

```

### host
Remote server to connect and deploy your app

### username
User name to connect in the remote server

### deployTo
Where to put the files of your app

### repoUrl
Repository to clone and process

### limitReleaseCount
You can cache older version of the deployed apps just in case.

### withNginx
Installs and configure nginx to serve your app

### serverName
Configure the nginx virtual server to leasen to this domain | ip
