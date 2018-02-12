const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = deployScript

function deployScript (dir, name) {
  const file = path.join(dir, 'deploy.sh')

  const body = fs
    .readFileSync(path.resolve(__dirname, './deploy-template.sh'), 'utf-8')
    // .split('Template')
    // .join(toTitleCase(name))
    // .split('template')
    // .join(name)

  return fs.writeFileSync(file, body)
}
