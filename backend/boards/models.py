from django.db import models
from common.models import User
 
class Post(models.Model):
    subject = models.CharField(max_length=200, blank=False, null=False)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_post')
    voters = models.ManyToManyField(User, related_name='voter_post')
    create_date = models.DateTimeField(auto_now_add=True)
    modify_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.subject