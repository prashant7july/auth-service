curl --location --request GET 'http://localhost:4041/api/health-check'

curl --location --request POST 'http://localhost:4041/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "prashant7july",
    "password": "asdasd"
}'

curl --location --request POST 'http://localhost:4041/api/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "XYX",
    "name": "Ravi Dev",
    "email": "ravi@dev.com",
    "password": "test123",
    "password_confirmation": "test123"
}'