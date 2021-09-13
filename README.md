# logger-demo

A demo logging for Node,js

You can clone this repository and do

`npm install for installing necessory modules

Run the Application

`npm start

2 API's Implemented

1. Signup -
2. Get user list -

You can see the results as below
Example REST API's

curl --header "Content-Type: application/json" \
 --request POST \
 --data '{"email":"yasas@gmail.com","password":"xyz"}' \
 http://localhost:3000/auth/signup

Not Authenticated request for get users
curl http://localhost:3000/api/users

Auth request for get users
curl --header "Authorization: Bearer token" \
 --request GET \
 http://localhost:3000/api/users | json_pp
