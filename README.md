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

### Docker

Before you can run the docker image, make sure that you have created a `.env` file at root level and pasted your environment variables according to `.env.template`.

To build the docker image run:

`docker build -t fsxa-nuxt3-pwa -f Dockerfile.template .`

To run the docker image run:

`docker run --env-file .env -p 3000:3000 fsxa-nuxt3-pwa`