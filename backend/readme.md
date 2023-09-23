# go-wschat/backend

## Routes

* `/auth`
  * `/signup`
  * `/login`
  * `/logout` 
* `/user`
  * `/me`
  * `/{id}`
* `/ws`

## Sample requests

Create new user
```
curl -i -d '{"username": "wbydc", "password": "wschat"}' http://localhost:3000/auth/signup
```

Login
```
curl -i -d '{"username": "wbydc", "password": "wschat"}' http://localhost:3000/auth/login
```

Get current user
```
curl -i -b "token=<token>" http://localhost:3000/user/me
```
