# add-deploy

Generate the deploy script / circle.yml boilerplate for node apps with an optional heroku failover

## Install

```sh
$ npm install -g add-deploy
```

## Usage

```sh
# Generate circle.yml and deploy.sh files
$ add-deploy

# deploy.sh script to deploy to now.sh
$ add-deploy --now

# deploy.sh script to deploy to now.sh and heroku
$ add-deploy --now --heroku
```

## License

MIT © [Jack Hanford](http://jackhanford.com)
