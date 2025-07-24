import { useState } from 'react';
import beaver from './assets/beaver.svg';
import './App.css';
import { client, RouterOutput } from './lib/orpcClient';
import { isDefinedError } from '@orpc/client';
import { assertNever } from '@repo/shared';

function App() {
  const [data, setData] = useState<RouterOutput['planet']['find'] | undefined>();

  async function sendRequest() {
    const [error, data] = await client.planet.find({ id: 2 });

    if (error) {
      if (!isDefinedError(error)) return alert('An unexpected error occurred. Please check the console for details.');
      switch (error.code) {
        case 'NOT_FOUND':
          return console.info(error);
        default:
          return assertNever(error.code);
      }
    }

    setData(data);
  }

  return (
    <>
      <div>
        <a href="https://github.com/stevedylandev/bhvr" target="_blank">
          <img src={beaver} className="logo" alt="beaver logo" />
        </a>
      </div>
      <h1>bhvr</h1>
      <h2>Bun + Hono + Vite + React</h2>
      <p>A typesafe fullstack monorepo</p>
      <div className="card">
        <div className="button-container">
          <button onClick={sendRequest}>Call API</button>
          <a className="docs-link" target="_blank" href="https://bhvr.dev">
            Docs
          </a>
        </div>
        {data && (
          <pre className="response">
            <code>
              Message: {data.id} <br />
              Success: {data.name.toString()}
            </code>
          </pre>
        )}
      </div>
    </>
  );
}

export default App;
