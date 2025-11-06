from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Perfume
from .serializers import PerfumesSerializer
from .service import PerfumeService
from .repository import PerfumeRepository


class PerfumeAllView(APIView):
    def get(self, request: HttpRequest):
        perfumes = PerfumeService(PerfumeRepository).get()
        serializer = PerfumesSerializer(perfumes.get("data"), many=True)
        return Response(serializer.data)


class PerfumeOneView(APIView):
    def get(self, request: HttpRequest, pk):
        perfume = PerfumeService(PerfumeRepository).get_one(pk)
        if isinstance(perfume, dict):
            return Response(perfume, status=status.HTTP_404_NOT_FOUND)
        serializer = PerfumesSerializer(perfume)
        return Response(serializer.data)
