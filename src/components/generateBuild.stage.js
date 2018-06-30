module.exports = repoPath => {
  return {
    title: 'Generate build',
    steps: [
      {
        title: 'yarn install',
        path: repoPath,
        command: `yarn install --production`
      },
      {
        title: 'yarn build',
        path: repoPath,
        command: `yarn build`
      }
    ]
  }
}
