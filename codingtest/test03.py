K = 2
blocks = [1,2,3,2,4,2]

from itertools import combinations

origin_dict = {i : blocks[i] for i in range(len(blocks))}
# print(origin_dict)

max_dict = {}
sb = set(blocks)

for s in blocks:
    max_dict.setdefault(s,0)
    max_dict[s] = max_dict[s] +1

max_i = max(max_dict, key=max_dict.get)

change_total = len(blocks) - max_dict[max_i]

if change_total <= K:
    print(len(blocks))

list_max = []

for s in sb:
    target_dict = {k : v for k, v in origin_dict.items() if v != s }
    s_dict = {k : v for k, v in origin_dict.items() if v == s }

    target_key_list = list(target_dict.keys())
    s_key_list = list(s_dict.keys())

    for x, y in list(combinations(target_key_list, K)):
        # check_list = []
        check_list = s_key_list
        check_list.append(x)
        check_list.append(y)
        check_list.sort()

        # print(check_list)
        cnt = 0
        for z in range(len(check_list)):

            if z != len(check_list) - 1:
                if check_list[z] + 1 == check_list[z + 1]:
                    cnt = cnt + 1
                else:
                    list_max.append(cnt)
                    continue

            list_max.append(cnt + 1)
            print(s_key_list)
            print(cnt + 1)

        check_list.remove(x)
        check_list.remove(y)

        # print(x)
        # print(y)
    # print(list(combinations(target_key_list, K)))
    # print(s_key_list)

print(list_max)


