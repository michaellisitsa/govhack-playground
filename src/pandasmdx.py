from pandasdmx import Request
import matplotlib.pyplot as plt

Agency_Code = 'ABS_XML'
# Dataset_Id = 'ATSI_BIRTHS_SUMM'
Dataset_Id = 'RES_DWELL'
ABS = Request(Agency_Code)
data_response = ABS.data(resource_id='RES_DWELL/3.2GMEL.Q',
                         params={'startPeriod': '2016'})

# This will result into a stacked DataFrame
# df = data_response.write(data_response.data.series, parse_time=False)
df = data_response.to_pandas()
df_new = df.reset_index()
# A flat DataFrame
# data_response.write().unstack().reset_index()
print(df_new.dtypes)

# %%
plt.figure()
df.plot(x="TIME_PERIOD", y="value")
plt.savefig("graph.png")
