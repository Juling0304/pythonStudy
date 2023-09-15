time = 100

gold = 200

upgrade = [[0,5],[1500,3],[3000,1]]
upgrade_price = []
action = []

for u in upgrade:
    upgrade_price.append(u[0])
    action.append(u[1])


max_level = len(upgrade) - 1

result = []

for x in range(len(upgrade)):
    now_grade = 0
    second = 0
    money = 0

    for i in range(time):
        second += 1

        if second == action[now_grade]:
            money += 200
            second = 0
        if x != now_grade:
            if max_level != now_grade:
                if upgrade_price[now_grade + 1] <= money:
                    money = money - upgrade_price[now_grade + 1]
                    now_grade = now_grade + 1
    
    result.append(money)

print(max(result))
