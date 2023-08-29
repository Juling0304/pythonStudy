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

@api_view(['GET'])
def mortgage(request):
    principal = 500000.0 # 대출 총 금액
    rate = 0.05 # 연 이율
    payment = 2684.11 # 매 월 납입금
    total_paid = 0.0
    month = 0

    while principal > 0:
    # while 1 > month:
        principal = principal * (1+rate/12) - payment
        total_paid = round(total_paid + payment, 2)
        month = month + 1
        print('총 납입액 : ', total_paid, month, '회 납입')


    # print('Total paid', total_paid)
    # print('Total month', month)
    return Response({'mortgage':'here'})

@api_view(['GET'])
def diff(request):
    col = ['col1','col2','col3']
    row = ['A','B','C']
    df = pd.DataFrame(data=[[10,20,10], [80,30,60], [20,10,70]],index=row,columns=col)
    # lt, gt, le, ge, eq, ne
    # less than(>), grater than(<), less equal(>=), grater equal(<=), equal(==), not equal(!=)
    # print(df.gt(20))

    # df2 = pd.DataFrame([[50],[30],[50]],index=row,columns=['col2'])
    print(df)
    # print(df2)
    # print(df.ge(df2))

    row_mul = [['U','U','U','D','D','D'],['A','B','C','A','B','C']]
    df_mul = pd.DataFrame(data=[[10,20,10],
                                [80,30,60],
                                [20,10,70],
                                [30,70,60],
                                [10,90,40],
                                [50,30,80]],index=row_mul,columns=col)
    print(df_mul)

    # level 1로 설정해서 ABC를 index로 갖는 두 df처럼 비교
    print(df.ge(df_mul,level=1))

    return Response({'diff':'here'})

@api_view(['GET'])
def dtyps(request):
    col1 = [1, 2, 3, 4, 5]
    col2 = ['one', 'two', 'three', 'four', 'five']
    col3 = [1.5, 2.5, 3.5, 4.5, 5.5]
    col4 = [True, False, False, True, True]
    df = pd.DataFrame({"col1": col1, "col2": col2, "col3": col3, "col4": col4})
    print(df.dtypes)
    # type 으로 추출 또는 제외 include, exclude 혼합사용 가능
    result = df.select_dtypes(include=[float,bool])
    print(result)

    return Response({'dtyps':'here'})

@api_view(['GET'])
def clip(request):
    col  = ['col1','col2','col3']
    row  = ['row1','row2','row3']
    data = [[-7,3,9],
            [6,-8,1],
            [-3,0,-7]]
    df = pd.DataFrame(data,row,col)
    s = pd.Series(data=[1,2,3],index=row)

    # row1 은 -1 ~ 1, row2 는  -2 ~ 2, row3 은 -3 ~ 3
    print(df.clip(-s,s,axis=0))


    return Response({'clip':'here'})

@api_view(['GET'])
def pdfilter(request):
    col  = ['alpha','beta','gamma','delta','epsilon']
    row  = ['sigma','omega','lambda']
    data = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]]
    df = pd.DataFrame(data,row,col)
    print(df)
    # print(df.filter(items=['alpha','delta']))

    # index 검색 시 axis=0 옵션 넣지 않는 경우 빈 값 리턴
    # print(df.filter(items=['omega'], axis=0))

    # print(df.filter(like='ta'))

    # regex 는 정규식
    print(df.filter(regex='^g'))
    return Response({'filter':'here'})

@api_view(['GET'])
def sample(request):
    col  = ['col1','col2','col3']
    row  = ['row1','row2','row3','row4','row5']
    data = [[1,2,3],[4,5,6],[7,8,9],[10,11,12],[13,14,15]]
    df = pd.DataFrame(data,row,col)
    # print(df)

    # replace 는 중복 허용, 이 땐 총 row 보다 큰 df를 출력할 수 있다
    # print(df.sample(10,replace=True))

    # weights 는 가중치 , 해당 row가 뽑힐 확률?
    s = pd.Series(data=[10,10,3,3,1],index=row)
    print(df.sample(2,weights=s))

    return Response({'sample':'here'})