import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismaClient from "@/app/api/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth({
	callbacks: {
		async signIn({ user }) {
			console.log("user", user);
			return true;
		},

		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},

		async session({ session, token }) {
			console.log("sessionaaa", session, token);

			if (session?.user) {
				session.user.id = token.id;
				session.user.role = token.role;
			}

			return session;
		},

		async authorized({ auth }) {
			return !!auth;
		},
	},
	pages: {
		signIn: "/",
	},
	session: {
		strategy: "jwt",
	},
	adapter: PrismaAdapter(prismaClient) as Adapter,
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				console.log(credentials);

				const userFound = await prismaClient.user.findUnique({
					where: {
						email: credentials.email as string,
					},
				});

				if (!userFound) throw new Error("No user found");

				console.log(userFound);

				const matchPassword = await compare(
					credentials.password as string,
					userFound.password as string
				);

				if (!matchPassword) throw new Error("Wrong password");

				console.log("userFound", userFound);

				return {
					id: userFound.id,
					email: userFound.email,
					name: userFound.name,
					role: userFound.role,
				};
			},
		}),
	],
});
