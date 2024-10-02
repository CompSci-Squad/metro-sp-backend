from ..dtos import ClientCreateDTO

class CreatorService:
    async def create(self, data: ClientCreateDTO):
        return {"message": "cliente criado"}
