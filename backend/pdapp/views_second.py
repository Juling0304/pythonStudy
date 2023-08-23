from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import numpy as np
from matplotlib import pyplot as plt

@api_view(['GET'])
def applymap(request):
    col = ['col1','col2','col3']
    row = ['row1','row2','row3']
    data = [[1,2,3],[4,5,6],[7,pd.NA,9]]
    df = pd.DataFrame(data=data,index=row,columns=col)

    print(df.applymap(lambda x : x**2, na_action='ignore'))
    
    return Response({'applymap':'here'})

@api_view(['GET'])
def pipe(request):
    org_data = pd.DataFrame({'info':['삼성전자/3/70000','SK하이닉스/2/100000']})

    print(org_data.pipe(code_name).pipe(value_cal,'원'))

    return Response({'pipe':'here'})

def code_name(data):
    result=pd.DataFrame(columns=['name','count','price']) 
    df = pd.DataFrame(list(data['info'].str.split('/')))
    result['name'] = df[0]
    result['count']= df[1]
    result['price']= df[2]
    result = result.astype({'count':int,'price':int})
    return result

def value_cal(data,unit=''):
    result = pd.DataFrame(columns=['name','value']) 
    result['name'] =data['name']
    result['value']=data['count']*data['price']
    result = result.astype({'value':str})
    result['value']=result['value']+unit
    return(result)

@api_view(['GET'])
def agg(request):
    # 여러 함수 한번에, axis 는 축 선택
    df = pd.DataFrame([[1,4,7],[2,5,8],[3,6,9]])
    ex = df.agg(['min','max','sum','prod'], axis=1)
    print(df)
    print(ex)

    return Response({'agg':'here'})

@api_view(['GET'])
def transform(request):
    col = ['col1','col2','col3']
    row = ['row1','row2','row3']
    df = pd.DataFrame(data=[[10,40,70],[20,50,80],[30,60,90]],index=row,columns=col)

    ex = df.transform(['exp','sqrt',lambda x: x + 1])
    print(ex)

    return Response({'transform':'here'})

@api_view(['GET'])
def loc(request):
    df = pd.DataFrame([[1,2,3], [4,5,6], [7,8,9]], index=['row1', 'row2', 'row3'], columns=['col1', 'col2', 'col3'])
    df.loc[df['col2'] > 3] = 'A'

    print(df)

    return Response({'loc':'here'})

@api_view(['GET'])
def head(request):
    data = np.random.randint(10,size=(10,10))
    df = pd.DataFrame(data=data)
    # print(df.head(3))
    # print(df.head(-3))
    # print(df.tail(3))
    print(df.tail(-3))
    return Response({'head':'here'})