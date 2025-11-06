from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Perfume
from .serializers import PerfumesSerializer


class PerfumeAllView(APIView):
    def get(self, request: HttpRequest):
        perfumes = Perfume.objects.all()
        serializer = PerfumesSerializer(perfumes, many=True)
        return Response(serializer.data)


class PerfumeOneView(APIView):
    def get(self, request: HttpRequest, pk):
        try:
            perfume = Perfume.objects.get(pk=pk)
        except Perfume.DoesNotExist:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = PerfumesSerializer(perfume)
        return Response(serializer.data)
