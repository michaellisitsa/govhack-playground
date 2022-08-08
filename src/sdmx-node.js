var sdmxrest = require("sdmx-rest");

var query = { flow: "EXR", key: "A.CHF.EUR.SP00.A" };

sdmxrest
  .request(query, "ECB")
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.log("something went wrong: " + error);

  });