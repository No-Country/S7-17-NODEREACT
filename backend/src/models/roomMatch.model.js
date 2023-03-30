const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const RoomMatch = db.define('room_match', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstParticipantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'first_participant_id'
    },
    secondParticipantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'second_participant_id'
    },
    dataRoom: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
        field: 'data_room'
    },
    typeGame: {
        type: DataTypes.ENUM('ramdon', 'friends')
    }
});

module.exports = RoomMatch;
