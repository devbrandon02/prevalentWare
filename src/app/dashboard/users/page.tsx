"use client";

import { Roles, type User } from "@/app/api/graphql/schema";
import ModalEditUser from "@/app/components/dashboard/modals/ModalEditUser";
import { getSession } from "@/app/lib/auth-action";
import { gql, useSuspenseQuery } from "@apollo/client";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";

const GET_USERS = gql`
	query Users {
		users {
			id
			name
			email
			phone
			roles
			createdAt
			updatedAt
		}
	}
`;

export default function User() {
	const { data, refetch } = useSuspenseQuery(GET_USERS);
	const [users, setusers] = useState<User[]>([]);
	const [session, setsession] = useState<Session>();
	const modalEditUserRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		setusers((data as any).users);
	}, [data]);

	const handleOpenModal = () => {
		if (modalEditUserRef.current) {
			localStorage.setItem("user", JSON.stringify(users[0]) || "");
			modalEditUserRef.current.showModal();
		}
	};

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
		<>
			{session?.user?.role === Roles.Admin ? (
				<div className="h-full flex flex-col gap-5">
					<div>
						<h2 className="font-semibold uppercase">Usuarios</h2>
					</div>

					<div>
						<div className="overflow-x-auto max-h-[600px]">
							<table className="table table-pin-rows table-md">
								<thead>
									<tr className="text-white">
										<th>ID</th>
										<th>Nombre</th>
										<th>Correo</th>
										<th>Rol</th>
										<th>Telefono</th>
										<th>Acciones</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user) => (
										<tr key={user.id}>
											<td>{user.id}</td>
											<td>{user.name}</td>
											<td>{user.email}</td>
											<td>{user.roles}</td>
											<td>{user.phone}</td>
											<td>
												<button
													onClick={handleOpenModal}
													className="btn btn-sm btn-warning"
												>
													Editar
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					<ModalEditUser refetch={refetch} modalRef={modalEditUserRef} />
				</div>
			) : (
				<h1>Solo admin</h1>
			)}
		</>
	);
}
