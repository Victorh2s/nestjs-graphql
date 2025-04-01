import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({
    message: "Este campo não pode estar vázio",
  })
  name: string;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty({
    message: "Este campo não pode estar vázio",
  })
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({
    message: "Este campo não pode estar vázio",
  })
  password: string;
}
