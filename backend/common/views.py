from rest_framework.decorators import api_view
from rest_framework.response import Response
# from django.contrib.auth.hashers import make_password, check_password
from .models import User

@api_view(['POST'])
def test(request):
    data = {'message': 'here is common'}
    # data = request.data
    id = request.POST.get('id')
    name = request.POST.get('name')
    email = request.POST.get('email')
    password = request.POST.get('password')
    # hashed = make_password(password)

    newUser = User.objects.create_user(id=id, name=name, email=email, password=password)


    return Response(data)