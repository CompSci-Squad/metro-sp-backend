from ..dtos import UserUpdateDTO

class UpdaterService:
    async def update(self, data: UserUpdateDTO):
        return {"message": "usuario atualizado"}
