import React, { useEffect, useState } from "react";
// var sdmxrest = require("sdmx-rest");

function FetchComponent() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const urlString =
      "https://api.data.abs.gov.au/data/RES_DWELL/3.1GSYD.Q?startPeriod=2019";
    fetch(urlString, {
      headers: { accept: "application/vnd.sdmx.data+json" },
    })
      .then((response) => response.json())
      .then((dataString) => {
        const periods =
          dataString.data?.structure?.dimensions?.observation?.[0].values;
        const valuesObj =
          dataString.data?.dataSets?.[0].series["0:0:0"].observations;
        const entries = periods.map((period, index) => {
          return {
            period: period.name,
            value: valuesObj[index][0],
          };
        });
        setData(entries);
      });
  }, []);

  // useEffect(() => {
  //   var query = { flow: "EXR", key: "A.CHF.EUR.SP00.A" };

  //   sdmxrest
  //     .request(query, "ECB")
  //     .then(function (data) {
  //       console.log(data);
  //     })
  //     .catch(function (error) {
  //       console.log("something went wrong: " + error);
  //     })  
  // }, []);
  return (
    <div>
      <p>Fetched Data</p>
      <ol>
        {data &&
          data.map(({ period, value }) => (
            <li key={period}>
              <p>{period}</p>
              <p>{value}</p>
            </li>
          ))}
      </ol>
    </div>
  );
}

export default FetchComponent;
