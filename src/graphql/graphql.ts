import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { UserApi } from "../app/api/user/user.api";
import { loadSchemaSync } from "@graphql-tools/load";
import {
	CreateUserRequest,
	ListTransactionsResponse,
	Resolvers,
} from "../app/api/graphql/schema";
import path from "path";
import { TransactionApi } from "@/app/api/transactions/transactions.api";

const schemaPath = path.resolve(
	process.cwd(),
	"src/app/api/graphql/schema.graphql"
);
console.log("Resolved schema path:", schemaPath);

const typeDefs = loadSchemaSync(schemaPath, {
	loaders: [new GraphQLFileLoader()],
});

const resolvers: Resolvers = {
	Query: {
		listTransactions: async (): Promise<ListTransactionsResponse> => {
			const transactionApi = new TransactionApi();
			return await transactionApi.listTransactions();
		},
		users : async () => {
			const userApi = new UserApi();
			return await userApi.listUsers();
		}
	},

	Mutation: {
		createUser: async (_, { input }: { input: CreateUserRequest }) => {
			const userApi = new UserApi();
			return await userApi.createUser(input);
		},
		createTransaction: async (_, { input }) => {
			const transactionApi = new TransactionApi();
			return await transactionApi.createTransactions(input);
		},
		editUser: async (_, { input }) => {
			const userApi = new UserApi();
			return await userApi.editUser(input);
		},
	},
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
	schema,
});

export default startServerAndCreateNextHandler(server);
