module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'ContactMessage',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(255), allowNull: false },
      email: { type: DataTypes.STRING(255), allowNull: false },
      phone: { type: DataTypes.STRING(50), allowNull: false },
      company: DataTypes.STRING(255),
      interest: DataTypes.STRING(255),
      message: { type: DataTypes.TEXT, allowNull: false },
    },
    { tableName: 'contact_messages' }
  );
};
