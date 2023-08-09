from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)


class UserManager(BaseUserManager):
    def create_user(self, id, name, email, password=None):
        if not id:
            raise ValueError('Users must have an id')
        if not name:
            raise ValueError('Users must have an name')
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            id=id,
            name=name,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, id, name, email, password):
        user = self.create_user(
            id,
            name=name,
            email=email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    id = models.CharField(max_length=150, primary_key=True)
    name = models.CharField(max_length=50, db_index=True)
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
    )
    password = models.CharField(("password"), max_length=128)
    last_login = models.DateTimeField(("last login"), blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'id'

    def __str__(self):
        return self.id

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin