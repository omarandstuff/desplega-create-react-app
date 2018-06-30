module.exports = (releasesPath, limitReleaseCount) => {
  return {
    title: 'Clean releases',
    steps: [
      {
        remote: true,
        id: 'releases_list',
        title: 'list realeses',
        command: `ls -dt ${releasesPath}/*`
      },
      {
        remote: true,
        title: 'remove older releases',
        command: context => {
          const files = context.archive.dictionary.releases_list.stdout.split('\n')

          if (files.length <= limitReleaseCount) {
            return 'echo "Nothing to remove"'
          } else {
            let command = ''

            for (let i = limitReleaseCount; i < files.length - 1; i++) {
              command += command !== '' ? ' && ' : ''
              command += 'rm ' + files[i]
            }

            return command
          }
        }
      }
    ]
  }
}
