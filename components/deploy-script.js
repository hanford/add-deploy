const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = deployScript

function deployScript (dir, name) {
  let fileName = 'deploy.sh'

  // try {
  //   fileName = eval(fileName)
  // } catch (e) {}

  const file = path.join(dir, fileName)

  const body = fs
    .readFileSync(path.resolve(__dirname, './deploy-template.sh'), 'utf-8')
    // .split('Template')
    // .join(toTitleCase(name))
    // .split('template')
    // .join(name)

  return fs.writeFileSync(file, body)
}
