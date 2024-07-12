"use client"

import { logout } from "@/app/lib/auth-action";
import { auth } from "../../../auth";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async (e:any) => {
    e.preventDefault();
    await logout();
    router.push('/');
  };

  return (
    <div className="h-screen overflow-hidden w-full flex flex-col gap-3">
      <div>
        <h1 className="text-xl text-center font-semibold">PrevalentWare</h1>
      </div>

      <div className="w-full">
        <button className="btn btn-warning w-full font-semibold" onClick={() => router.push('/dashboard/transactions')}>
          Ingresos y egresos
        </button>
      </div>

      <div className="w-full">
        <button className="btn btn-warning w-full font-semibold" onClick={() => router.push('/dashboard/users')}>
          Usuarios
        </button>
      </div>

      <div className="w-full">
        <button className="btn btn-warning w-full font-semibold" onClick={() => router.push('/dashboard/reports')}>
          Reportes
        </button>
      </div>

      <div className="h-full flex">
        <form className="w-full flex items-end" onSubmit={handleLogout}>
          <button type="submit" className="btn btn-error w-full">
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
