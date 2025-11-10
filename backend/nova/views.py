from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException

from .serializers import (
    LocalitiesPublicSerializer,
    PointsPublicSerializer,
    CacheStatusSerializer
)
from order.enums import Source
from .service import NOVAService
from order.repository import OrderRepository, OrderItemRepository, DeliveryCompanyRepository
from .repository import NovaOrderRepository


class LocalitiesPublicView(APIView):
    def get(self, request):
        service = NOVAService(
            order_repo=OrderRepository,
            order_item_repo=OrderItemRepository,
            nova_order_repo=NovaOrderRepository,
            delivery_company_repo=DeliveryCompanyRepository
        )
        localities = service.get_localities()
        if not localities:
            return Response(
                {
                    "detail": "Cached data is not found. Use POST /nova/localities/cache"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            "data": localities,
            "source": Source.CACHE.value
        }
        serializer = LocalitiesPublicSerializer(data)
        return Response(serializer.data)


class LocalitiesCacheStatusView(APIView):
    def get(self, request):
        service = NOVAService(
            order_repo=OrderRepository,
            order_item_repo=OrderItemRepository,
            nova_order_repo=NovaOrderRepository,
            delivery_company_repo=DeliveryCompanyRepository
        )
        time_to_expire = service.localities_cache_status()
        is_cached = True
        if not time_to_expire:
            is_cached = False
            time_to_expire = 0
        data = {
            "isCached": is_cached,
            "timeToExpire": time_to_expire
        }
        serializer = CacheStatusSerializer(data)
        return Response(serializer.data)


class CacheLocalitiesView(APIView):
    def post(self, request):
        service = NOVAService(
            order_repo=OrderRepository,
            order_item_repo=OrderItemRepository,
            nova_order_repo=NovaOrderRepository,
            delivery_company_repo=DeliveryCompanyRepository
        )
        localities = service.cache_localities()
        if not localities:
            return Response(
                {
                    "detail": "Data is already cached"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            "data": localities,
            "source": Source.API.value
        }
        serializer = LocalitiesPublicSerializer(data)
        return Response(serializer.data)


class PointsPublicView(APIView):
    def get(self, request):
        service = NOVAService(
            order_repo=OrderRepository,
            order_item_repo=OrderItemRepository,
            nova_order_repo=NovaOrderRepository,
            delivery_company_repo=DeliveryCompanyRepository
        )
        points = service.get_points()
        if not points:
            return Response(
                {
                    "detail": "Cached data is not found. Use POST /nova/points/cache"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            "data": points,
            "source": Source.CACHE.value
        }
        serializer = PointsPublicSerializer(data)
        return Response(serializer.data)


class PointsCacheStatusView(APIView):
    def get(self, request):
        service = NOVAService(
            order_repo=OrderRepository,
            order_item_repo=OrderItemRepository,
            nova_order_repo=NovaOrderRepository,
            delivery_company_repo=DeliveryCompanyRepository
        )
        time_to_expire = service.points_cache_status()
        is_cached = True
        if not time_to_expire:
            is_cached = False
            time_to_expire = 0
        data = {
            "isCached": is_cached,
            "timeToExpire": time_to_expire
        }
        serializer = CacheStatusSerializer(data)
        return Response(serializer.data)


class CachePointsView(APIView):
    def post(self, request):
        service = NOVAService(
            order_repo=OrderRepository,
            order_item_repo=OrderItemRepository,
            nova_order_repo=NovaOrderRepository,
            delivery_company_repo=DeliveryCompanyRepository
        )
        points = service.cache_points()
        if not points:
            return Response(
                {
                    "detail": "Data is already cached"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            "data": points,
            "source": Source.API.value
        }
        serializer = PointsPublicSerializer(data)
        return Response(serializer.data)
