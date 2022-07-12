const connectedKnex = require("./knex-connector");
const { logger } = require("./logger");

function getAllReports() {
  logger.debug("user requested all reports.");
  return connectedKnex("reports").select("*");
}

function getReportByid(id) {
  logger.debug(`user selected the report with id ${id}`);
  return connectedKnex("reports").select("*").where("id", id).first();
}

function getReportByParams(license_plate, driver_id, speed) {
  if (license_plate | driver_id | speed) {
    logger.debug(
      `user selected the report with the params license_plate: ${license_plate}, driver_id: ${driver_id}, speed: ${speed}`
    );
    return connectedKnex("reports")
      .select("*")
      .where("license_plate", license_plate)
      .orWhere("driver_id", driver_id)
      .orWhere("speed", speed);
  } else {
    logger.debug("user requested all reports.");
    return connectedKnex("reports").select("*");
  }
}

function getRaw(query) {
  logger.debug(`user requested ${query}.`);
  return connectedKnex.raw(query);
}

function addReport(report) {
  logger.debug(`user added ${report}.`);
  return connectedKnex("reports").insert(report);
}

function updateReport(report, id) {
  logger.debug(`user updated report ${id} ${report}.`);
  return connectedKnex("reports").where("id", id).update(report);
}

function deleteReport(id) {
  logger.debug(`user deleted report ${id}.`);
  return connectedKnex("reports").where("id", id).del();
}

module.exports = {
  getAllReports,
  getReportByid,
  getReportByParams,
  getRaw,
  addReport,
  updateReport,
  deleteReport,
};
