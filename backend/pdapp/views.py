from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import json


@api_view(['POST'])
def test(request):
    text = request.POST.get('text')

    json_object = json.loads(text)
    row_len = len(json_object)
    if row_len < 0 or row_len > 3 :
        return Response({'is_success': False, 'message': 'row 데이터를 올바르게 넣어주세요.'})

    i = 0
    col_len = 0
    for col in json_object:
        if i == 0 :
            col_len = len(col)
        else :
            if col_len != len(col) :
                return Response({'is_success': False, 'message': 'col 데이터를 올바르게 넣어주세요.'})
        i = i + 1

    # 기본 값
    data = [[1,10,100],[2,20,200],[3,30,300]]
    col = ['col1','col2','col3']
    row = ['row1','row2','row3']
    df = pd.DataFrame(data=data, index=row, columns=col)

    req_row = range(0,row_len)

    data2  = [[3],[4],[5]]
    df2 = pd.DataFrame(data=data2, index=row, columns=['col1'])

    data3 = [[3,4,5]]
    df3 = pd.DataFrame(data=data3, index=['row1'], columns=col)

    result2 = df.add(df3, fill_value=0)
    print(result2)

    result = df.add(df2, fill_value=0)
    print(result)

    return Response(result) 
    # return Response(result.to_json()) 