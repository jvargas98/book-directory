module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Books', // table name
      'userId', // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Books', 'userId');
  },
};
