const express = require("express");
const { logger } = require("./logger");
const reports_repo = require("./reports-repo");
const path = require("path");

logger.debug("====== System startup ========");

const port = 8083;

const app = express();

app.use(express.static(path.join(".", "/static")));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

var swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reports", async (req, res) => {
  const reports = await reports_repo.getReportByParams(
    String(req.query.license_plate),
    Number(req.query.driver_id),
    Number(req.query.speed)
  );
  res.status(200).json({ reports });
});

app.post("/reports/raw", async (req, res) => {
  try {
    input = req.body;
    const result = await reports_repo.getRaw(input.query);
    res.status(201).json({
      res: "success",
      raws: result.rows,
    });
  } catch (e) {
    logger.error(`failed to run raw. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
});

app.get("/reports/:report_id", async (req, res) => {
  const report_id = req.params.report_id;
  const reports = await reports_repo.getReportByid(report_id);
  res.status(200).json({ reports });
});

app.delete("/reports/:report_id", async (req, res) => {
  const report_id = req.params.report_id;
  try {
    const reports = await reports_repo.deleteReport(report_id);
    res.status(200).json({ num_records_deleted: reports });
  } catch (e) {
    logger.error(`failed to delete report. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
});

app.put("/reports/:report_id", async (req, res) => {
  const report_id = req.params.report_id;
  try {
    report = req.body;
    const result = await reports_repo.updateReport(report, report_id);
    res.status(200).json({
      res: "success",
      url: `/reports/${report_id}`,
      result,
    });
  } catch (e) {
    logger.error(`failed to update report. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
});

app.post("/reports", async (req, res) => {
  try {
    report = req.body;
    const result = await reports_repo.addReport(report);
    res.status(201).json({
      res: "success",
      url: `/reports/${result[0]}`,
      result,
    });
  } catch (e) {
    logger.error(`failed to insert report. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
});

app.listen(port, () => {
  logger.info(`Listening on http://localhost:${port}`);
});
