"use client";

import { gql, useMutation } from "@apollo/client";
import { LegacyRef, useState } from "react";

interface FormData {
	amount: number;
	concept: string;
	date: string;
	type: string;
}

const CREATE_TRANSACTION = gql`
	mutation CreateTransaction($input: CreateTransactionInput!) {
		createTransaction(input: $input) {
			msg
		}
	}
`;

export default function ModalCreateMovements({
	modalRef,
	refetch,
}: {
	modalRef: LegacyRef<HTMLDialogElement>;
	refetch: any;
}) {
	const [createTransaction, { data, loading, error }] =
		useMutation(CREATE_TRANSACTION);
	const [formData, setFormData] = useState<FormData>({
		amount: 0,
		concept: "",
		date: "",
		type: "test",
	});

	const handleInput = (e: any) => {
		const fieldName = e.target.name;
		const fieldValue = e.target.value;

		setFormData((prevState) => ({
			...prevState,
			[fieldName]: fieldValue,
		}));
	};

	const handleCreateTransaction = async () => {
		try {
			await createTransaction({
				variables: {
					input: {
						amount: Number(formData.amount),
						concept: formData.concept,
						date: formData.date,
						type: formData.type,
					},
				},
			});

			await refetch();
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<div>
			<dialog
				id="my_modal_5"
				ref={modalRef}
				className="modal modal-bottom sm:modal-middle"
			>
				<div className="modal-box flex flex-col gap-3">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg">Nuevo Movimiento de Dinero!</h3>
					<div>
						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text">Monto:</span>
							</div>
							<input
								type="text"
								value={formData.amount}
								name="amount"
								onChange={(e) => handleInput(e)}
								placeholder="Example: 20000"
								className="input input-bordered w-full max-w-xs"
							/>
						</label>
					</div>

					<div>
						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text">Concepto:</span>
							</div>
							<input
								type="text"
								value={formData.concept}
								name="concept"
								onChange={(e) => handleInput(e)}
								placeholder="Example: Venta de Producto"
								className="input input-bordered w-full max-w-xs"
							/>
						</label>
					</div>

					<div>
						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text">Fecha:</span>
							</div>
							<input
								className="input input-bordered w-full max-w-xs"
								type="date"
								value={formData.date}
								name="date"
								onChange={(e) => handleInput(e)}
								placeholder="Selecciona fecha"
							/>
						</label>
					</div>
					<div className="mt-10">
						<button
							onClick={handleCreateTransaction}
							className="btn btn-warning w-full"
						>
							Crear
						</button>
					</div>
				</div>
			</dialog>
		</div>
	);
}
