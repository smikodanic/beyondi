/**
 * GET /user/dashboard
 */
module.exports = async (request, reply) => {
  try {
    return { success: true, message: 'User dashboard' };

  } catch (err) {
    console.log(err);
    return { success: false, error: 'ERR-/user/dashboard::' + err.message };
  }
};
