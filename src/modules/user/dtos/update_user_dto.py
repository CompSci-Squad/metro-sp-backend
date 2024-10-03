from pydantic import BaseModel, EmailStr
from typing import Optional

class UserUpdateDTO(BaseModel):
    username: Optional[str]
    email: Optional[EmailStr]