const jwt = require('jsonwebtoken');
const User = require('../../entities/User.js');


/**
 * Use HTTP header: JWT <token>
 * for example: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJpYXQiOjE3MTI2NTM5MTh9.MR8rAayOqYVfakrYZjaDfzJ0wQwkgtnwGvhfDutp2BE
 */
const verifyToken = async (request, reply) => {
  try {
    const { authorization } = request.headers;

    if (!authorization || !authorization.startsWith('JWT ')) {
      reply.code(401).send({ success: false, message: 'Unauthorized' });
      return;
    }

    const token = authorization.substring(4);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const where = { id: decoded.id, email: decoded.email };

    const userRepository = global.connection.getRepository(User);
    request.user = await userRepository.findOne({ where });

    if (!request.user) { throw new Error('Bad token'); }

  } catch (err) {
    reply.code(401).send({ success: false, message: 'Unauthorized: ' + err.message });
    console.log(err);
  }
};

module.exports = verifyToken;
