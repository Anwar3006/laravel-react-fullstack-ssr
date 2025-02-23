import { Role, User } from "@/types";

const UserRolePicker = ({
  user,
  roles,
  value,
  onChange,
}: {
  user: User;
  roles: Role[];
  value: string;
  onChange: (e: any) => void;
}) => {
  return (
    <div className="max-w-full mx-auto">
      <label
        htmlFor="roles"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select the role
      </label>
      <select
        id="roles"
        value={value}
        onChange={(e: any) => onChange(e)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {roles.map((role: Role) => (
          <option key={role.id} value={role.name}>
            {role.name.toLocaleUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserRolePicker;
