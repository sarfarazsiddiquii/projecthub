from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project, Task

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = Task
        fields = '__all__'

class TaskCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'