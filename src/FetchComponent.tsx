import React, { useEffect, useState } from "react";

// type JSONResponse = {
//   data?: {
//     pokemon: Omit<
//   }
// }

function FetchComponent() {
  const [data, setData] = useState<string | null>(null);
  useEffect(() => {
    const urlString =
      "https://agipi.data.abs.gov.au/data/RES_DWELL/3.1GSYD.Q?startPeriod=2019";
    fetch(urlString, {
      headers: { accept: "application/vnd.sdmx.data+json" },
    })
      .then((response) => response.json())
      .then((dataString) => {
        setData(dataString.data.dataSets[0].series["0:0:0"]);
      });
  }, []);
  console.log("Data", data);
  return (
    <div>
      <p>Fetched Data</p>
      <ol>
        {data &&
          Object.entries(data.observations).map((key, value) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
      </ol>
      {/* <ol>
        {data && data.annotations.map((annotation) => <li>{annotation}</li>)}
      </ol> */}
      {/* <p>{data}</p> */}
    </div>
  );
}

export default FetchComponent;
