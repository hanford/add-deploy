ENV=$1

FEATURE=feature
DEVELOPMENT=eazecom-development
PRODUCTION=eazecom-production

if [[ "$ENV" == "feature" ]]; then
  # now_feature
  echo Deploying to now.sh
  FEATURE_ENV=`now -t $NOW_TOKEN --team eaze -e COMMIT_SHA=$CIRCLE_SHA1`
  printf "\n" # print new line!
  echo Environment: $FEATURE_ENV
  echo Begin runnin bundle-cop
  github --comment 'Now Environment' --link $FEATURE_ENV
  # bundle-cop --branch origin/master --circleci true --link $FEATURE_ENV
fi

if [[ "$ENV" == "development" ]]; then
  # now_development

  # heroku_development
fi

if [[ "$ENV" == "production" ]]; then
  # now_production

  # heroku_production
fi
