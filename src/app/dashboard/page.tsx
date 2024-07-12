import { redirect } from "next/navigation";
import { auth } from "../../auth";
import OptionsMenu from "../components/dashboard/OptionsMenu/Options";

export default async function Dashboard() {
	return (
		<main className=" h-full">
			<div className="flex h-full w-full items-center justify-center gap-10">
        <OptionsMenu />
			</div>
		</main>
	);
}
