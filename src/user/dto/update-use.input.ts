import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true }) // Field declara o campo para o graphql
  @IsString()
  @IsNotEmpty({
    message: "Este campo não pode estar vázio",
  })
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true }) // nulltable deixa o campo como opcional para o graphql
  @IsEmail()
  @IsNotEmpty({
    message: "Este campo não pode estar vázio",
  })
  @IsOptional()
  email?: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({
    message: "Este campo não pode estar vázio",
  })
  password?: string;
}
