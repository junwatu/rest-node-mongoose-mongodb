Node.js - Mongoose - MongoDB
============================

Silly REST servie using Node.js and MongoDB database through Mongoose lib.


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

