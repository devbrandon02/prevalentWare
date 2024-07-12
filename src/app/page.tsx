import LoginForm from "./components/auth/LoginForm";


export default async function Home() {	
	return (
		<main className="h-screen w-full flex justify-center items-center">
			<div className="h-[90%] flex flex-col items-center p-10 w-[90%] rounded-lg lg:h-[50%] sm:w-[60%] md:w-[60%] lg:w-[60%] 2xl:w-[20%] xl:w-[60%] bg-slate-700">
				<LoginForm />
			</div>
		</main>
	);
}
