module.exports = (repoUrl, repoPath) => {
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
        command: `git reset --hard origin/master`
      },
      {
        title: 'pull lastest changes',
        path: repoPath,
        command: `git pull`
      }
    ]
  }
}
