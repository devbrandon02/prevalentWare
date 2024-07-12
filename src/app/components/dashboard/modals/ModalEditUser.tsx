import { Roles } from "@/app/api/graphql/schema";
import { gql, useMutation } from "@apollo/client";
import { LegacyRef, useState } from "react";

interface FormData {
  name: string;
  role: Roles;
}

const EDIT_USER = gql`
  mutation EditUser($input: EditUserRequest!) {
    editUser(input: $input) {
      msg
    }
  }
`;

export default function ModalEditUser({
  modalRef,
  refetch,
}: {
  modalRef: LegacyRef<HTMLDialogElement>;
  refetch: any;
}) {
  const [editUser, { data, loading, error }] = useMutation(EDIT_USER);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: Roles.User, // Default role selection
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleEditUser = async () => {
    const user = localStorage.getItem("user");
    const userParsed = JSON.parse(user || "");

    try {
      await editUser({
        variables: {
          input: {
            id: userParsed.id,
            name: formData.name,
            role: formData.role,
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
                <span className="label-text">Nombre:</span>
              </div>
              <input
                type="text"
                value={formData.name}
                name="name"
                onChange={(e) => handleInput(e)}
                placeholder="Example: Fulanito"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>

          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Rol:</span>
              </div>
              <select
                value={formData.role}
                onChange={(e) => handleInput(e)}
                className="select w-full max-w-xs"
                name="role"
              >
                <option value={Roles.User}>USER</option>
                <option value={Roles.Admin}>ADMIN</option>
              </select>
            </label>
          </div>
          <div className="mt-10">
            <button
              onClick={handleEditUser}
              className="btn btn-warning w-full"
            >
              Editar
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
