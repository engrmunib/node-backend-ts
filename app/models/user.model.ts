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

    toJSON(): any {
        const data: any = super.toJSON();
        // delete data.password;
        return data;
    }

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
    date_added: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    date_updated: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'users',
    timestamps: false
});
