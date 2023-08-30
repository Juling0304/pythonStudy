numer1 = 1
denom1 = 2
numer2 = 1
denom2 = 2


x = (numer1 * denom2) + (numer2 * denom1)
y = denom1 * denom2
m = max([x, y])
    
gcd = list()
for i in range(1, m):
    if (x % i == 0) & (y % i == 0):
        gcd.append(i)
gcd = max(gcd) 

x = int(x / gcd)
y = int(y / gcd)

# 최대 공약수로 나눠도
# 다시 최대 공약수를 찾을 수 있는 경우가 생겨서
# 한 번 더 계산, 반복문으로 처리하는게 옳음
gcd = list()
for i in range(1, m):
    if (x % i == 0) & (y % i == 0):
        gcd.append(i)
gcd = max(gcd) 
if gcd:
    x = int(x / gcd)
    y = int(y / gcd)

print([x, y])