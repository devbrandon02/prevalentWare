"use client";

import { signInEmail } from "@/app/lib/auth-action";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CredentialForm() {
	const [error, seterror] = useState("");
	const router =  useRouter()
	const [pending, setpending] = useState(false);
	const [info, setinfo] = useState({
		email: "",
		password: "",
	});

	const handleInput = (e: any) => {
		setinfo((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		console.log("handle submit", info);

		if (info.email.length < 1 || info.password.length < 1) {			
			seterror("Must Provide Email and Password");
			return;
		}

		try {
			setpending(true);
			await signInEmail(info.email, info.password);

			seterror("")			
			setpending(false);

			router.push("/dashboard");
		} catch (error) {
			console.log("error", error);
			
			setpending(false);
			seterror("Something went wrong");
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<div>
					<label className="input input-bordered flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="h-4 w-4 opacity-70"
						>
							<path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
							<path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
						</svg>
						<input
							type="text"
							name="email"
							value={info.email}
							onChange={handleInput}
							className="grow"
							placeholder="admin@admin.com"
						/>
					</label>
				</div>
				<div>
					<label className="input input-bordered flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="h-4 w-4 opacity-70"
						>
							<path
								fillRule="evenodd"
								d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
								clipRule="evenodd"
							/>
						</svg>
						<input
							type="password"
							placeholder="password"
							onChange={handleInput}
							value={info.password}
							className="grow"
							name="password"
						/>
					</label>
				</div>
				<div>
					<button type="submit" className="btn btn-warning w-full">
						Login
					</button>
				</div>
				<div className="w-full text-center bg-red-500 text-white rounded-xl">
					{error}
				</div>
			</form>
		</div>
	);
}

