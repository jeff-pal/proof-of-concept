## Agenda

# Day 1

| Task                                                                 | Time    |
| -------------------------------------------------------------------- | ------- |
| Plan what to do                                                      | 00:30hs |
| Create aws account, get/config credentials and a create bucket       | 01:50hs |
| Create project - using my own npm package npx create-node-ts-project | 00:10hs |
| Implement http server                                                | 00:30hs |
| Test upload file with express + express-fileupload                   | 02:00hs |
| Setup and implement s3 instance                                      | 00:45hs |
| Implement and test s3 upload                                         | 02:00hs |
| Decide which resize buffer to use                                    | 00:35hs |
| Implement resize image                                                | 00:30hs |
|                                                                      |         |
| TOTAL                                                                | 08:50hs |


## Day 2

| Task                                             | Time    |
| ------------------------------------------------ | ------- |
| Cleaning the code                                | 01:00hs |
| Refactor                                         | 02:00hs |
|                                                  |         |
| TOTAL                                            | 03:00hs |


## Day 3

| Task                                             | Time    |
| ------------------------------------------------ | ------- |
| Implement tests for Image and Storage            | 02:00hs |
| Refactor                                         | 02:00hs |
| Implement new tests for Image and Storage        | 02:00hs |
| Mock, integration tests and dependency injection | 03:00hs |
|                                                  |         |
| TOTAL                                            | 09:00hs |


## Day 4

| Task                                             | Time    |
| ------------------------------------------------ | ------- |
| Refactor env                                     | 01:00hs |
| Fix env mock                                     | 02:30hs |
| Write env tests                                  | 01:30hs |
| Write tests/implement webs service               | 05:00hs |
|                                                  |         |
| TOTAL                                            | 10:00hs |


## Day 5

| Task                                             | Time    |
| ------------------------------------------------ | ------- |
| Uncouple web service from route handlers         | 02:30hs |
| Implement app.start test                         | 01:00hs |
| Refactor and implement new tests                 | 04:30hs |
|                                                  |         |
| TOTAL                                            | 08:00hs |


# Day 6

| Task                                             | Time    |
| ------------------------------------------------ | ------- |
| Refactor little test details                     | 01:00hs |
| Write resizeToThreeDimensionsController tests    | 01:30hs |
| Refactor resizeToThreeDimensionsController tests | 03:30hs |
| Implement and test deploy to lambda              | 02:40hs |
| Fix file-type and mimetype to work on lambda     | 03:00hs |
|                                                  |         |
| TOTAL                                            | 11:40hs |


## Day 7

| Task                                             | Time    |
| ------------------------------------------------ | ------- |
| Create aws-lambda-resize-image library           | 03:10hs |
| Refactor in general                              | 02:45hs |
| Improve lambda deploy settings                   | 01:20hs |
| Refactor tests                                   | 01:30hs |
|                                                  |         |
| TOTAL                                            | 08:45hs |

## Day 8

| Task                                             | Time    |
| ------------------------------------------------ | ------- |
| Create auth0 account and api/ui applications     | 00:30hs |
| Create ui app                                    | 00:30hs |
| Implement authentication in api/ui               | 03:30hs |
|                                                  |         |
| TOTAL                                            | 04:30hs |

## Day 9

| Task                                             | Time    |
| ------------------------------------------------ | ------- |
| Implement ui components basis                    | 02:20hs |
| Implement load and upload file                   | 03:20hs |
| Fix issues (cors, lambda, etc)                   | 01:50hs |
|                                                  |         |
| TOTAL                                            | 07:30hs |

## Day 10

| Task                                             | Time    |
| ------------------------------------------------ | ------- |
| Improve/refactor ui/api                          | 02:00hs |
| docker ui/api                                    | 02:30hs |
| deploy ui/api                                    | 01:30hs |
| setup swagger and write api docs                 | 02:30hs |
|                                                  |         |
| TOTAL                                            | 08:30hs |


## To Improve

About the dependencies, in a daily basis I would like to discuss with the team which dependencies worth it do adopt and which not. 

## Concerns

- I would improve the in-memory resized image buffers. 

- I would improve the file/folder structure by discussing with the team about the architecture and patterns adopted.

- Integrate Swagger Docs with Auth0