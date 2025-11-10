from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import (
    OrdersPublicSerializer
)
from .service import OrderService
from .repository import OrderRepository, OrderItemRepository, DeliveryCompanyRepository


class GetOrdersView(APIView):
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'path',
                openapi.IN_QUERY,
                description="Pagination Page",
                type=openapi.TYPE_INTEGER,
                required=False, # True
                example=1,
            ),
        ]
    )
    def get(self, request):
        service = OrderService(
            order_repo=OrderRepository,
            order_item_repo=OrderItemRepository,
            delivery_company_repo=DeliveryCompanyRepository
        )
        page = request.query_params.get('page')
        data = service.get_orders(page)
        # d = data.get("data")
        # if d:
        #     clean_data = []
        #     for item in d:
        #         item["prefix"] = "nova"
        #         clean_data.append(item)
        #     data["data"] = clean_data
        serializer = OrdersPublicSerializer(data)
        return Response(serializer.data)
