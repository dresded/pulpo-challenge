
# pulpo-challenge




## Deployment

Se agregó un archivo de configuración para que se realice el deploy por medio de github actions al mezclar algún PR al branch de dev 

El endpoint está hosteado en aws y se usó serverless y layers

Descripción: El endpoint puede recibir como parámetro “countryCode” de algún país que se quiera consultar sus aportaciones, si no se envía ninguno se buscará por default “SD” correspondiente a Sudán.

Para los años anteriores al año actual, la primera vez que se consulta la información, la información de las contribuciones se obtiene del API de “IATI” y se guarda en una BD ya que esta información no será modificada y es más rápida la consulta ya que no se tiene que volver a buscar y ordenar los datos.




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

