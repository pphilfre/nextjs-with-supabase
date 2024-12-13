import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  tutor_group: string;
}

interface ManageUsersProps {
  users: User[];
}

const ManageUsers = ({ users }: ManageUsersProps) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Tutor Group
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b border-gray-200">{user.first_name} {user.last_name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
              <td className="py-2 px-4 border-b border-gray-200">{user.tutor_group}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <Link href={`/edit-user/${user.id}`}>
                  <a className="text-sky-500">Edit</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const supabase = await createClient();
  const { data: users, error } = await supabase
    .from('students')
    .select('id, email, first_name, last_name, tutor_group');

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      users,
    },
  };
};

export default ManageUsers;