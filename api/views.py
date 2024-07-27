from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer, TaskCreateUpdateSerializer, UserSerializer

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return TaskCreateUpdateSerializer
        return TaskSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_tasks(self, request):
        tasks = Task.objects.filter(assigned_to=request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated])
    def update_status(self, request, pk=None):
        task = self.get_object()
        if task.assigned_to != request.user:
            return Response({"detail": "You don't have permission to update this task."}, status=403)
        
        new_status = request.data.get('status')
        if new_status not in dict(Task.STATUS_CHOICES):
            return Response({"detail": "Invalid status."}, status=400)
        
        task.status = new_status
        task.save()
        serializer = TaskSerializer(task)
        return Response(serializer.data)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]