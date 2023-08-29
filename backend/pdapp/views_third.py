from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import numpy as np
from matplotlib import pyplot as plt

@api_view(['GET'])
def pdnull(request):
    col  = ['col1','col2','col3','col4']
    row  = ['row1','row2','row3']
    data = [[1,2,pd.NA,4],
            [np.nan,6,7,8],
            [9,10,11,None]]
    df = pd.DataFrame(data,row,col)

    # isnull notnull 동일
    # print(df.isna())
    print(df.notna())

    return Response({'pdnull':'here'})