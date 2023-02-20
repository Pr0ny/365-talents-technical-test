## src folder

The [src folder](./src/) contain all the source code of the project.

You'll find different folders:

| Folder     |                                               Usage                                                |
|:-----------|:--------------------------------------------------------------------------------------------------:|
| database   |                     Drivers for different database (mysql, redis, mariaDB...)                      |
| handlers   |                 Handlers for the routes. It defines the behaviour of each routes.                  |
| interfaces |                          The are the interfaces of the project's models.                           |
| libs       |                    Class that can be instantiated or used anywhere in the code.                    |
| models     | Implementation of the interfaces into logical code. Can be instantiated in every part of the code. |
| routes     |                    Each file defines a path with all the sub-routes available.                     |
| services   |               All code responsible for communicating with other web based services.                |
| validators |                              Joi validators for the handlers/routes.                               |

## Dockerfile

The dockerfile is decomposed on two parts. The first one starting at [line 1](./Dockerfile#L1) and end at [line 8](./Dockerfile#L8).

This part is responsible for building the project.

The second part is responsible for copying the project from the first image and the running it.

## Usage

For further instruction you can refer to [this file](./src/README.md)