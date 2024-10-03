from fastapi import APIRouter

from .dtos import UserCreateDTO

from .services import CreatorService

class UsersController:
    __creator_service: CreatorService

    def __init__(self):
        self.router = APIRouter()
        self._add_routes()
        self.__creator_service = CreatorService()

    def _add_routes(self):
        self.router.post("/")(self.create_user)
        self.router.put("/{username}")(self.update_user)
        self.router.delete("/{username}")(self.delete_user)

    async def create_user(self, data: UserCreateDTO):
        return self.__creator_service.create(data)

    async def update_user(self, username: str, email: str):
        return {"message": "User {username} updated successfully"}

    async def delete_user(self, username: str):
        return {"message": "User {username} deleted successfully"}
