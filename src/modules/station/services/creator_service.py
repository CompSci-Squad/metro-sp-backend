from ..dtos import StationCreateDTO

class CreatorService:
    async def create(self, data: StationCreateDTO):
        return {"message": "estação criada"}
