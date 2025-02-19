import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Feature } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Edit({ feature }: { feature: Feature }) {
  const user = usePage().props.auth.user;

  const { data, setData, put, errors, processing, recentlySuccessful } =
    useForm({
      name: feature.name,
      description: feature.description,
    });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log(data);
    put(route("feature.update", feature.id), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit a Feature
        </h2>
      }
    >
      <Head title="Features" />

      <Link
        className="mb-10 flex gap-2 items-center justify-center px-3 py-2 bg-slate-400 hover:bg-slate-500 rounded-lg w-[100px]"
        href={route("feature.index")}
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
          <h2 className="text-xl"> Create a New Feature</h2>
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
              />

              <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="w-3/4">
              <InputLabel htmlFor="description" value="Description" />

              <ReactQuill
                className="h-[300px] mb-12 "
                theme="snow"
                value={data.description}
                onChange={(value) => setData("description", value)}
              />

              <InputError className="mt-2" message={errors.description} />
            </div>

            <button
              className="bg-white/90 text-zinc-900 hover:bg-white/70 px-4 py-3 rounded-lg"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
