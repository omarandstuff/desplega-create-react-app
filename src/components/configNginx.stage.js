module.exports = (currentPath, baseServerFile, username, host, serverName) => {
  return {
    title: 'Nginx Config',
    steps: [
      {
        remote: true,
        title: 'update registry',
        command: 'sudo apt-get update'
      },
      {
        remote: true,
        title: 'install nginx',
        command: 'sudo apt-get -y install nginx'
      },
      {
        title: 'transfer base conf',
        command: `scp ${baseServerFile} ${username}@${host}:~/`
      },
      {
        remote: true,
        title: 'process conf',
        command: `APP_PATH=/home/${username}/${currentPath} envsubst < server.conf > ${serverName}.conf`
      },
      {
        remote: true,
        title: 'move to available sites',
        command: `sudo mv ${serverName}.conf /etc/nginx/sites-available/${serverName}.conf`
      },
      {
        remote: true,
        title: 'link to enabled sites',
        command: `sudo ln -sf /etc/nginx/sites-available/${serverName}.conf /etc/nginx/sites-enabled/${serverName}.conf`
      },
      {
        remote: true,
        title: 'remove base conf',
        command: `rm server.conf`
      },
      {
        remote: true,
        title: 'remove default server',
        command: `sudo rm /etc/nginx/sites-enabled/default`,
        continueOnFailure: true
      },
      {
        remote: true,
        title: 'reload nginx',
        command: 'sudo systemctl reload nginx.service',
        continueOnFailure: true
      }
    ]
  }
}
