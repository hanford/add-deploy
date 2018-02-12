ENV=$1

FEATURE=feature
DEVELOPMENT=eazecom-development
PRODUCTION=eazecom-production

if [[ "$ENV" == "feature" ]]; then
  # now_feature

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
