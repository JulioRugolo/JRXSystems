const { Project } = require('../models');

async function listActive() {
  const rows = await Project.findAll({
    where: { active: true },
    order: [
      ['display_order', 'ASC'],
      ['title', 'ASC'],
    ],
    attributes: ['id', 'slug', 'title', 'summary', 'stack', 'url', 'display_order'],
  });
  return rows;
}

module.exports = { listActive };
