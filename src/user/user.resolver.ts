import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { CreateUserInput } from "./dto/create-user.input";
import { User } from "./user.entity";
import { UpdateUserInput } from "./dto/update-use.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/auth.guard";

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async userById(@Args("id") id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Query(() => User)
  async userByEmail(@Args("email") email: string): Promise<User> {
    return this.userService.findUserByEmail(email);
  }

  @Mutation(() => User)
  async createUser(@Args("data") data: CreateUserInput): Promise<User> {
    return await this.userService.createUser(data);
  }

  @Mutation(() => User)
  async updateUser(
    @Args("id") id: string,
    @Args("data") data: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.updateUser(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args("id") id: string): Promise<boolean> {
    return await this.userService.deleteUser(id);
  }
}
