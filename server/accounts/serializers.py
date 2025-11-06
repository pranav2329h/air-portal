from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ["username","email","password","first_name","last_name","mobile","passport_id"]
    def create(self, validated):
        user = User.objects.create_user(
            username=validated["username"],
            email=validated.get("email"),
            password=validated["password"],
            first_name=validated.get("first_name",""),
            last_name=validated.get("last_name",""),
            mobile=validated.get("mobile",""),
            passport_id=validated.get("passport_id",""),
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","email","first_name","last_name","mobile","passport_id","loyalty_points"]
