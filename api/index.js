//                       |||
//                    |||||||||
//                       |||
//                       |||
//                       |||
//                       
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001 recuerda de setear el force: true'); // eslint-disable-line no-console
  });
});
