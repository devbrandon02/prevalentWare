"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OptionsMenu() {
  const router = useRouter()
	const [optionsMenu] = useState([
		{
			title: "Sistema de Gestion de Ingresos y gastos",
      redirect: "/dashboard/transactions",
		},
		{
			title: "Gestion de Usuarios",
      redirect: "/dashboard/users",
		},
		{
			title: "Reportes",
      redirect: "/dashboard/reports",
		},
	]);

  const redirectTo = (path: string) => {
    if (!path) return

    router.push(path)
  }

	return optionsMenu.map((option, index) => (
		<div
			key={index}
      onClick={() => {redirectTo(option.redirect)}}
			className="h-[10%] w-[10%] rounded-xl cursor-pointer bg-yellow-400 flex items-center justify-center p-2"
		>
			<p className="text-center text-slate-800 font-semibold">{option.title}</p>
		</div>
	));
}
