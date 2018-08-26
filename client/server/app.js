import React from 'react';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import {
    createReactAppExpress,
} from '@cra-express/core';

const { default: App } = require('../src/App');
const clientBuildPath = path.resolve(__dirname, '../client');

let AppClass = App;

// you can use `async` function too
function handleUniversalRender(req, res) {
    const context = {};
    const stream = ReactDOMServer.renderToNodeStream(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );

    if (context.url) {
        res.redirect(301, context.url);
        return;
    }

    return stream;
}

const app = createReactAppExpress({
  clientBuildPath,
  universalRender: handleUniversalRender
});

if (module.hot) {
  module.hot.accept('../src/App', () => {
    const {App: AppForHot} = require('../src/App');
    AppClass = AppForHot;
    console.log('✅ Server hot reloaded App');
  });
}

module.exports = app;
