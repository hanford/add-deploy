const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = CircleCi

function CircleCi (dir, name) {
  const file = path.join(dir, 'circle.yml')

  const body = fs
    .readFileSync(path.resolve(__dirname, './circle-template.yml'), 'utf-8')
    // .split('Template')
    // .join(toTitleCase(name))
    // .split('template')
    // .join(name)

  return fs.writeFileSync(file, body)
}
