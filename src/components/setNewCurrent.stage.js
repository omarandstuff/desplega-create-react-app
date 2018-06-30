module.exports = (currentPath, releasesPath, buildName) => {
  return {
    title: 'Set new current',
    steps: [
      {
        remote: true,
        title: 'remove current',
        command: `rm -rf ${currentPath}`
      },
      {
        remote: true,
        title: 'unpack release',
        command: `tar -zxvf ${releasesPath}/${buildName} -C ${releasesPath}`
      },
      {
        remote: true,
        title: 'set current',
        command: `mv ${releasesPath}/build ${currentPath}`
      }
    ]
  }
}
