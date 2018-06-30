module.exports = (currentPath, baseServerFile, username, host, serverName, asDefault) => {
  const defaultString = asDefault ? ' default_server' : ''
  const asDefaultCommand = asDefault ? 'sudo rm /etc/nginx/sites-enabled/default' : 'echo "Not removing"'
  const homeDir = currentPath[0] === '/' ? '' : username === 'root' ? '/root' : `/home/${username}`

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
        command: `sed -i 's#_APP_PATH_#${homeDir}${currentPath}#g; s#_DEFAULT_#${defaultString}#g' server.conf`
      },
      {
        remote: true,
        title: 'move to available sites',
        command: `sudo mv server.conf /etc/nginx/sites-available/${serverName}.conf`
      },
      {
        remote: true,
        title: 'link to enabled sites',
        command: `sudo ln -sf /etc/nginx/sites-available/${serverName}.conf /etc/nginx/sites-enabled/${serverName}.conf`
      },
      {
        remote: true,
        title: 'remove default server',
        command: asDefaultCommand,
        continueOnFailure: true
      },
      {
        remote: true,
        title: 'reload nginx',
        command: 'sudo systemctl restart nginx.service',
        continueOnFailure: true
      }
    ]
  }
}
