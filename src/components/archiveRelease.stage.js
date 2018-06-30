module.exports = (repoPath, localReleasesPath, buildName) => {
  return {
    title: 'Archive release',
    steps: [
      {
        title: 'compress build',
        path: repoPath,
        command: 'tar -zcvf build.tar.gz build'
      },
      {
        title: 'create releases dir',
        command: `mkdir -p ${localReleasesPath}`
      },
      {
        title: 'archive build',
        command: `mv ${repoPath}/build.tar.gz ${localReleasesPath}/${buildName}`
      }
    ]
  }
}
