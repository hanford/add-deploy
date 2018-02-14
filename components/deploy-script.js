const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = deployScript

function deployScript (dir, name, now, heroku) {
  const file = path.join(dir, 'deploy.sh')

  let body = fs
    .readFileSync(path.resolve(__dirname, './deploy-template.sh'), 'utf-8')

  if (now) {
    body = body.split('# now_feature').join(now_feat)
    body = body.split('# now_development').join(now_dev)
    body = body.split('# now_production').join(now_prod)
  }

  if (heroku) {
    body = body.split('# heroku_development').join(heroku_dev)
    body = body.split('# heroku_production').join(heroku_prod)
  }

  return fs.writeFileSync(file, body)
}

const now_dev =
  'echo Deploying to now.sh' + '\n' +
  'DEV_ENV=`now -t ${NOW_TOKEN} --team eaze -e EAZE_ENVIRONMENT=development -e COMMIT_SHA=${CIRCLE_SHA1} --force`' + '\n' +
  // 'printf "\n" # print new line!' + '\n' +
  'echo Environment: $DEV_ENV' + '\n' +
  // 'echo Pointing dev-eaze.now.sh to $DEV_ENV' + '\n' +
  // 'now -t ${NOW_TOKEN} --team eaze alias $DEV_ENV dev-eaze' + '\n' +
  ''  +
  'echo Deploying staging to eaze.now.sh' + '\n' +
  'STAGING_ENV=`now -t ${NOW_TOKEN} --team eaze -e EAZE_ENVIRONMENT=production -e COMMIT_SHA=${CIRCLE_SHA1} --force`' + '\n' +
  // 'printf "\n" # print new line!' + '\n' +
  'echo Environment: $STAGING_ENV' + '\n' +
  'echo Pointing eaze.now.sh to $STAGING_ENV' + '\n'
  // 'now -t ${NOW_TOKEN} --team eaze alias $STAGING_ENV eaze  '

const now_feat =
  'echo Deploying to now.sh' + '\n' +
  'FEATURE_ENV=`now -t $NOW_TOKEN --team eaze -e COMMIT_SHA=$CIRCLE_SHA1`' + '\n' +
  // 'printf "\n" # print new line!' + '\n' +
  'echo Environment: $FEATURE_ENV' + '\n' +
  // 'echo Begin runnin bundle-cop' + '\n' +
  'github --comment "Now Environment" --link $FEATURE_ENV'

const now_prod =
  'echo Deploying production to www.eaze.com' + '\n' +
  'PROD_ENV=`now -t ${NOW_TOKEN} --team eaze -e EAZE_ENVIRONMENT=production -e COMMIT_SHA=${CIRCLE_SHA1} --force`' + '\n' +
  'printf "\n" # print new line!' + '\n' +
  'echo Environment: $PROD_ENV' + '\n'
  // 'now -t ${NOW_TOKEN} --team eaze alias $PROD_ENV www.eaze.com'

const heroku_dev =
  'heroku config:set COMMIT_SHA=$CIRCLE_SHA1 --app $DEVELOPMENT'  + '\n' +
  'heroku config:set NOW_URL="https://eazecom-development.herokuapp.com" --app $DEVELOPMENT'  + '\n' +
  'heroku config:set EAZE_ENVIRONMENT="development" --app $DEVELOPMENT'  + '\n' +
  'git push git@heroku.com:$DEVELOPMENT.git HEAD:master --force'

const heroku_prod =
  'heroku config:set COMMIT_SHA=$CIRCLE_SHA1 --app $PRODUCTION' + '\n' +
  'heroku config:set NOW_URL="https://eazecom-production.herokuapp.com" --app $PRODUCTION' + '\n' +
  'heroku config:set EAZE_ENVIRONMENT="production" --app $PRODUCTION' + '\n' +
  'git push git@heroku.com:$PRODUCTION.git HEAD:master --force'
