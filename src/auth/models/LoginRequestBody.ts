import { IsNumber, IsString } from 'class-validator';

export class LoginRequestBody {
  @IsNumber()
  id: number;

  @IsString()
  password: string;
}
