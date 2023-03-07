
# pulpo-challenge




## Deployment

Se agregó un archivo de configuración para que se realice el deploy por medio de github actions al mezclar algún PR al branch de dev 

El endpoint está hosteado en aws y se usó serverless y layers



## Documentation Swagger

[Swagger](https://dev-pulpo-challenge-api-docs.s3.amazonaws.com/api-pulpo-challenge/index.html#/contributions/getContributions)



## Postman collection Test

[Postman collection](https://www.postman.com/eganteg/workspace/pulpo-challenge/collection/2612604-f3f1b8cf-e365-47a6-91af-f3fbb2da5df2?action=share&creator=2612604)



## Demo


GET URL: https://k52t1kfbp5.execute-api.us-east-1.amazonaws.com/dev/contributions?countryCode=SD

CURL: curl -X 'GET' \
  'https://k52t1kfbp5.execute-api.us-east-1.amazonaws.com/dev/contributions' \
  -H 'accept: application/json'
## Run Locally

Clone the project

```bash
  git clone https://github.com/dresded/pulpo-challenge.git
```

Go to the project directory

```bash
  cd pulpo-challenge
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  yarn dev
```


## Running Tests

To run tests, run the following command

```bash
  yarn test
```

