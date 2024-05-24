'use strict';

const db = require('../../models'); // Import your User model

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        firstName: 'Default',
        lastName: 'Nobody',
        email: 'default@email.com',
        password: 'defaultPassword',
      },
    ];

    await Promise.all(
      users.map(async (user) => {
        await db.User.create(user);
      }),
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
