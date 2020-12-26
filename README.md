# mini-crm

## How to start

### Development:

- Customize API location in `src/shared/configuration.ts` (this should be changed to an environment variabel)
- Install NPM packages `npm install`
- Run application `npm start`
- Application becomes availabe on port 3000 (http://localhost:3000)

### Production:

- Build Docker image (see Dockerfile) use a build arg to set the API location, for example: `docker build --build-arg API_URL=http://localhost:8000/api .`
- Please note that the API_URL is part of the image and is not overridable with an environment variabel on container creation. In fact this means that you can not run the same container for acceptance and production. You should rebuild your container with the right build args.
- Create container
- Start container, the application will be exported under port 80

