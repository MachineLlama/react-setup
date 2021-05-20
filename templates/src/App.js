const config = require('../../config');

module.exports = function() {
  return `import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import './App.scss';

function App() {
  const [getData, setGetData] = useState();
  const [getQuery, setGetQuery] = useState();
  const [getPath, setGetPath] = useState();
  const [postData, setPostData] = useState();
  const [postDataObject, setPostDataObject] = useState();

  useEffect(() => {
    superagent.get('http://localhost:${config.express.port}/test').then(response => {
      setGetData(response.text);
    });

    superagent.get('http://localhost:${config.express.port}/test/query?test=llama').then(response => {
      setGetQuery(response.text);
    });

    superagent.get('http://localhost:${config.express.port}/test/path/42').then(response => {
      setGetPath(response.text);
    });

    superagent.post('http://localhost:${config.express.port}/test', { test: 'post-test' }).then(response => {
      setPostData(response.text);
    });

    superagent.post('http://localhost:${config.express.port}/test/returnObject', { one: 'one', two: 'two' }).then(response => {
      setPostDataObject(response.body);
    });
  }, []);

  return (
    <div className="app">
      <div>Hello World</div>
      <h3>GET queries to Express</h3>
      <div>{getData}</div>
      <div>{getQuery}</div>
      <div>{getPath}</div>

      <h3>POST to Express</h3>
      <div>{postData}</div>
      <div>Return Object from POST: {JSON.stringify(postDataObject)}</div>
    </div>
  )
}

export default App;
`;
}