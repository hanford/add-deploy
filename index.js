#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const { version } = require('./package.json')
const { cwd } = process

const DeployScript = require('./components/deploy-script')
const CircleCi = require('./components/circleci')

let componentName

const program = require('commander')
  .version(version)
  .arguments('<component-directory>')
  .action(name => componentName = name)
  .option('-n, --now', 'Support a Now.sh deployment')
  .option('-h, --heroku', 'Support a heroku deployment')
  .parse(process.argv)

createDeploy(componentName)

function createDeploy (name) {
  const cwd = cwd()

  DeployScript(cwd, name, program.now, program.heroku)
  CircleCi(cwd, name)

  console.log(chalk.cyan(`Deploy scripts created`))
}
