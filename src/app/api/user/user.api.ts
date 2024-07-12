import * as bcrypt from "bcryptjs";
import { CreateUserRequest, CreateUserResponse, EditUserRequest, EditUserResponse, User } from "../graphql/schema";
import prisma from "@/app/api/db/prisma";
import { RoleEnum } from "@prisma/client";

export class UserApi {
	constructor() {}

	async createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
		try {
			const { name, email, phone, role, password } = request;
			console.log("Creating user...", { name, email, phone, role });

			if (!name || !email || !phone || !role) {
				return {
					msg: `Missing required fields!`,
				};
			}

			const passwordHash = await bcrypt.hash(password, 10);
			const userRegister = await prisma.user.findUnique({ where: { email } });

			if (userRegister) {
				return {
					msg: `User already exists!`,
				};
			}

			await prisma.user.create({
				data: {
					name,
					email,
					phone,
					role: role as RoleEnum,
					password: passwordHash,
				},
			});

			return {
				msg: `User created successfully!`,
			};
		} catch (error) {
			throw new Error(`@UserApi: Error creating user: ${error}`);
		}
	}

	async listUsers(): Promise<User[]> {
		try {
			const users = await prisma.user.findMany();

			if (users.length === 0) {
				throw new Error(`No users found!`);
			}

			let newUser: User[] = users.map((user) => {
			  return {
				id: user.id,
				name: user.name || "",
				email: user.email || "",
				phone: user.phone || "",
				role: user.role,
				createdAt: user.createdAt.toString(),
				roles: user.role,
				updatedAt: user.updatedAt.toString(),
			  };
			});

			return newUser;
		} catch (error) {
			throw new Error(`@UserApi: Error listing users: ${error}`);
		}
	}

  async editUser (request: EditUserRequest): Promise<EditUserResponse> {
    try {
      const { name, role, id } = request;
      console.log("Editing user...", { name, role });

      if (!name ||  !role) {
        return {
          msg: `Missing required fields!`,
        };
      }

      await prisma.user.update({
        where: { id },
        data: {
          name,
          role: role as RoleEnum,
        },
      });

      return {
        msg: `User edited successfully!`,
      };
    } catch (error) {
      throw new Error(`@UserApi: Error editing user: ${error}`);
    }
  }
}
