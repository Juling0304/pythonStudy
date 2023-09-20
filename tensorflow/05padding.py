import numpy as np
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

preprocessed_sentences = [['barber', 'person'], ['barber', 'good', 'person'], ['barber', 'huge', 'person'], ['knew', 'secret'], ['secret', 'kept', 'huge', 'secret'], ['huge', 'secret'], ['barber', 'kept', 'word'], ['barber', 'kept', 'word'], ['barber', 'kept', 'secret'], ['keeping', 'keeping', 'huge', 'secret', 'driving', 'barber', 'crazy'], ['barber', 'went', 'huge', 'mountain']]

tokenizer = Tokenizer()
tokenizer.fit_on_texts(preprocessed_sentences)
encoded = tokenizer.texts_to_sequences(preprocessed_sentences)
# print(encoded)

max_len = max(len(item) for item in encoded)
# print('최대 길이 :',max_len)

for sentence in encoded:
    while len(sentence) < max_len:
        sentence.append(0)

padded_np = np.array(encoded)
print(padded_np)

encoded = tokenizer.texts_to_sequences(preprocessed_sentences)
# print(encoded)

# padding = 'post' 옵션을 입력하지 않으면 앞 쪽 부터 제로 패딩 처리 함
padded = pad_sequences(encoded, padding='post')
print(padded)

print((padded == padded_np).all())

# truncating = 'post' 는 maxlen 설정을 넘어갈 때 제거되는 위치
padded = pad_sequences(encoded, padding='post', truncating='post', maxlen=5)
print(padded)
