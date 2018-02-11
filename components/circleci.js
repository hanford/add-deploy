const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = CircleCi

function CircleCi (dir, name) {
  let fileName = 'circle.yml'

  // try {
  //   fileName = eval(fileName)
  // } catch (e) {}

  const file = path.join(dir, fileName)

  const body = fs
    .readFileSync(path.resolve(__dirname, './circle-template.yml'), 'utf-8')
    // .split('Template')
    // .join(toTitleCase(name))
    // .split('template')
    // .join(name)

  return fs.writeFileSync(file, body)
}
