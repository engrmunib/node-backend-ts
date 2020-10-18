import * as bcrypt from "bcryptjs"
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db'

export interface userInterface {
  user_id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class User extends Model<userInterface> {
  user_id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  password?: string;

  async hashPassword() {
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password || '', 12);
  }

  async verifyPassword (
    candidatePassword: string,
    userPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

}

User.init({
  user_id: {
    type: DataTypes.INTEGER,
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

export default User;

