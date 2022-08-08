import React, { useEffect, useState } from "react";
// var MetadataDetail = require("sdmx-rest").metadata.MetadataDetail;
var sdmxrest = require("sdmx-rest");

const useFetchData = (query: any) => {
  const [status, setStatus] = useState<string>('idle');
  const [data, setData] = useState<any>(undefined);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      const service = sdmxrest.getService({ url: "https://api.data.abs.gov.au", api: "v1.0.0" });
      const url = sdmxrest.getUrl(query, service)
      console.log('url', url)
      setStatus('fetching');
      try {
        const response = await fetch(url, {
          headers: { accept: "application/vnd.sdmx.data+json" },
        });
        const data = await response.json();
        setData(data);
        setStatus('fetched');
      } catch (error) {
        setData(null);
        setError(error)
        setStatus('failed');
      }
    };

    fetchData();
  }, []);

  return { status, data, error };
};


export default useFetchData;
