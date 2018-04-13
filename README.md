# BuyMe API

## Prepare enviroment to run application

Download and install both applications from urls
- https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.4.4-signed.msi
- https://robomongo.org/ it's for mongoDB management

After installing applications create directory `C:/data/db`

Run mongodb server by running file `mongod.exe` in directory `C:/Program Files/MongoDB/Server/VERSION/bin`

## Run BuyMe API

To run API use `npm start` or `node server.js` from terminal.

## Example routes
- GET `http://localhost:1337/hello` - returns list of elements from database
- GET `http://localhost:1337/hello/id` - returns element by id
- POST `http://localhost:1337/hello` - adds element to database, example body: `json(application/json)` `{"name": "Janusz"}`
- PUT `http://localhost:1337/hello/id` - edits element in database, example body: `json(application/json)` `{"name": "JanuszNewName"}`
- GET `http://localhost:1337/auth/login` - OpenId Login

##Login to OpenId
- When application is started user should be redirected to `http://localhost:1337/auth/login`. There is OpenId Login screen. After that user is redirected to FE application with token in link eg. `http://localhost:8080/?token=76cbf6276a928ac5bc26429b8de23abc5368253b` and token should be extracted from the link and be saved in Localstorage/Cookies.
- Every request other than `http://localhost:1337/auth/*` should have header `Authorization: Bearer TOKEN`. It's checked on BE and if it's ok BE returns proper request data, otherwise BE redirects user to OpenId Login page.