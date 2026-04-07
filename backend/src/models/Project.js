module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Project',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      slug: { type: DataTypes.STRING(120), unique: true },
      title: { type: DataTypes.STRING(255), allowNull: false },
      summary: { type: DataTypes.TEXT, allowNull: false },
      stack: DataTypes.STRING(512),
      url: DataTypes.STRING(2048),
      display_order: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { tableName: 'projects' }
  );
};
