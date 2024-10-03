from pydantic import BaseModel

class ClientCreateDTO(BaseModel):
    username: str
    cpf: int