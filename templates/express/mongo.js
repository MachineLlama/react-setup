import { MongoClient } from 'mongodb';
import config from '../config';

export default function (app) {
  const mongoURL = `${config.mongo.url}:${config.mongo.port}`;

  app.post('/mongo/test', function (req, res) {
    const test = req.body.test;
    const dbName = 'test';
    const client = new MongoClient(mongoURL);

    client.connect(function (err) {
      if (err) {
        throw Error(`Error connecting to mongo, ${mongoURL}`);
      }

      const db = client.db(dbName);
      const collection = db.collection('test');

      collection.insertOne({ test, 'created_on': new Date() }, function (error, result) {
        if (error) {
          throw Error(`Error inserting document, ${error}`);
        }

        res.send(`Inserted ${result.insertedCount} document`);
      });

      client.close();
    });
  });

  app.get('/mongo/test/recent', function (req, res) {
    const dbName = 'test';
    const client = new MongoClient(mongoURL);

    client.connect(function (err) {
      if (err) {
        throw Error(`Error connecting to mongo, ${mongoURL}`);
      }

      const db = client.db(dbName);
      const collection = db.collection('test');

      collection.findOne({}, { sort: { "created_on": -1 }}, function (error, result) {
        if (error) {
          throw Error(`Error inserting document, ${error}`);
        }

        res.send(result);
      });

      client.close();
    });
  });
}
