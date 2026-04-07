'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      UPDATE projects
      SET url = 'http://3dideas.com.br', updated_at = NOW()
      WHERE slug = '3dideas-erp';
    `);
    await queryInterface.sequelize.query(`
      UPDATE projects
      SET
        slug = 'vagaprime',
        title = 'VagaPrime',
        url = 'http://vagaprime.com.br',
        updated_at = NOW()
      WHERE slug = 'lojika';
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      UPDATE projects SET url = NULL, updated_at = NOW() WHERE slug = '3dideas-erp';
    `);
    await queryInterface.sequelize.query(`
      UPDATE projects
      SET slug = 'lojika', title = 'Lojika', url = NULL, updated_at = NOW()
      WHERE slug = 'vagaprime';
    `);
  },
};
