from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from .models import User
from .serializers import UserJWTSignupSerializer, JWTLoginSerializer

@api_view(['POST'])
def user_join(request):
    data = request.POST
    serializer = UserJWTSignupSerializer(data=data)
    valid = serializer.is_valid()
    
    if valid:
        serializer.save()
        new_user = serializer.data
        # 직렬화 테스트 save() return 값은 User 모델이라 바로 돌려주면 직렬화 실패 오류 발생
        return Response({ 'is_success' : True , 'user' : new_user })
    else:
        return Response(serializer.errors)

@api_view(['POST'])
def user_login(request):
    user_id = request.POST.get('id')
    user_password = request.POST.get('password')

    data = request.POST
    serializer = JWTLoginSerializer(data=data)
    valid = serializer.is_valid()
    if valid:
        valid = serializer.validated_data
        return Response({ 'is_success' : True, 'data' : valid })
    else:
        return Response(serializer.errors)