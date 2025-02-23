import Link from 'next/link';

const Sidebar = ({ role }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <ul className="mt-4">
        {role === 'user' && (
          <>
            <li className="mb-2">
              <Link href="/dashboard/user/applications">📄 My Applications</Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/user/apply-loan">💰 Apply Loan</Link>
            </li>
          </>
        )}

        {role === 'ca' && (
          <li className="mb-2">
            <Link href="/dashboard/ca/applications">📑 Assigned Applications</Link>
          </li>
        )}

        {role === 'admin' && (
          <>
            <li className="mb-2">
              <Link href="/dashboard/admin/applications">📋 Loan Applications</Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/admin/manage-documents">📂 Manage Documents</Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/admin/manage-loans">🏦 Manage Loans</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
