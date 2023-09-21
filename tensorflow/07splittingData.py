import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# X, y = zip(['a', 1], ['b', 2], ['c', 3])
# print('X 데이터 :',X)
# print('y 데이터 :',y)

# sequences = [['a', 1], ['b', 2], ['c', 3]]
# X, y = zip(*sequences)
# print('X 데이터 :',X)
# print('y 데이터 :',y)

# values = [['당신에게 드리는 마지막 혜택!', 1],
# ['내일 뵐 수 있을지 확인 부탁드...', 0],
# ['도연씨. 잘 지내시죠? 오랜만입...', 0],
# ['(광고) AI로 주가를 예측할 수 있다!', 1]]
# columns = ['메일 본문', '스팸 메일 유무']

# df = pd.DataFrame(values, columns=columns)
# # print(df)

# X = df['메일 본문']
# y = df['스팸 메일 유무']

# print('X 데이터 :',X.to_list())
# print('y 데이터 :',y.to_list())

X, y = np.arange(10).reshape((5, 2)), range(5)

print('X 전체 데이터 :')
print(X)
print('y 전체 데이터 :')
print(list(y))

# random_state 는 훈련데이터와 테스트데이터를 선별하는 시드값 
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1234)

print('X 훈련 데이터 :')
print(X_train)
print('X 테스트 데이터 :')
print(X_test)

print('y 훈련 데이터 :')
print(y_train)
print('y 테스트 데이터 :')
print(y_test)