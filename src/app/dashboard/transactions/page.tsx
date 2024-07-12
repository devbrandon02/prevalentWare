"use client";

import { Roles, Transaction } from "@/app/api/graphql/schema";
import ModalCreateMovements from "@/app/components/dashboard/modals/ModalCreateMovements";
import { getSession } from "@/app/lib/auth-action";
import { auth } from "@/auth";
import { useSuspenseQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";

const GET_TRANSACTIONS = gql`
	query ListTransactions {
		listTransactions {
			total
			msg
			transactions {
				id
				amount
				concept
				date
				user {
					id
					name
					email
					phone
					roles
					createdAt
					updatedAt
				}
				createdAt
				updatedAt
			}
		}
	}
`;

export default function Movements() {
	const modalCreateMovementsRef = useRef<HTMLDialogElement>(null);
	const [session, setsession] = useState<Session>()
	const { data, refetch } = useSuspenseQuery<{
		listTransactions: {
			transactions: Transaction[];
			total: number;
			msg: string;
		};
	}>(GET_TRANSACTIONS);
	const [listTransactions, setlistTransactions] = useState<Transaction[]>([]);

	const handleOpenModal = () => {
		if (modalCreateMovementsRef.current) {
			modalCreateMovementsRef.current.showModal();
		}
	};

	useEffect(() => {
		setlistTransactions(data?.listTransactions?.transactions);
	}, [data]);

	useEffect(() => {
		const fetchSession = async () => {
			let sess = await getSession();
			console.log("session", sess);
		
			if (sess !== null) {
				setsession(sess);
			}
		};
	
		fetchSession();
	}, []);
	

	return (
		<div className="h-full flex flex-col gap-5">
			<div>
				<h2 className="font-semibold uppercase">Ingresos y egresos</h2>
			</div>
			<div className="w-full h-[5%]  flex justify-end items-center">
				{session?.user?.role === Roles.Admin && (				<button
					onClick={handleOpenModal}
					className="btn btn-warning font-semibold"
				>
					Nuevo
				</button>)}

			</div>

			<div>
				<div className="overflow-x-auto max-h-[600px]">
					<table className="table table-pin-rows table-md">
						<thead>
							<tr className="text-white">
								<th>ID</th>
								<th>Concepto</th>
								<th>Monto</th>
								<th>Fecha</th>
								<th>Usuario</th>
								<th>Fecha Creacion</th>
								{/* <th>Acciones</th> */}
							</tr>
						</thead>
						<tbody>
							{listTransactions.map((transaction, index) => (
								<tr key={index}>
									<th>{transaction.id}</th>
									<td>{transaction.concept}</td>
									<td>{transaction.amount}</td>
									<td>{transaction.date}</td>
									<td>{transaction.user.name}</td>
									<td>{transaction.createdAt}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div>
				<div className="w-full flex justify-end">
					<h2 className="font-semibold uppercase">
						Total: ${data.listTransactions.total}
					</h2>
				</div>
			</div>

			<ModalCreateMovements refetch={refetch} modalRef={modalCreateMovementsRef} />
		</div>
	);
}