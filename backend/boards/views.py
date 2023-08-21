from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer, ListPostSerializer, ReplySerializer
from rest_framework.pagination import PageNumberPagination

################################################################
# pagenation 파일을 따로 만들어서 import
class list_post_pagination(PageNumberPagination):
    page_size = 10

def info_paginations(paginator, total_items):
    items_per_page = paginator.page_size
    current_page = paginator.page.number
    
    return {
    	'items_per_page': int(items_per_page),  # 한 페이지에 보여지는 갯수
        'current_page': int(current_page),      # 현재 페이지
        'total_items': int(total_items)		   # 총 아이템 개수
    }
################################################################


@api_view(['GET'])
def hello_rest_api(request):
    data = {'message': 'Hello, REST API!'}
    return Response(data)

@api_view(['GET','POST','PUT'])
def post(request):
    if request.method == 'GET':
        try:
            mode = request.GET.get('mode')
            if request.GET.get('mode') == 'modify':
                post = Post.objects.get(id=request.GET.get('id'), author=request.user)
            else:
                post = Post.objects.get(id=request.GET.get('id'))
            serializer = ListPostSerializer(post)

            return Response({'is_success': True, 'data' : {'data' : serializer.data }})
        except Post.DoesNotExist:
            return Response({'is_success': False, 'message' : 'Post가 존재하지 않습니다.'})
    if request.method == 'POST':
        data = {
            "subject": request.POST.get('subject'),
            "content": request.POST.get('content'),
            'author': request.user.id
        }

        serializer = PostSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response({'is_success': True})
        else:
            error = serializer.errors
            return Response({'is_success': False, 'error': error})
    if request.method == 'PUT':
        try:
            post = Post.objects.get(id=request.POST.get('id'))
            # author is required 라서 insert와 동일한 구조
            data = {
                "subject": request.POST.get('subject'),
                "content": request.POST.get('content'),
                'author': request.user.id
            }
            serializer = PostSerializer(post, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'is_success': True})
            else:
                error = serializer.errors
                return Response({'is_success': False, 'error': error})
        except Post.DoesNotExist:
            return Response({'is_success': False, 'message' : 'Post가 존재하지 않습니다.'})

@api_view(['GET'])
def list_post(request):
    post = Post.objects.filter().order_by('-create_date')
    paginator = list_post_pagination()

    list_post = paginator.paginate_queryset(post, request)
    info_page = info_paginations(paginator,post.count())

    serializer = ListPostSerializer(list_post, many=True)

    return Response({'list': serializer.data, 'info_page': info_page})

@api_view(['POST'])
def vote(request):
    post = Post.objects.get(id=request.POST.get('id'))
    post.voter.add(request.user)
    post.save()
    return Response({'is_success': True})

@api_view(['POST'])
def reply(request):
    data = {
            "post": request.POST.get('id'),
            "content": request.POST.get('content'),
            'writer': request.user.id
    }
    serializer = ReplySerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({'is_success': True})
    else:
        error = serializer.errors
        return Response({'is_success': False, 'error': error})
