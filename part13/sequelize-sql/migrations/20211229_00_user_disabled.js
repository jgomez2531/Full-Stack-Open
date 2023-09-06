const { DataTypes } = require('sequelize')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    })
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'disabled')
  },
}