from ..dtos import UserCreateDTO

class CreatorService:
    async def create(self, data: UserCreateDTO):
        return {"message": "usuario criado"}
