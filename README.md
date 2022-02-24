# Local Setup

## Dependencies
You need docker for this to work on your local. If you have docker, you can technically skip out on installing any other dependencies.

You also need ngrok to get events into your system.

## How to set this up in local?

Go to slack and create a new app. Lets call this new app `Marbles`

copy over the app manifest from manifest.json file present here into the app manifest (JSON format)

copy the CLIENT ID and CLIENT SECRET into the docker compose file environment

then just run

`docker-compose up`

The application port will be at http://localhost:3003

You have to run `ngrok http 3003`

and copy over the port forwarded ngrok url to the manifest inside slack app. 

Note: Do not forget the `/events` part when you do this 

## How do I install the slack application in local

go to http://localhost:3003/auth

This will open up install into workplace folder

after install to workplace, you will set it hitting https://localhost:3003/callback and breaking, since its not exposed to https

Just modify the url by replacing https with http and your slack application will get connected