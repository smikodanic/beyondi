const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar'
    },
    email: {
      type: 'varchar',
      unique: true
    },
    email_verified: {
      type: 'boolean',
      default: false
    },
    password: {
      type: 'varchar'
    },
    role: {
      type: 'enum',
      enum: ['user', 'admin'],
      default: 'user'
    }
  }
});

module.exports = User;
