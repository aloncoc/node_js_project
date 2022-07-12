$(document).ready(function () {
  $.ajax({ url: "/reports" }).then(
    function (reports) {
      console.log(reports);
      const report_ls = reports.reports;
      const reports_table = $("#reports");
      reports_table.find("tr:gt(0)").remove();
      $.each(report_ls, (i, report) => {
        reports_table.append(
          `<tr><td class="fw-bold">${report.id}</td>
               <td class="fw-bold">${report.license_plate}</td>
               <td class="fw-bold">${report.driver_id}</td>
               <td class="fw-bold">${report.speed}</td>`
        );
      });
    },
    function (err) {
      console.log(err);
    }
  );
});
