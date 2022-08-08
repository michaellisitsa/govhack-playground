import React, { useEffect, useState } from "react";
var sdmxrest = require("sdmx-rest");
import useFetchData from "./useFetchData";

function FetchComponent() {
  const [dataFlows, setDataFlows] = useState<any>([])
  const ABS = sdmxrest.getService({ url: "https://api.data.abs.gov.au", api: "v1.0.0" });

  const { status, data, error } = useFetchData({
    flow: "RES_DWELL", key: "3.2GMEL.Q", start: 2019,
  })

  const periods =
    data?.data?.structure?.dimensions?.observation?.[0]?.values;
  const valuesObj =
    data?.data?.dataSets?.[0]?.series?.["0:0:0"]?.observations;
  const entries = data ? periods.map((period, index) => {
    return {
      period: period.name,
      value: `${valuesObj[index][0]}K`,
    };
  }) : [];

  useEffect(() => {
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
      <p>Fetched Data {status}</p>
      <ol>
        {entries &&
          entries.map(({ period, value }) => (
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
              <b>{flow.id}</b>
              <p>{flow.name.slice(0, 50)}</p>
            </li>
          ))}
      </ol>
    </div>
  );
}

export default FetchComponent;
