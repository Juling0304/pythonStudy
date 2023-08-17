from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer, ListPostSerializer
from rest_framework.pagination import PageNumberPagination

################################################################
# pagenation 파일을 따로 만들어서 import
class list_post_pagenation(PageNumberPagination):
    page_size = 10

def info_pagenations(paginator, total_items):
    items_per_page = paginator.page_size
    current_page = paginator.page.number
    
    return {
    	'items_per_page': items_per_page,  # 한 페이지에 보여지는 갯수
        'current_page': current_page,      # 현재 페이지
        'total_items': total_items		   # 총 아이템 개수
    }
################################################################


@api_view(['GET'])
def hello_rest_api(request):
    data = {'message': 'Hello, REST API!'}
    return Response(data)

@api_view(['POST'])
def write_post(request):
    data = {
        "subject": request.POST.get('subject'),
        "content": request.POST.get('content'),
        'author': request.user.id
    }

    serializer = PostSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response({'is_success': True})

    error = serializer.errors

    return Response({'is_success': False})

@api_view(['GET'])
def list_post(request):
    post = Post.objects.filter().order_by('-create_date')
    paginator = list_post_pagenation()

    list_post = paginator.paginate_queryset(post, request)
    info_page = info_pagenations(paginator,post.count())

    serializer = ListPostSerializer(list_post, many=True)

    return Response({'list': serializer.data, 'info_page': info_page})