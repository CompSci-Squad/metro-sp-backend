from fastapi import APIRouter

from .dtos import StationCreateDTO

from .services import CreatorService

class StationsController:
    __creator_service: CreatorService

    def __init__(self):
        self.router = APIRouter()
        self._add_routes()
        self.__creator_service = CreatorService()

    def _add_routes(self):
        self.router.post("/")(self.create_station)
        self.router.put("/{station_name}")(self.update_station)
        self.router.delete("/{station_name}")(self.delete_station)

    async def create_station(self, data: StationCreateDTO):
        return self.__creator_service.create(data)

    async def update_station(self, station_name: str):
        return {"message": "Station {station_name} updated successfully"}

    async def delete_station(self, station_name: str):
        return {"message": "Station {station_name} deleted successfully"}
