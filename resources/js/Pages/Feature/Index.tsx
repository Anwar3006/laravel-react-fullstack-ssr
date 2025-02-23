import FeatureItem from "@/Components/FeatureComponent/FeatureItem";
import { can } from "@/helper";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Feature, PageProps, PaginatedData } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Index({
  auth,
  features,
}: PageProps<{ features: PaginatedData<Feature> }>) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Features
        </h2>
      }
    >
      <Head title="Features" />

      {can(auth.user, "manage_features") && (
        <Link
          href={route("feature.create")}
          className="mb-10 flex gap-2 items-center justify-center px-3 py-3 bg-slate-400 hover:bg-slate-500 rounded-lg w-[200px]"
        >
          <p className="text-xl font-semibold">Add Feature</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Link>
      )}

      {features.data.map((feature) => (
        <FeatureItem feature={feature} user={auth.user} key={feature.id} />
      ))}
    </AuthenticatedLayout>
  );
}
