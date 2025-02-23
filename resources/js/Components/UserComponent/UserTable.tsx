import { User } from "@/types";
import { Link } from "@inertiajs/react";
import { formatDistance } from "date-fns";

const UserTable = ({ users }: { users: User[] }) => {
  console.log(users);
  if (!users) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-700 rounded-lg px-3 py-2 mt-10">
        <p className="text-xl font-semibold text-gray-400">No data available</p>
        <p className="text-sm font-medium text-gray-500">
          Users will be automatically populated when they register
        </p>
      </div>
    );
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
            <th scope="col" className="px-6 py-3">
              Roles
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.name}
              </th>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                {user.created_at
                  ? formatDistance(user.created_at, new Date(), {
                      addSuffix: true,
                    })
                  : "-"}
              </td>
              <td className="px-6 py-4">
                {user.roles.length > 0 ? user.roles[0] : "-"}
              </td>
              <td className="px-6 py-4">
                <Link
                  href={route("user.edit", user.id)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
