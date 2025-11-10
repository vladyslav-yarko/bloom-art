from order.enums import Status


class NOVAUtil:
    PARCEL_LOCKER_REF = "f9316480-5f2d-425d-bc2c-ac7cd29decf0"

    def __init__(self):
        self.template = {
            # 'село': 'village',
            # 'селище міського типу': 'urban-type settlement',
            # 'місто': 'city',
            # 'селище': 'village',
            # 's-село': 'v',
            # 's-селище міського типу': 'uts',
            # 's-місто': 'c',
            # 's-селище': 'v'
            'село': 'с',
            'селище міського типу': 'смт',
            'місто': 'м',
            'селище': 'с-ще',
        }
        self.excluded_warehouses = [
            "95dc212d-479c-4ffb-a8ab-8c1b9073d0bc",
            "f9316480-5f2d-425d-bc2c-ac7cd29decf0"
        ]
        self.status = {
            "1": Status.AwaitingAcceptance,

            "2": Status.Deleted,
            "3": Status.Deleted,

            "4": Status.InTransit,
            "5": Status.InTransit,
            "6": Status.InTransit,
            "41": Status.InTransit,
            "101": Status.InTransit,

            "7": Status.Arrived,
            "8": Status.Arrived,

            "9": Status.Accepted,
            "10": Status.Accepted,

            "11": Status.Success,

            "12": Status.AwaitingShipment,

            "103": Status.Returned,
            "106": Status.Returned,

            "102": None,
            "104": None,
            "105": None,
            "111": None,
            "112": None
        }
        
    def process_locality_data(self, data: list) -> list[dict]:
        clean_data = list()
        data = data["data"]
        for locality in data:
            d = dict()

            title = locality["Description"]
            cityRef = locality["Ref"]
            localityType = locality["SettlementTypeDescription"]
            region = locality["AreaDescription"]
            localityTypeShorthand = self.template.get(localityType)

            d["fullTitle"] = self.locality_full_title(localityTypeShorthand, title, region)
            d["title"] = title
            d["cityRef"] = cityRef
            d["localityType"] = localityType
            d["localityTypeShorthand"] = localityTypeShorthand
            d["region"] = region

            clean_data.append(d)
        return clean_data

    @staticmethod
    def locality_full_title(
        locality_type_shorthand: str,
        title: str,
        region: str,
    ) -> str:
        if region:
            region =  f" ({region} обл."
        else:
            region = ""
        data = f"{locality_type_shorthand}. {title}{region})"
        return data

    def process_point_data(self, data: list) -> list[dict]:
        clean_data = list()
        data = data["data"]
        for point in data:
            warehouse_type_ref = point.get("TypeOfWarehouse")
            if warehouse_type_ref in self.excluded_warehouses:
                continue
            d = dict()
            d["title"] = point.get("Description")
            d["ref"] = point.get("Ref")
            d["cityRef"] = point.get("CityRef")
            d["warehouseTypeRef"] = warehouse_type_ref
            clean_data.append(d)
        return clean_data


        # async def check_cached_data(self) -> str:
    #     data = await redis_manager.get_cached_string_data('nova-localities')
    #     if not data:
    #         raise HTTPException(
    #             status_code=status.HTTP_400_BAD_REQUEST,
    #             detail='Cached data is not found. Use /nova/cache/localities/all'
    #         )
    #     return json.loads(data)

    # async def department_localites(self) -> list[dict]:
    #     localities_data = await self.check_cached_data()
    #     data = []
    #     for locality in localities_data:
    #         if locality["department"]:
    #             data.append(locality)
    #     return data

    # async def courier_localities(self) -> list[dict]:
    #     localities_data = await self.check_cached_data()
    #     data = []
    #     for locality in localities_data:
    #         if locality["courier"]:
    #             data.append(locality)
    #     return data

    # def get_template(self) -> dict:
    #     return self.template
