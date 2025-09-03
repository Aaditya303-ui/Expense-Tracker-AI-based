import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li className="mb-2"><Link to="/admin/dashboard">Dashboard</Link></li>
          <li className="mb-2"><Link to="/admin/users">Users</Link></li>
          <li className="mb-2"><Link to="/admin/expenses">Expenses</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;
