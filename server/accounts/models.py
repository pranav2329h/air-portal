# File: air-portal/Server/accounts/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models


class GenderChoices(models.TextChoices):
    MALE = "Male", "Male"
    FEMALE = "Female", "Female"
    OTHER = "Other", "Other"
    UNDISCLOSED = "Undisclosed", "Undisclosed"


class User(AbstractUser):
    # Basic fields
    mobile = models.CharField(max_length=20, blank=True)
    passport_id = models.CharField(max_length=32, blank=True)

    # Profile fields
    age = models.PositiveIntegerField(null=True, blank=True)
    gender = models.CharField(
        max_length=20,
        choices=GenderChoices.choices,
        default=GenderChoices.UNDISCLOSED,
        blank=True
    )
    address = models.CharField(max_length=255, blank=True)

    # Profile image (URL)
    profile_image = models.URLField(
        blank=True,
        default="https://cdn-icons-png.flaticon.com/512/149/149071.png"  # default avatar
    )

    # Loyalty points
    loyalty_points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.username} ({self.email})"
