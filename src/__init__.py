from fastapi import FastAPI

from .modules import UsersController
from .modules import ClientsController
from .modules import StationsController

app = FastAPI()

user_router = UsersController().router
client_router = ClientsController().router
station_router = StationsController().router

app.include_router(user_router, prefix='/user', tags=["User"])
app.include_router(client_router, prefix='/client')
app.include_router(station_router, prefix='/station')