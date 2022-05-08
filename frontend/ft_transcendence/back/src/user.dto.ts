import { IsArray, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class UserDto
{
    @IsNotEmpty({ message: "Should have an ID"})
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(8, 8)
    login: string;
    
    @IsNotEmpty()
    @Length(50)
    image_url: string;

    @IsNotEmpty()
	@IsString()
	username: string;

    @IsArray()
	joinedRooms: number[] = [];
}