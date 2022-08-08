import React, { useEffect, useState } from "react";
// var MetadataDetail = require("sdmx-rest").metadata.MetadataDetail;
var sdmxrest = require("sdmx-rest");

function FetchComponent() {
  const [data, setData] = useState<any>(null);
  const [dataFlows, setDataFlows] = useState<any>([])

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

  useEffect(() => {
    const ABS = sdmxrest.getService({ url: "https://api.data.abs.gov.au", api: "v1.0.0" });
    const dataFlowListQuery = `${ABS.url}/dataflow/ABS`
    fetch(dataFlowListQuery, {
      headers: { accept: "application/vnd.sdmx.structure+json" },
    })
      .then((response) => response.json())
      .then(data => { console.log(data.data.dataflows); setDataFlows(data.data.dataflows) })
      .catch(error => console.log(error))
  }, []);
  
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
      <ol>
        {dataFlows &&
          dataFlows.map((flow) => (
            <li key={flow.id}>
              <p>{flow.id}</p>
            </li>
          ))}
      </ol>
    </div>
  );
}

export default FetchComponent;
