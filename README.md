# Personal Website Backend

### Serverless Netlify function used to proxy requests on behalf of frontend.

## Prerequisites
- Node V12.x.x 
- Yarn


## Installation
- Copy `.env.example` --> `.env`
- `yarn`
- `yarn start`
- Go to `http://localhost:9000` Should see a JSON response of hello world!


## Deployment
- Setup repo with [Netlify](https://www.netlify.com/)
- Add `.env` variables to the Netlify build config
- Set public directory to `public`
- Set build command to be `yarn build`
- when built, browse to cloud function.
