import { Injectable } from "@nestjs/common";
import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";

@ObjectType()
@Injectable()
export class AuthType {
  @Field(() => User)
  user: User;
  token: string;
}
