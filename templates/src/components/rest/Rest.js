import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { useHistory, useParams, Redirect } from "react-router-dom";

import config from '../../../config';
import './Rest.scss';

function Rest(props) {
  const [getData, setGetData] = useState();
  const [getQuery, setGetQuery] = useState();
  const [getPath, setGetPath] = useState();
  const [postData, setPostData] = useState();
  const [postDataObject, setPostDataObject] = useState();
  const [postMongo, setPostMongo] = useState();
  const [getMongo, setGetMongo] = useState();

  const history = useHistory();
  const params = useParams();

  const expressURL = `${config.express.url}:${config.express.port}`;
  const username = params.name;

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
    <div className="rest-container">
      <div className="details-container">
        <div>{`Username from route: ${username}`}</div>
        <button className="home-button" onClick={() => history.push('/')}>Go to home</button>
        { username === 'redirect' ? <Redirect to="/" /> : null }
      </div>

      <h3>Express Endpoints</h3>

      <table>
        <thead>
          <th className="small">Type</th>
          <th className="medium">URL</th>
          <th className="medium">Body</th>
          <th className="large">Response</th>
        </thead>
        <tbody>
          <tr>
            <td>GET</td>
            <td>/test</td>
            <td>--</td>
            <td>{getData}</td>
          </tr>

          <tr>
            <td>GET</td>
            <td>/test/query?test=llama</td>
            <td>--</td>
            <td>{getQuery}</td>
          </tr>

          <tr>
            <td>GET</td>
            <td>/test/path/:test</td>
            <td>--</td>
            <td>{getPath}</td>
          </tr>

          <tr>
            <td>POST</td>
            <td>/test</td>
            <td><code>{`{ test: 'post-test' }`}</code></td>
            <td>{postData}</td>
          </tr>

          <tr>
            <td>POST</td>
            <td>/test/returnObject</td>
            <td><code>{`{ one: 'one', two: 'two' }`}</code></td>
            <td><code>{JSON.stringify(postDataObject, undefined, 2)}</code></td>
          </tr>

          <tr>
            <td>POST</td>
            <td>/mongo/test</td>
            <td><code>{`{ test: 'llama' }`}</code></td>
            <td><code>{JSON.stringify(postMongo, undefined, 2)}</code></td>
          </tr>

          <tr>
            <td>GET</td>
            <td>/mongo/test/recent</td>
            <td>--</td>
            <td><code>{JSON.stringify(getMongo, undefined, 2)}</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Rest;
