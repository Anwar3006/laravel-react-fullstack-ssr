import UserTable from "@/Components/UserComponent/UserTable";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PaginatedData, User } from "@/types";
import { Head } from "@inertiajs/react";

export default function Index({ users }: { users: PaginatedData<User> }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Users
        </h2>
      }
    >
      <Head title="Users" />

      {users.data && <UserTable users={users.data} />}
    </AuthenticatedLayout>
  );
}
