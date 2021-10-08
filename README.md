#  Project execution instructions

## First npm i on your terminal

## Then create a file in the root called .env where your configuration will be

## The necessary settings will be:
#### PORT  #default-8000  #REQUIRED
#### PORT_TLS  #default-465  #REQUIRED
#### TOKEN_SECRET  #REQUIRED
#### TOKEN_EXPIRES  #REQUIRED
#### TOKEN_TEST  #REQUIRED-FOR_TESTS
#### DB_USER    #REQUIRED
#### DB_PASSWORD    #REQUIRED
#### DB_DATABASE    #REQUIRED
#### PORT_DATABASE
#### PORT_DATABASE_AWS
#### DATABASE_URL
#### DB_DATABASE_AWS
#### HOST    #REQUIRED
#### DIALECT    #REQUIRED-POSTGRES
#### TIMEZONE    #MAY-BE-COMING

## After that enter run npm start and enter https://localhost:port/api-docs