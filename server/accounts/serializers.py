from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


# -----------------------------
# REGISTER SERIALIZER
# -----------------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "id", "username", "email", "password"
        ]

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


# -----------------------------
# USER SERIALIZER (READ PROFILE)
# -----------------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", "username", "email",
            "mobile", "passport_id",
            "age", "gender", "address",
            "profile_image", "loyalty_points",
        ]


# -----------------------------
# UPDATE PROFILE SERIALIZER
# -----------------------------
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "mobile",
            "passport_id",
            "age",
            "gender",
            "address",
            "profile_image",
        ]
        extra_kwargs = {
            "mobile": {"required": False},
            "passport_id": {"required": False},
            "age": {"required": False},
            "gender": {"required": False},
            "address": {"required": False},
            "profile_image": {"required": False},
        }


# -----------------------------
# CHANGE PASSWORD SERIALIZER
# -----------------------------
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField()

    def validate_new_password(self, value):
        validate_password(value)
        return value
