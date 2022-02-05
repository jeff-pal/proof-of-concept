# Thumbnail Generator UI

The Thumbnail Generator UI is the application responsible for providing features to login, upload and the generated images. Through this app is possible upload a image, which will be resized in three new image, each one with a different dimension (400x300, 160x120 and 120x120).

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

First of all, set the environmental variables. Create a file **.env** in the path `proof-of-concept/thumbnail-generator-ui/app` following the `.env.template` structure.

### 2. Install Dependencies

```bash
npm i
```

### 2. Build

```bash
npm run build
```

### 3. Run

```bash
npm run serve
```

### Command Summary

```bash
npm i
npm run build
npm run serve
```

## Running Through Docker

### Prerequisites

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)


### 1. Set Env (If not accomplished yet)

First of all, set the environmental variables. Create a file **.env** in the path `proof-of-concept/thumbnail-generator-ui/app` following the `.env.template` structure.

### 2. Build 

```bash
npm run docker:up
```
The application will be available on port 3001.

#### 2.1. Access the container (if needed)

```bash
docker exec -it cont-thumbnail-gen-ui sh

```

### Command Summary

```bash
npm run docker:up
docker exec -it cont-thumbnail-gen-ui sh
```

# Testing

To run the available tests you must run:

```bash
npm run test
```