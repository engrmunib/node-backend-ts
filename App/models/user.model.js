const bcrypt = require("bcryptjs");
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db')

class User extends Model {
  async hashPassword() {  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  }

  async verifyPassword (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

}

User.init({
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Users',
  timestamps:false
});

module.exports = {User}

