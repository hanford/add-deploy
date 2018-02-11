ENV=$1

FEATURE=feature
DEVELOPMENT=eazecom-development
PRODUCTION=eazecom-production

if [[ "$ENV" == "feature" ]]; then
  echo Deploying to now.sh
  FEATURE_ENV=`now -t $NOW_TOKEN --team eaze -e COMMIT_SHA=$CIRCLE_SHA1`
  printf "\n" # print new line!
  echo Environment: $FEATURE_ENV
  echo Begin runnin bundle-cop
  github --comment 'Now Environment' --link $FEATURE_ENV
  # bundle-cop --branch origin/master --circleci true --link $FEATURE_ENV
fi

if [[ "$ENV" == "development" ]]; then
  echo Deploying to now.sh
  DEV_ENV=`now -t ${NOW_TOKEN} --team eaze -e EAZE_ENVIRONMENT=development -e COMMIT_SHA=${CIRCLE_SHA1} --force`
  printf "\n" # print new line!
  echo Environment: $DEV_ENV
  echo Pointing dev-eaze.now.sh to $DEV_ENV
  now -t ${NOW_TOKEN} --team eaze alias $DEV_ENV dev-eaze

  echo Deploying staging to eaze.now.sh
  STAGING_ENV=`now -t ${NOW_TOKEN} --team eaze -e EAZE_ENVIRONMENT=production -e COMMIT_SHA=${CIRCLE_SHA1} --force`
  printf "\n" # print new line!
  echo Environment: $STAGING_ENV
  echo Pointing eaze.now.sh to $STAGING_ENV
  now -t ${NOW_TOKEN} --team eaze alias $STAGING_ENV eaze

  # heroku
  heroku config:set COMMIT_SHA=$CIRCLE_SHA1 --app $DEVELOPMENT
  heroku config:set NOW_URL='https://eazecom-development.herokuapp.com' --app $DEVELOPMENT
  heroku config:set EAZE_ENVIRONMENT='development' --app $DEVELOPMENT
  git push git@heroku.com:$DEVELOPMENT.git HEAD:master --force
fi

if [[ "$ENV" == "production" ]]; then
  echo Deploying production to www.eaze.com
  PROD_ENV=`now -t ${NOW_TOKEN} --team eaze -e EAZE_ENVIRONMENT=production -e COMMIT_SHA=${CIRCLE_SHA1} --force`
  printf "\n" # print new line!
  echo Environment: $PROD_ENV
  now -t ${NOW_TOKEN} --team eaze alias $PROD_ENV www.eaze.com

  # heroku
  heroku config:set COMMIT_SHA=$CIRCLE_SHA1 --app $PRODUCTION
  heroku config:set NOW_URL='https://eazecom-production.herokuapp.com' --app $PRODUCTION
  heroku config:set EAZE_ENVIRONMENT='production' --app $PRODUCTION
  git push git@heroku.com:$PRODUCTION.git HEAD:master --force
fi
