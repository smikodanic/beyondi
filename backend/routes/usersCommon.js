const jwt = require('jsonwebtoken');
const User = require('../entities/User.js');
const authLib = require('../lib/authLib.js');



/**
 * Register a new user with role admin or user
 * POST /users/register
 {
  "name": "Marko M",
  "email": "marko@net.hr",
  "password": "12345678"
 }
 */
module.exports.register = async (request, reply) => {
  try {
    // Extract user data from request body
    const { name, email, password } = request.body;

    // Get repository for User entity
    const userRepository = global.connection.getRepository(User);

    const password_enc = authLib.encrypt(password);

    // Create new user entity
    const newUser = userRepository.create({
      name,
      email,
      password: password_enc
    });

    // Save the new user to the database
    await userRepository.save(newUser);


    // Return success response
    return { success: true, message: 'User created successfully' };

  } catch (err) {
    console.log(err);
    return { success: false, error: 'ERR-/users/register::' + err.message };
  }
};


module.exports.registerSchema = {
  type: 'object',
  required: ['name', 'email', 'password'],
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 }
  }
};




/**
 *Login
 * POST /users/login
 {
  "email": "marko@net.hr",
  "password": "12345678"
 }
 */
module.exports.login = async (request, reply) => {
  try {
    const { email, password } = request.body;

    // Find user by email
    const userRepository = global.connection.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    const password_saved = user?.password;
    const pasword_sent_enc = authLib.encrypt(password);

    // If user not found or password doesn't match
    if (!user || password_saved !== pasword_sent_enc) {
      reply.code(401).send({ success: false, message: 'Invalid email or password' });
      return;
    }

    // Generate JWT token
    const jwtToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);

    delete user.password;
    const loggedUser = user;
    loggedUser.username = loggedUser.email;

    // Send token in response
    reply.send({ success: true, message: 'The login was succesful', jwtToken, loggedUser });

  } catch (err) {
    console.log(err);
    reply.code(500).send({ success: false, error: 'ERR-/users/register::' + err.message });
  }
};


module.exports.loginSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 }
  }
};
