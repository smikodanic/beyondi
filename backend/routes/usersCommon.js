const User = require('../entities/User.js');
const authLib = require('../lib/authLib.js');

// Define schema for request body validation
module.exports.usersSchema = {
  type: 'object',
  required: ['name', 'email', 'password'],
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 }
  }
};


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
