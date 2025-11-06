from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    mobile = models.CharField(max_length=20, blank=True)
    passport_id = models.CharField(max_length=32, blank=True)
    # loyalty points etc.
    loyalty_points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.username
