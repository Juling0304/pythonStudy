from hanspell import spell_checker

# sent = "맞춤법 틀리면 외 않되? 쓰고싶은대로쓰면돼지 "
sent = '김철수는 극중 두 인격의 사나이 이광수 역을 맡았다. 철수는 한국 유일의 태권도 전승자를 가리는 결전의 날을 앞두고 10년간 함께 훈련한 사형인 유연재(김광수 분)를 찾으러 속세로 내려온 인물이다.'
new_sent = sent.replace(" ", '')

spelled_sent = spell_checker.check(new_sent)

hanspell_sent = spelled_sent.checked
print(hanspell_sent)
print('================================================================')

# 신조어, 형태소 분석기에 등록되지 않은 단어의 경우 형태소 구분을 정확하게 하지 못 함.
# from konlpy.tag import Okt
# tokenizer = Okt()
# print(tokenizer.morphs('에스파 카리나 1월 최애돌 기부 요정'))

# import urllib.request
from soynlp import DoublespaceLineCorpus
from soynlp.word import WordExtractor
from soynlp.tokenizer import LTokenizer
from soynlp.tokenizer import MaxScoreTokenizer
from soynlp.normalizer import *

# 훈련데이터 다운로드
# urllib.request.urlretrieve("https://raw.githubusercontent.com/lovit/soynlp/master/tutorials/2016-10-20.txt", filename="2016-10-20.txt")

corpus = DoublespaceLineCorpus("2016-10-20.txt")
# print(len(corpus))

# i = 0
# for document in corpus:
#   if len(document) > 0:
#     print(document)
#     i = i+1
#   if i == 3:
#     break

word_extractor = WordExtractor()
word_extractor.train(corpus)
word_score_table = word_extractor.extract()

# SOYNLP의 응집 확률
# 값이 높을 수록 하나의 단어로 등장할 가능성이 높음
# 하나의 단어로 판단하기에 적합한 정도
print('================================================================')
print('SOYNLP 응집 확률')
print(word_score_table["반포한"].cohesion_forward)
print(word_score_table["반포한강공원"].cohesion_forward)
print(word_score_table["반포한강공원에"].cohesion_forward)

# SOYNLP의 브랜칭 엔트로피
# 주어진 문자열에서 얼마나 다음 문자가 등장 할 수 있는 지 판단 척도
# "디스플"에서 -0.0 이 나오는 것은 다음에 올 글자가 "레" 로 "디스플레이"까지 예측이 된 것
# "디스플레이"에서 3.1400392861792916 로 값이 증가한 이유는 조사 또는 다른 단어가 오는 경우가 있기 때문
# 브랜칭 엔트로피 값이 감소 > 증가 하는 것으로 단어 판단 가능
print('================================================================')
print('SOYNLP 브랜칭 엔트로피')
print(word_score_table["디스"].right_branching_entropy)
print(word_score_table["디스플"].right_branching_entropy)
print(word_score_table["디스플레이"].right_branching_entropy)


# SOYNLP의 L Tokenizer
# 한국어는 띄어쓰기 단위로 나눈 어절 토큰은 L 토큰 + R 토큰의 형태가 많음
print('================================================================')
print('SOYNLP L Tokenizer')
scores = {word:score.cohesion_forward for word, score in word_score_table.items()}
l_tokenizer = LTokenizer(scores=scores)
print(l_tokenizer.tokenize("국제사회와 우리의 노력들로 범죄를 척결하자", flatten=False))

# SOYNLP의 최대 점수 토크나이저
# 띄어쓰기가 되지 않은 문장에서 점수가 높은 글자 시퀀스를 순차적으로 찾아내는 토크나이저
print('SOYNLP Max Score Tokenizer')
maxscore_tokenizer = MaxScoreTokenizer(scores=scores)
print(maxscore_tokenizer.tokenize("국제사회와우리의노력들로범죄를척결하자"))

# 반복되는 문자 정제
# ㅋㅋ, ㅎㅎ 등 이모티콘이나 의미없게 반복되는 글자
print('================================================================')
print(emoticon_normalize('앜ㅋㅋㅋㅋ이영화존잼쓰ㅠㅠㅠㅠㅠ', num_repeats=2))
print(emoticon_normalize('앜ㅋㅋㅋㅋㅋㅋㅋㅋㅋ이영화존잼쓰ㅠㅠㅠㅠ', num_repeats=2))
print(emoticon_normalize('앜ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ이영화존잼쓰ㅠㅠㅠㅠㅠㅠ', num_repeats=2))

print(repeat_normalize('와하하하하하하하하하핫', num_repeats=2))
print(repeat_normalize('와하하하하하하핫', num_repeats=2))
print(repeat_normalize('와하하하하핫', num_repeats=2))