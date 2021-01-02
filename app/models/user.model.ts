import * as bcrypt from "bcryptjs"
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db'


export class User extends Model {
    user_id!: number;
    username!: string;
    password!: string;
    name ? : string;
    phone!: string;
    address!: string;

    async hashPassword() {
        // Hash the password with cost of 12
        this.password = await bcrypt.hash(this.password || '', 12);
    }

    async verifyPassword(candidatePassword: string) {
        return await bcrypt.compare(candidatePassword, this.password);
    };

}

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(11),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(512),
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'users',
    timestamps: false
});
