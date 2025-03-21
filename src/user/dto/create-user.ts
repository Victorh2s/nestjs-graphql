import { InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({
    message: "Este campo não pode estar vázio",
  })
  name: string;

  @IsEmail()
  @IsNotEmpty({
    message: "Este campo não pode estar vázio",
  })
  email: string;
}
