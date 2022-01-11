# Thumbnail Generator API

The Thumbnail Generator API is an application responsible for receiving an image file through a multipart/form-data POST call and to respond with three new image urls, each one with a different dimension (400x300, 160x120 and 120x120).

# Resources

This application was written in _Javascript/Typescript_ language, and is based on _Node.Js_.

[**Node.js**](https://nodejs.org/) is a _runtime_ environment for Javascript(JS), _open-source_ and cross-platform, used to run JS code outside of a web browser. It is an environment used to build scalable web applications, employing a non-blocking, event-oriented I/O model, making it fast and light in resources.

Whereas, [**TypeScript(TS)**](https://www.typescriptlang.org/), in short, is a strict syntactic _superset_ for JavaScript, allowing the code to declare static typing since JS does not have this property. The use of TS facilitates the identification of possible failures, even at compile time, in addition to making the code more concise, reliable and readable.

In addition to Node.js and TS as the main base features of this project, [**Jest**](https://jestjs.io/), a testing framework maintained by Facebook, was also added.

# Run

There are two way to running this application:

- Locally;
- Through Docker.

## Running Locally

### Prerequisites

- [npm (Node Package Manager)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [node >= 14.18.1](https://nodejs.org/)
- [tsc (TypeScript Compiler)](https://www.typescriptlang.org/download)

To run the application locally follow the steps below:

### 1. Set Env

First of all, set the environmental variables. Create a file **.env** in the path `proof-of-concept/thumbnail-generator-api/app` following the .env.template structure.

### 2. Install Dependencies

```bash
npm i
```

### 3. Build

```bash
npm run build
```

### 4. Run

```bash
npm run start
```

### Command Summary

```bash
npm i
npm run build
npm run start
```

## Running Through Docker

### Prerequisites

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Set Env (If not accomplished yet)

First of all, set the environmental variables. Create a file **.env** in the path `proof-of-concept/thumbnail-generator-api/app` following the `.env.template` structure.

### 2. Build 

```bash
npm run docker:up
```
The application will be available on port 3000.

### 3. Deploying (optional)

#### 3.1. Access the container

```bash
docker exec -it cont-thumbnail-gen-api sh

```

#### 3.2. Setup the AWS Credentials

```bash
serverless config credentials \
  --provider aws \
  --key <you-key> \
  --secret <you-secret>

```

#### 3.3. Run deploy

```bash
npm run sls:deploy
```


### Command Summary

```bash
npm run docker:up
docker exec -it cont-thumbnail-gen-api sh
```

# Deploying from local

To deploy the app to AWS Lambda run:

```bash
npm run sls:deploy
```

# Testing

To run the available tests you must run:

```bash
npm run test
```