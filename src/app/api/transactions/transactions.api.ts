import { getSession } from "next-auth/react";
import prismaClient from "../db/prisma";
import {
	CreateTransactionInput,
	CreateTransactionResponse,
	ListTransactionsResponse,
	Roles,
	Transaction,
} from "../graphql/schema";
import { auth } from "../../../auth";

export class TransactionApi {
	constructor() {}

	async createTransactions(
		request: CreateTransactionInput
	): Promise<CreateTransactionResponse> {
    const session = await auth();

    if (!session) {
      throw new Error("@createTransactions: Not Authorize")
    }

	const auth0UserId = session.user?.id;

		try {
			await prismaClient.transaction.create({
				data: {
					amount: request.amount,
					concept: request.concept,
					type: request.type,
					user: {
						connect: {
							id: auth0UserId,
						},
					},
				},
			});

			return {
				msg: "Transaction created successfully",
			};
		} catch (error) {
			throw new Error(`@MovementsApi: Error creating user: ${error}`);
		}
	}

	async listTransactions(): Promise<ListTransactionsResponse> {
		try {
			const transactions = await prismaClient.transaction.findMany({
				include: {
					user: true,
				},
        orderBy: {
          createdAt: "desc"
        }
			});

			if (transactions.length === 0) {
				return {
					msg: "No transactions found",
					transactions: [],
					total: 0,
				};
			}

			const newTransactions: Transaction[] = transactions.map(
				(transaction) => ({
					id: transaction.id,
					concept: transaction.concept ?? "",
					amount: transaction.amount ?? 0,
					date: transaction.date.toString(),
					createdAt: transaction.createdAt.toString(),
					updatedAt: transaction.updatedAt.toString(),
					user: {
						id: transaction.userId,
						name: transaction.user.name ?? "",
						email: transaction.user.email ?? "",
						phone: transaction.user.phone ?? "",
						createdAt:
							transaction.user.createdAt?.toString() ??
							new Date().toISOString(),
						roles: transaction.user.role ?? Roles.User,
						updatedAt:
							transaction.user.updatedAt?.toString() ??
							new Date().toISOString(),
					},
				})
			);

			const total = newTransactions.reduce(
				(sum, transaction) => sum + transaction.amount,
				0
			);

			return {
				msg: "",
				transactions: newTransactions,
				total: total,
			};
		} catch (error) {
			throw new Error(`@MovementsApi: Error listing transactions: ${error}`);
		}
	}
  
}
