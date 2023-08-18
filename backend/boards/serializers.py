from rest_framework import serializers
from .models import Post, Reply
from common.models import User
from common.serializers import VoterSerializer

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            'subject', 'content', 'author'
        )

class ListPostSerializer(serializers.ModelSerializer):
    voter = VoterSerializer(many=True)

    id = serializers.CharField(
        required=True,
    )
    subject = serializers.CharField(
        required=True,
    )

    content = serializers.CharField(
        required=True,
    )

    author = serializers.CharField(
        required=True,
    )

    create_date = serializers.DateTimeField()

    modify_date = serializers.DateTimeField()
    class Meta:
        model = Post
        fields = ('id', 'subject', 'content', 'author', 'voter', 'create_date', 'modify_date')

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = (
            'post', 'content', 'writer'
        )