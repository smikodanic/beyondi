/**
 * Check if user has roles: user or admin.
 */
const adminRole = async (request, reply) => {
  try {
    const user = request.user;
    const role = user.role;

    if (role !== 'admin') { throw new Error(`User doesn't have "admin" role.`); }

  } catch (err) {
    reply.code(401).send({ success: false, message: 'Unauthorized: ' + err.message });
    console.log(err);
  }
};


const userRole = async (request, reply) => {
  try {
    const user = request.user;
    const role = user.role;

    if (role !== 'user') { throw new Error(`User doesn't have "user" role.`); }

  } catch (err) {
    reply.code(401).send({ success: false, message: 'Unauthorized: ' + err.message });
    console.log(err);
  }
};



module.exports = { adminRole, userRole };
