import { DataTypes, Model } from 'sequelize';
import sequelize from '../db'


export class AuthSession extends Model{
    session_id!: number;
    user_id!: number;
    date_added?: number;
    date_updated?: number;
}

AuthSession.init({
    session_id: {
        type: DataTypes.STRING(32),
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
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
    modelName: 'auth_sessions',
    timestamps: false
});
