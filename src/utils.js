module.exports.generateBuildName = () => {
  const date = new Date()
  const dateString = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
  const timeString = `${date.getHours()}${date.getMinutes()}${date.getMilliseconds()}`
  const now = `${dateString}${timeString}`

  return `build_${now}.tar.gz`
}
