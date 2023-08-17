const { DataTypes } = require('sequelize')
const sequelize = require('./index')

const User = require('./userModel')

const Blog = sequelize.define('Blog', {
    imageSrc: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});

Blog.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = Blog;
