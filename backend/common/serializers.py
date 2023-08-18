from rest_framework import serializers
from .models import User, Menu
from rest_framework_simplejwt.tokens import RefreshToken

class JWTSignupSerializer(serializers.ModelSerializer):
    id = serializers.CharField(
        required=True,
        max_length=150
    )

    name = serializers.CharField(
        required=True,
        max_length=50
    )

    password = serializers.CharField(
        required=True,
        max_length=50,
        write_only=True
    )

    email = serializers.CharField(
        required=True,
        max_length=255,
    )

    class Meta(object):
        model = User
        fields = ['id', 'name', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def validate(self, data):
        user_id = data.get('id',None)
        if User.objects.filter(id=user_id).exists():
            raise serializers.ValidationError({
                'status': 'exist',
                'message': '이미 가입한 ID 입니다.'
            })
        return data

class JWTLoginSerializer(serializers.ModelSerializer):
    id = serializers.CharField(
        required=True,
        max_length=150
    )

    password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )
    
    class Meta(object):
        model = User
        fields = ['id', 'password']
    
    def validate(self, data):
        id = data.get('id', None)
        password = data.get('password', None)

        if User.objects.filter(id=id).exists():
            user = User.objects.get(id=id)

            if not user.check_password(password):
                raise serializers.ValidationError({
                'status': 'wrong',
                'message': '비밀번호를 확인해주세요.'
            })
        else:
            raise serializers.ValidationError({
                'status': 'not_exist',
                'message': '가입되지 않은 ID 입니다.'
            })
        
        token = RefreshToken.for_user(user)
        refresh = str(token)
        access = str(token.access_token)

        data = {
            'id': user.id,
            'name': user.name,
            'refresh': refresh,
            'access': access,
        }

        return data


class MenuSerializer(serializers.ModelSerializer):
    title = serializers.CharField(
        required=True,
    )

    route = serializers.CharField(
        required=True,
    )
    
    sort = serializers.IntegerField(
        required=True
    )

    class Meta(object):
        model = Menu
        fields = ['title', 'route', 'sort']

class VoterSerializer(serializers.ModelSerializer):
    id = serializers.CharField(
        required=True,
        max_length=150
    )
    name = serializers.CharField()

    class Meta(object):
        model = User
        fields = ['id', 'name']