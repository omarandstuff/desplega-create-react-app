module.exports = (releasesPath, localReleasesPath, buildName, username, host) => {
  return {
    title: 'Transfer realease',
    steps: [
      {
        remote: true,
        title: 'create remote releases path',
        command: `mkdir -p ${releasesPath}`
      },
      {
        title: 'transfer',
        command: `scp ${localReleasesPath}/${buildName} ${username}@${host}:${releasesPath}`
      }
    ]
  }
}
