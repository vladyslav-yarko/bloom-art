from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import (
    OrdersPublicSerializer,
    OrderPublicSerializer,
    OrderItemsPublicSerializer,
    UpdatedOrdersPublicSerializer
)
from .service import OrderService
from .repository import OrderRepository, OrderItemRepository, DeliveryCompanyRepository
from nova.service import NOVAService
from nova.repository import NovaOrderRepository


class GetOrdersView(APIView):
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'page',
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
        if page:
            page = int(page)
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


class GetOrderView(APIView):
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'id',
                openapi.IN_PATH,
                description="Order ID",
                type=openapi.TYPE_STRING,
                format=openapi.FORMAT_UUID,
                required=True,
                example="8e1718f5-1972-11e5-add9-005056887b8d",
            ),
        ]
    )
    def get(self, request, id):
        service = OrderService(
            order_repo=OrderRepository,
            order_item_repo=OrderItemRepository,
            delivery_company_repo=DeliveryCompanyRepository
        )
        data = service.get_order(id)
        if not data:
            return Response(
                {"detail": "Order by order id has not found"},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
        serializer = OrderPublicSerializer(data)
        return Response(serializer.data)


class GetOrderItemsView(APIView):
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'orderId',
                openapi.IN_PATH,
                description="Order ID",
                type=openapi.TYPE_STRING,
                format=openapi.FORMAT_UUID,
                required=True,
                example="8e1718f5-1972-11e5-add9-005056887b8d",
            ),
            openapi.Parameter(
                'page',
                openapi.IN_QUERY,
                description="Pagination Page",
                type=openapi.TYPE_INTEGER,
                required=False, # True
                example=1
            ),
        ]
    )
    def get(self, request, orderId):
        service = OrderService(
            order_repo=OrderRepository,
            order_item_repo=OrderItemRepository,
            delivery_company_repo=DeliveryCompanyRepository
        )
        page = request.query_params.get('page')
        if page:
            page = int(page)
        data = service.get_order_items(orderId, page)
        if not data:
            return Response(
                {"detail": "Order items by order id has not found"},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
        serializer = OrderItemsPublicSerializer(data)
        return Response(serializer.data)


class UpdateOrderStatuses(APIView):
    def put(self, request):
        service = OrderService(
            order_repo=OrderRepository,
            order_item_repo=OrderItemRepository,
            delivery_company_repo=DeliveryCompanyRepository
        )
        nova_service = NOVAService(
            order_repo=OrderRepository,
            order_item_repo=OrderItemRepository,
            nova_order_repo=NovaOrderRepository,
            delivery_company_repo=DeliveryCompanyRepository
        )
        orders = service.get_orders()
        nova_updated_orders_count = nova_service.update_statuses(orders)
        total_updates_count = nova_updated_orders_count
        serializer = UpdatedOrdersPublicSerializer({
            "novaOrderUpdatesCount": nova_updated_orders_count,
            "orderUpdatesCount": total_updates_count
        })
        return Response(serializer.data)
