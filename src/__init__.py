from fastapi import FastAPI

from .modules import UsersController

app = FastAPI()

user_router = UsersController().router

app.include_router(user_router, prefix='/user')