from ..dtos import UserCreateDTO

class CreatorService:
    def create(self, data: UserCreateDTO):
        return {"message": "usuario criado"}
