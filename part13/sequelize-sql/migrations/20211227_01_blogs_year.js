const { DataTypes } = require('sequelize')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER
    })
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}