import requests
# import pandasdmx as sdmx

urlString = "https://api.data.abs.gov.au/data/RES_DWELL/3.1GSYD.Q?startPeriod=2019"
response = requests.get(urlString,
                        headers={"Accept": "application/vnd.sdmx.data+json"})
json_response = response.json()
periods = json_response['data']['structure']['dimensions']['observation'][0]['values']
valuesObj = json_response['data']['dataSets'][0]['series']["0:0:0"]['observations']
entries = [[period['name'], valuesObj.get(
    str(i))[0]] for i, period in enumerate(periods)]

print(entries)

# abs = sdmx.Request('ABS_XML')
# metadata = abs.datastructure('')