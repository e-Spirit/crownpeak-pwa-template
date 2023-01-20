# fsxa-nuxt3-pwa

## Get Started

### Prequisites

You need Node v18.x.x

### Setup

1. Create a `.env` file at root level and paste your environment variables according to `.env.template`
2. Install dependencies with `npm install`
3. Run PWA in development mode: `npm run dev`

To Run the PWA in production mode run:

1. Build the project `npm run build`
2. Run the PWA `npm run start`

## Docker

Before you can run the docker image, make sure that you have created a `.env` file at root level and pasted your environment variables according to `.env.template`.

To build the docker image run:

`docker build -t fsxa-nuxt3-pwa -f Dockerfile.template .`

To run the docker imagedas  run:

`docker run --env-file .env -p 3000:3000 fsxa-nuxt3-pwa`

## Deployment


By default customers are provided with a _DQP_ setup: _Development_, _Quality Assurance_, and _Production_. They get a _git_ repository with corresponding branches. In the FSXA default setup all that is required to deploy changes to a PWA is pushing changes - the PWA will automatically be built and deployed. With FirstSpirit’s pattern of "`preview`" and "`release`" states for project contents this setup leeds to three times two = six PWA instances per project.

### Running the application in a production environment
In the deployment process Crownpeak Technology uses Docker to containerize the applications.
To verify your pwa is compliant to the provided Dockerfile, you can use the Dockerfile.template.
You just need to create your `.env` file according to `.env.template` with your own values.

Once you have your `.env` file ready, execute `docker build -t fsxa-nuxt3-pwa -f Dockerfile.template .`

To check the compliance with the Crownpeak Technology build pipeline the image needs to be build and run locally.
You can then run the image locally with `docker run --env-file .env -p XXXX:3000 fsxa-nuxt3-pwa`
Where XXXX can be replaced with any free port on your machine.
When the container is running, visit localhost:XXXX in a browser and the pwa should show up.

Please note:
Due to security aspects providing a custom Dockerfile will stop the build pipeline.
Make sure not to commit a Dockerfile (Dockerfile.template is okay) to your project's repository.
