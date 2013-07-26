Node.js - Mongoose - MongoDB
============================

Silly REST app using Node.js, Express, Mongoose and MongoDB database.

This is sample app from my blog post (indonesian) at

http://www.junwatu.com/2013/07/27/restful-service-menggunakan-node-js-mongoose-mongodb/


Install
-------

Make sure MongoDB database server is running then

```
$ cd koneksi-node-mongodb
$ npm install
$ node app.js
```


REST
----

REST operation can be tested using ordinary `curl` or best with `httpie`. Ok l am using `httpie` because
it has better format for json data.

###GET

Get all `persons` data

```
$ http localhost:3300/persons
```

###PUT

Update data record. Example for username `morbid_angel`

```
$ http --json PUT localhost:3300/persons/morbid_angel name="Equan Pr." website=http://www.junwatu.com
```

###DELETE
To delete record based on username

```
$ http DELETE localhost:3300/persons/morbid_angel
```

###POST

Create new person data

```
$ http --form POST localhost:3300/persons name="Anyone Yo" website=http://dude.com username=dude
```

Demo
----

Online Persons REST API service at http://persons-api.herokuapp.com/