require('reflect-metadata');
const fastify = require('fastify');
const { createConnection } = require('typeorm');
const User = require('./entities/User.js');
const app = fastify({ logger: false });


/** routes */
const usersCommon = require('./routes/usersCommon.js');


/**
 * Register a new user with role admin or user
 * POST /users/register
 {
  "name": "Marko M",
  "email": "marko1234@net.hr",
  "password": "12345"
 }
 */
app.post('/users/register', { schema: { body: usersCommon.usersSchema } }, usersCommon.register);



app.get('/users/list', async (request, reply) => {
  try {
    const userRepo = global.connection.getRepository(User);
    const users = await userRepo.find();
    console.log('users::', users);
    return users;
  } catch (error) {
    app.log.error(error);
    throw error;
  }
});




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
