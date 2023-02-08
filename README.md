# 365-talents-technical-test
365Talents technical test API consumption

The goal of this project is to demonstrate the ability to consume a given API (365Talents) through another API.

## Getting started

### Requirements
Please before starting make sure you have Docker and node installed
 - [Docker](https://docs.docker.com/get-docker/)
 - [NodeJs](https://nodejs.org/en/)

To ensure both are installed you can run these commands in a terminal and expect similar results:
```shell
$> docker-compose -v
docker-compose version 1.29.2, build 5becea4c
```
```shell
$> node -v
v16.15.0
```
```shell
$> npm -v
8.5.5
```

### Launch Docker

In order to launch the project just run this command in the root folder of the project

```shell
$> docker-compose up
```

### Compiling manually

To compile manually and see if there is typescript errors please run from the root folder:
```shell
$> cd ./app/src
$> npm i
```

After the end of the installation run:
```shell
$> npm run build
```

If there is no errors a dist folder should appear in the hierarchy.

This folder will contain your API compiled from the typescript one.
