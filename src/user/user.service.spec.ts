import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./user.entity";
import TestUtil from "./../common/test/util";
import {
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

describe("UserService", () => {
  let service: UserService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("When search find all users", () => {
    it("should be list all users", async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.find.mockReturnValue([user, user]);

      const users = await service.findAllUsers();

      expect(users).toHaveLength(2);
      expect(users[0].name).toEqual("Jhon doe");
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe("When search user by id", () => {
    it("should be find user by Id", async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOne.mockReturnValue(user);

      const userFound = await service.findUserById("1");

      expect(userFound).toMatchObject({ name: user.name });
      expect(userFound.name).toEqual("Jhon doe");
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it("should return a expection when does not to find a user", () => {
      mockRepository.findOne.mockReturnValue(null);

      expect(service.findUserById("1")).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe("When create user", () => {
    it("should create a user", async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockReturnValue(user);

      const savedUser = await service.createUser(user);

      expect(savedUser).toMatchObject(user);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });

    it("should return a exception when doesnt create a user", async () => {
      const user = TestUtil.giveMeAValidUser();

      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockReturnValue(null);

      await service.createUser(user).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: "Erro ao criar Usuário.",
        });
      });

      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe("When update user", () => {
    it("should update a user", async () => {
      const user = TestUtil.giveMeAValidUser();
      const updatedUser = {
        name: "Nome Atualizado",
      };
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.update.mockReturnValue({
        ...user,
        ...updatedUser,
      });
      mockRepository.create.mockReturnValue({
        ...user,
        ...updatedUser,
      });

      const resultUser = await service.updateUser("1", {
        ...user,
        ...updatedUser,
      });

      expect(resultUser).toMatchObject(updatedUser);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("When delete user", () => {
    it("should delete a existing user", async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.delete.mockReturnValue(user);

      const deletedUser = await service.deleteUser("1");

      expect(deletedUser).toBe(true);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
