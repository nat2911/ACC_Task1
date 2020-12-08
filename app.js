// jshint esversion: 6

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'fruitsDB';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(function(err) {
	assert.equal(null, err);
	console.log('Connected successfully to server');

	const db = client.db(dbName);

	insertDocuments(db, function() {
    // client.close();
  });

  findDocuments(db, function() {
    client.close();
  });

});

const insertDocuments = function(db, callback) {
  const collection = db.collection('fruits');

  collection.insertMany(
    [
      {
        name: "Apple",
        score: 8,
        review: "Great fruit"
      },
      {
        name: "Orange",
        score: 6,
        review: "Kind of sour"
      },
      {
        name: "Banana",
        score: 9,
        review: "I like it very much"
      }
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Documents inserted successfully!");
    });
};

const findDocuments = function(db, callback) {

  const collection = db.collection('fruits');

  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};
