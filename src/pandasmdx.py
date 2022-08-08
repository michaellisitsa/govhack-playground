# %%
from pandasdmx import Request
import matplotlib.pyplot as plt

Agency_Code = 'ABS_XML'
# Dataset_Id = 'ATSI_BIRTHS_SUMM'
Dataset_Id = 'RES_DWELL'
ABS = Request(Agency_Code)
data_response = ABS.data(resource_id='RES_DWELL/3.2GMEL.Q',
                         params={'startPeriod': '2016'})

# This will result in a pandas Series with multiIndex
df = data_response.to_pandas()
# This will convert it to a conventional dataframe
df_new = df.reset_index()

# %%
plt.figure()
df.plot(x="TIME_PERIOD", y="value")
plt.savefig("graph.png")
plt.show()

# %%
