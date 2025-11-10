from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException

from .serializers import LocalitiesPublicSerializer
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
