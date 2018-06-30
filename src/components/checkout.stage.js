module.exports = (repoUrl, repoPath, brachName = 'master') => {
  return {
    title: 'Checkout',
    steps: [
      {
        title: 'git clone',
        command: `git clone ${repoUrl} ${repoPath}`,
        continueOnFailure: true
      },
      {
        title: 'reset repo',
        path: repoPath,
        command: `git reset --hard origin/${brachName}`
      },
      {
        title: 'pull lastest changes',
        path: repoPath,
        command: `git pull`
      }
    ]
  }
}
