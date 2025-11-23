from django.contrib.auth.models import AbstractUser
from django.db import models


class GenderChoices(models.TextChoices):
    MALE = "MALE", "Male"
    FEMALE = "FEMALE", "Female"
    OTHER = "OTHER", "Other"


class User(AbstractUser):
    mobile = models.CharField(max_length=20, blank=True)
    passport_id = models.CharField(max_length=32, blank=True)

    # NEW PROFILE FIELDS
    age = models.PositiveIntegerField(null=True, blank=True)
    gender = models.CharField(
        max_length=10,
        choices=GenderChoices.choices,
        blank=True,
    )
    country = models.CharField(max_length=50, blank=True)
    city = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=255, blank=True)
    profile_image = models.URLField(blank=True)  # you can later switch to ImageField if needed

    # Loyalty / rewards
    loyalty_points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.username
