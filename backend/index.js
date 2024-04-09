require('dotenv').config();
require('reflect-metadata');
const fastify = require('fastify');
const { createConnection } = require('typeorm');
const app = fastify({ logger: false });


/** start the API HTTP server */
const start = async () => {
  try {
    global.connection = await createConnection();

    await app.listen({ port: 3000 });
    app.log.info(`Server listening on ${app.server.address().port}`);
  } catch (err) {
    console.log(err);
    app.log.error(err);
    process.exit(1);
  }
};
start();


/** routes */
const verifyToken = require('./routes/handlers/verifyToken.js');
const hasRoles = require('./routes/handlers/hasRoles.js');


const usersCommon = require('./routes/usersCommon.js');
app.post('/users/register', { schema: { body: usersCommon.usersRegisterSchema } }, usersCommon.register);
app.post('/users/login', { schema: { body: usersCommon.usersLoginSchema } }, usersCommon.login);

// user routes
const dashboardU = require('./routes/user/dashboard.js');
app.get('/user/dashboard', { preHandler: [verifyToken, hasRoles.userRole] }, dashboardU);

// admin routes
const dashboardA = require('./routes/admin/dashboard.js');
app.get('/admin/dashboard', { preHandler: [verifyToken, hasRoles.adminRole] }, dashboardA);
