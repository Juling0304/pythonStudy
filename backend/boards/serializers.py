from rest_framework import serializers
from .models import Post
from common.models import User

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            'subject', 'content', 'author'
        )

class ListPostSerializer(serializers.ModelSerializer):
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
        fields = (
            'subject', 'content', 'author', 'create_date', 'modify_date'
        )