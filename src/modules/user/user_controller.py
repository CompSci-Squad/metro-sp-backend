from fastapi import APIRouter

from .dtos import UserCreateDTO, UserUpdateDTO

from .services import CreatorService, IndexerService, FinderService, RemoverService, UpdaterService

class UsersController:
    __creator_service: CreatorService
    __indexer_service: IndexerService
    __finder_service: FinderService
    __remover_service: RemoverService
    __updater_service: UpdaterService

    def __init__(self):
        self.router = APIRouter()
        self._add_routes()
        self.__creator_service = CreatorService()
        self.__indexer_service = IndexerService()
        self.__finder_service = FinderService()
        self.__remover_service = RemoverService()
        self.__updater_service = UpdaterService()

    def _add_routes(self):
        self.router.add_api_route("/", self.create_user, methods=["POST"])
        self.router.add_api_route("/", self.find_users, methods=["GET"])
        self.router.add_api_route("/{id}", self.find_user, methods=["GET"])
        self.router.add_api_route("/{username}", self.update_user, methods=["PATCH"])
        self.router.add_api_route("/{username}", self.delete_user, methods=["DELETE"])

    async def find_users(self):
        return await self.__indexer_service.index()

    async def find_user(self):
        return await self.__finder_service.find()

    async def create_user(self, data: UserCreateDTO):
        return await self.__creator_service.create(data)

    async def update_user(self, data: UserUpdateDTO):
        return await self.__updater_service.update(data)

    async def delete_user(self, username: str):
        return await self.__remover_service.remove()
