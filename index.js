#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const chalk = require('chalk')
const { version } = require('./package.json')

const DeployScript = require('./components/deploy-script')
const CircleCi = require('./components/circleci')

let componentName

const program = require('commander')
  .version(version)
  .arguments('<component-directory>')
  .action(name => componentName = name)
  // .option('-f, --fn', 'Create Function Component')
  .option('-n, --now', 'Support a Now.sh deployment')
  .option('-h, --heroku', 'Support a heroku deployment')
  .option('-c, --css', `Add ${componentName}.css`)
  .parse(process.argv)

createDeploy(componentName)

function createDeploy (name) {
  // const rootDirectory = path.resolve(name)
  const makeFn = program.fn

  // if (!fs.existsSync(rootDirectory)) {
  //   mkdirp.sync(rootDirectory)
  // }

  DeployScript(__dirname, name, program.now, program.heroku)
  CircleCi(__dirname, name)

  console.log(chalk.cyan(`Deploy scripts created`))
}
