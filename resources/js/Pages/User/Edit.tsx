import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import UserRolePicker from "@/Components/UserComponent/UserRolePicker";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Role, User } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import "react-quill/dist/quill.snow.css";

export default function Edit({ roles, user }: { roles: Role[]; user: User }) {
  const clientRole = user?.roles[0];

  const { data, setData, patch, errors, processing } = useForm({
    name: user.name,
    email: user.email,
    role: clientRole,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    data.role = data.role.toLowerCase();
    console.log(data);
    patch(route("user.update", user.id), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit a User
        </h2>
      }
    >
      <Head title="User" />

      <Link
        className="mb-10 flex gap-2 items-center justify-center px-3 py-2 bg-slate-400 hover:bg-slate-500 rounded-lg w-[100px]"
        href={route("user.index")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        <p className="text-xl font-semibold">Back</p>
      </Link>

      <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
        <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-8 items-center">
          <h2 className="text-xl"> Update a User's Role</h2>
          <form
            onSubmit={submit}
            className="mt-6 space-y-6 w-full flex flex-col items-center justify-center"
          >
            <div className="w-3/4">
              <InputLabel htmlFor="name" value="Name" />

              <TextInput
                id="name"
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
                isFocused
                autoComplete="name"
                disabled
              />

              <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="w-3/4">
              <InputLabel htmlFor="email" value="Email" />

              <TextInput
                id="email"
                className="mt-1 block w-full"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                required
                isFocused
                disabled
              />

              <InputError className="mt-2" message={errors.email} />
            </div>

            <div className="w-3/4">
              <UserRolePicker
                user={user}
                roles={roles}
                value={data.role}
                onChange={(e: any) => setData("role", e.target.value)}
              />

              <InputError className="mt-2" message={errors.role} />
            </div>

            <button
              className="bg-white/90 text-zinc-900 hover:bg-white/70 px-4 py-3 rounded-lg"
              type="submit"
              disabled={processing}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
