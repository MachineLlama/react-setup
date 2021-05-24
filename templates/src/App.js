import React, { useEffect, useState } from 'react';
import superagent from 'superagent';

import config from '../config';
import './App.scss';

function App() {
  const [getData, setGetData] = useState();
  const [getQuery, setGetQuery] = useState();
  const [getPath, setGetPath] = useState();
  const [postData, setPostData] = useState();
  const [postDataObject, setPostDataObject] = useState();
  const [postMongo, setPostMongo] = useState();
  const [getMongo, setGetMongo] = useState();

  const expressURL = `${config.express.url}:${config.express.port}`;

  useEffect(() => {
    superagent.get(`${expressURL}/test`).then(response => {
      setGetData(response.text);
    });

    superagent.get(`${expressURL}/test/query?test=llama`).then(response => {
      setGetQuery(response.text);
    });

    superagent.get(`${expressURL}/test/path/42`).then(response => {
      setGetPath(response.text);
    });

    superagent.post(`${expressURL}/test`, { test: 'post-test' }).then(response => {
      setPostData(response.text);
    });

    superagent.post(`${expressURL}/test/returnObject`, { one: 'one', two: 'two' }).then(response => {
      setPostDataObject(response.body);
    });

    superagent.post(`${expressURL}/mongo/test`, { test: 'llama' }).then(response => {
      setPostMongo(response.text);
    });

    superagent.get(`${expressURL}/mongo/test/recent`, {}).then(response => {
      setGetMongo(response.body);
    });
  }, []);

  return (
    <div className="app">
      <div>Hello World!</div>

      <h3>GET Express endpoints</h3>

      <div><b>Simple GET, /test</b></div>
      <div>{getData}</div>
      <br/>

      <div><b>GET with query, /test/query?test=llama</b></div>
      <div>{getQuery}</div>
      <br/>

      <div><b>GET with path variable, /test/path/:test</b></div>
      <div>{getPath}</div>
      <br/>

      <h3>POST Express endpoints</h3>

      <div><b>POST with body.test = 'post-test'</b></div>
      <div>{postData}</div>
      <br/>
      
      <div><b>POST and return an object in response</b></div>
      <div>Response object: {JSON.stringify(postDataObject)}</div>
      <br/>

      <h3>POST Express MongoDB endpoints</h3>

      <div><b>POST Insert new document (creates db and collection if they don't exist)</b></div>
      <div>{postMongo}</div>
      <br/>

      <div><b>GET most recent document</b></div>
      <div>{JSON.stringify(getMongo)}</div>
      <br/>
    </div>
  )
}

export default App;
