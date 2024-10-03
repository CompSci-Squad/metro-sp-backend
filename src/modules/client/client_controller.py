from fastapi import APIRouter

from .dtos import ClientCreateDTO

from .services import CreatorService

class ClientsController:
    __creator_service: CreatorService

    def __init__(self):
        self.router = APIRouter()
        self._add_routes()
        self.__creator_service = CreatorService()

    def _add_routes(self):
        self.router.post("/")(self.create_client)
        self.router.put("/{username}")(self.update_client)
        self.router.delete("/{username}")(self.delete_client)

    async def create_client(self, data: ClientCreateDTO):
        return self.__creator_service.create(data)

    async def update_client(self, username: str, cpf: int):
        return {"message": "Client {username} updated successfully"}

    async def delete_client(self, cpf: int):
        return {"message": "Client {username} deleted successfully"}
