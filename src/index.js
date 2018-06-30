const checkout = require('./components/checkout.stage')
const generateBuild = require('./components/generateBuild.stage')
const archiveRelsease = require('./components/archiveRelease.stage')
const transferRelease = require('./components/transferRelease.stage')
const setNewCurrent = require('./components/setNewCurrent.stage')
const cleanReleases = require('./components/cleanReleases.stage')
const configNginx = require('./components/configNginx.stage')
const { generateBuildName } = require('./utils')

module.exports = config => {
  const { host, username, serverName, deployTo, repoUrl, limitReleaseCount, withNginx } = config

  const buildName = generateBuildName()
  const repoPath = 'deployments/repo'
  const localReleasesPath = 'deployments/releases'
  const releasesPath = `${deployTo}/releases`
  const currentPath = `${deployTo}/current`
  const baseServerFile = `${__dirname}/server_files/server.conf`
  const stages = []

  stages.push(checkout(repoUrl, repoPath))
  stages.push(generateBuild(repoPath))
  stages.push(archiveRelsease(repoPath, localReleasesPath, buildName))
  stages.push(transferRelease(releasesPath, localReleasesPath, buildName, username, host))
  stages.push(setNewCurrent(currentPath, releasesPath, buildName))
  stages.push(cleanReleases(releasesPath, limitReleaseCount))

  if (withNginx) {
    stages.push(configNginx(currentPath, baseServerFile, username, host, serverName))
  }

  return {
    pipeline: {
      title: 'Desplega react app',
      remotes: {
        Remote1: {
          host,
          username
        }
      },
      stages: stages
    }
  }
}
