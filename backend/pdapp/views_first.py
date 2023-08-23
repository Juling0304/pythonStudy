from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import json
import numpy as np
from matplotlib import pyplot as plt

# row, col은 3개까지만 가능하게 함.
@api_view(['POST'])
def basic(request):
    ex = request.POST.get('ex')
    text = request.POST.get('text')
    mode = request.POST.get('mode')
    
    # string to json
    ex_object = json.loads(ex)
    request_object = json.loads(text)

    # row check 
    row_len = len(request_object)
    if row_len < 0 or row_len > 3 :
        return Response({'is_success': False, 'message': 'row 데이터를 올바르게 넣어주세요.'})

    # col check
    i = 0
    col_len = 0
    for col in request_object:
        # 가장 첫번째 col이 맞다는 가정하에 다른 row들의 col 갯수 체크
        if i == 0 :
            col_len = len(col)
        else :
            if col_len != len(col) :
                return Response({'is_success': False, 'message': 'col 데이터를 올바르게 넣어주세요.'})
        i = i + 1
    if col_len < 0 or row_len > 3 :
        return Response({'is_success': False, 'message': 'col 데이터를 올바르게 넣어주세요.'})

    # 기본 값 pandas
    df = pd.DataFrame(data=ex_object)

    # 요청 값 pandas
    req_df = pd.DataFrame(data=request_object)

    # mode 마다 다른 액션
    if mode == 'add':
        result = df.add(req_df, fill_value=0)
    elif mode == 'sub':
        result = df.sub(req_df, fill_value=0)
    elif mode == 'dot':
        if col_len != row_len:
            return Response({'is_success': False, 'message': '계산하려는 행렬의 형태를 같게 해주세요'})
        result = df.dot(req_df)

    last = {
        'is_success': True,
        'res' : result,
        'req' : req_df
    }
    return Response(last) 

@api_view(['GET'])
def rank(request):
    data = [[5],[5],[pd.NA],[3],[-3.1],[5],[0.4],[6.7],[3]]
    row = ['A★','B★','C','D☆','E','F★','G','H','I☆']
    df = pd.DataFrame(data=data, index=row, columns=['Value'])
    # na_option rank의 NaN 값을 어떻게 처리할지
    # top 1등, bottom 꼴등
    df['average']=df['Value'].rank(method='average', na_option='bottom')
    df['min']=df['Value'].rank(method='min', na_option='bottom')
    df['max']=df['Value'].rank(method='max', na_option='bottom')
    df['first']=df['Value'].rank(method='first', na_option='bottom')
    df['dense']=df['Value'].rank(method='dense', na_option='bottom')
    print(df)
    return Response({'rank':'here'})

@api_view(['GET'])
def expending(request):
    data = {'col1':[1,2,3,4],'col2':[3,7,5,6]}
    idx = ['row1','row2','row3','row4']
    df = pd.DataFrame(data = data, index = idx)

    # numba 라이브러리를 통한 연산이 빠르다고 하는데 노트북기준 더 느림
    # 설명에도 대량의 데이터 연산에서 빠른 속도를 지원한다고 써있음
    # print(df.expanding().sum())
    print(df.expanding(method='table').sum(engine='numba'))
    return Response({'expending':'here'})

@api_view(['GET'])
def rolling(request):
    period = pd.period_range(start='2022-01-13 00:00:00',end='2022-01-13 02:30:00',freq='30T')
    data = {'col1':[1,2,3,4,5,6],'col2':period}
    idx = ['row1','row2','row3','row4','row5','row6']
    df = pd.DataFrame(data= data, index = idx)

    # print(df.rolling(window=3, closed='left').sum())
    # print(df.rolling(window=3, closed='right').sum())
    # print(df.rolling(window=3, center=True).sum())
    # print(df.rolling(window=3, win_type='triang').sum()) # 삼각함수로 가중치 부여
    # print(df.rolling(window=3, win_type='gaussian').sum(std=3)) # 가우시안 분포로 가중치 부여
    print(df.rolling(window='60T',on='col2').sum()) # col2 기준으로 rolling

    # 차트 테스트
    # df.rolling(window='60T',on='col2').sum().plot(kind='bar',y='col1') # ax에 df의 bar chart 생성
    # plt.show()

    return Response({'rolling':'here'})

@api_view(['GET'])
def ewm(request):
    data = {'val':[1,4,2,3,2,5,13,10,12,14,np.NaN,16,12,20,22]}
    df = pd.DataFrame(data).reset_index()

    # 평활 계수 차이 테스트
    # df2 = df.assign(ewm_a_low=df['val'].ewm(alpha=0.1).mean()) #alpha=0.1로 df2 생성
    # df3 = df.assign(ewm_a_high=df['val'].ewm(alpha=0.7).mean()) #alpha=0.7로 df3 생성

    # ax = df.plot(kind='bar',x='index',y='val') 
    # df2.plot(kind='line',x='index', y='ewm_a_low', color='red', ax=ax) # alpha=0.1 은 적색
    # df3.plot(kind='line',x='index', y='ewm_a_high', color='green', ax=ax) # alpha=0.7 은 녹색

    # span으로 기간 차이 테스트
    # span이 길면 과거 데이터의 영향이 큼
    # df2 = df.assign(span_4=df['val'].ewm(span=4).mean())
    # df3 = df.assign(span_8=df['val'].ewm(span=8).mean())
    # ax = df.plot(kind='bar',x='index',y='val')
    # df2.plot(kind='line',x='index', y='span_4', color='red', ax=ax)
    # df3.plot(kind='line',x='index', y='span_8', color='green', ax=ax)

    # 반감기 차이 테스트
    df2 = df.assign(harf_2=df['val'].ewm(halflife=2).mean())
    df3 = df.assign(harf_5=df['val'].ewm(halflife=5).mean())
    ax = df.plot(kind='bar',x='index',y='val')
    df2.plot(kind='line',x='index', y='harf_2', color='red', ax=ax)
    df3.plot(kind='line',x='index', y='harf_5', color='green', ax=ax)

    plt.show() # 그래프 출력

    return Response({'ewm':'here'})