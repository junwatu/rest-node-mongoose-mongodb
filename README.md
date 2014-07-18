Node.js - Mongoose - MongoDB
============================

Silly REST app using Node.js, Express, Mongoose and MongoDB database.


Install
-------

Make sure MongoDB database server is running then

```
$ cd rest-node-mongoose-mongodb
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
$ http localhost:5000/persons
```

###PUT

Update data record. Example for username `morbid_angel`

```
$ http --json PUT localhost:5000/api/persons/morbid_angel name="Equan Pr." website=http://equan.me
```

###DELETE
To delete record based on username

```
$ http DELETE localhost:5000/api/persons/morbid_angel
```

###POST

Create new person data

```
$ http --form POST localhost:5000/api/persons name="Anyone Yo" website=http://dude.com username=dude
```

Demo
----

Online Persons REST API service at http://persons-api.herokuapp.com/
