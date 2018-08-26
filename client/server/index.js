const app = require('./app');

const PORT = process.env.SSR_SERVER_PORT || 3001;

app.listen(PORT, () => {
  console.log(`CRA Server listening on port ${PORT}!`);
});
