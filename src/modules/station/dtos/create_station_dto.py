from pydantic import BaseModel

class StationCreateDTO(BaseModel):
    station_name: str
    endereco: str