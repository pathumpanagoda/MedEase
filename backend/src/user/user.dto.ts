import { IsString, IsNumber, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsNumber()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class UpdateUserDto {
  @IsString()
  name?: string;

  @IsString()
  address?: string;

  @IsNumber()
  age?: number;

  @IsEmail()
  email?: string;
}
