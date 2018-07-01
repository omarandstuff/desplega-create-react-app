# Create react app automatic deploy to a Digital Ocean droplet

[Create react app](https://github.com/facebook/create-react-app) has gain a lot of popularity lately, it allows us to create a boilerplate for our react apps and the best thing is that all the webpack configuration is maintained by the community.

At some point you will need to serve your application from a remote server and today I am going to show you how to do it using the library [Deplega](https://github.com/omarandstuff/desplega) and a virtual server from Digital Ocean.

## Desplega
Desplega is general propose automatization tool that allows you to run preconfigured pipelines from a `yml` or `js` file; you can run a series of steps(commands) either remotely via `ssh` or in your local machine. lucky us it is a modularizable library, so it already exists a preconfigured pipeline to deploy create react apps called [desplega-create-react-app](https://github.com/omarandstuff/desplega-create-react-app), so let’s go use it.

## Creating a new application

The first thing to do if you do not already have a react application to deploy is to create a new one. we can do this by running the following commands

```
npx create-react-app my-app
cd my-app
```

Now that we have or fresh created application we need to keep it in its own repository so let go create a repository on Github or similar for your new app and come back to this page. Then just initialize the git repository and push to your changes. Change the following command to match your remote repository name.

```
git init
git add .
git commit -m 'Base create react app'
git remote add origin <repository url>
git push -u origin master
```

## Creating a digital ocean droplet
You can follow this [article](https://www.digitalocean.com/docs/droplets/how-to/create/) if you are not familiarized with the creation of droplets, make sure to share your ssh public key to access your droplet and once you have a new instance running continue reading.

Make sure everything is working by connecting to your new droplet via ssh

```
ssh root@<Your drople's IP>
```

## Configuring Desplega 
Desplega is a npm global package this mean that when installed it will be available in our terminal just like any other program installed in our system, lets install it.

```
npm i -g desplega
```

And add the desplega-create-react-app dependency in your project as a development dependency.

```
npm install --save-dev desplega-create-react-app
```

Now lest create a Desplega file in the root of our react app project and require the `desplega-create-react-app` module. Make sure to modify the following configuration to match your droplet IP.

```js
//.desplega.js
const desplegaCreateReactApp = require("desplega-create-react-app")

module.exports = desplegaCreateReactApp({
  host: "<Your drople's IP>",
  username: "root",
  deployTo: "apps/react-app",
  repoUrl: "<Your repo url>",
  limitReleaseCount: 5,
  withNginx: true,
  serverName: "<Your drople's IP or domain>",
  asDefault: true
})
```

now let’s just use the Desplega cli command:

```
$ desplega
```

and you will see something like this

<img src="https://raw.githubusercontent.com/omarandstuff/desplega-create-react-app/master/media/deploy-demo.svg" />


After that go visit your droplet's IP in the browser to watch you react app live.

## Conclusion
This is a really helpful and easy way to deploy create-react-app apps to our general purpose virtual server, for more advance usage to create your own deployment sequences go visit the [Deplega](https://github.com/omarandstuff/desplega) documentation.
