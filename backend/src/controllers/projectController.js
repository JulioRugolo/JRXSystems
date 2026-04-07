const projectService = require('../services/projectService');

async function listPublic(req, res, next) {
  try {
    const rows = await projectService.listActive();
    res.json(rows);
  } catch (e) {
    next(e);
  }
}

module.exports = { listPublic };
