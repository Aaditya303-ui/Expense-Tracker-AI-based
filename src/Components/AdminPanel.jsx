import { useEffect, useState } from "react";
import axios from "axios";
import "../Styling/admin.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", role: "user", password: "" });
  const [editUserId, setEditUserId] = useState(null);
  const token = localStorage.getItem("token"); // JWT from login

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Create new user
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/admin/user",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFormData({ name: "", email: "", role: "user", password: "" });
      fetchUsers();
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setEditUserId(user._id);
    setFormData({ name: user.name, email: user.email, role: user.role, password: "" });
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/admin/user/${editUserId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditUserId(null);
      setFormData({ name: "", email: "", role: "user", password: "" });
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>👨‍💻 Admin Dashboard</h2>
        {/* <p>Manage users with ease (CRUD Operations)</p> */}
      </div>

      {/* Create / Update Form */}
      <form className="admin-form" onSubmit={editUserId ? handleUpdate : handleCreate}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required={!editUserId} // Password required only for creating new user
        />

        <button type="submit" className="create-btn">
          {editUserId ? "Update User" : "Add User"}
        </button>
        {editUserId && (
          <button type="button" className="cancel-btn" onClick={() => {
            setEditUserId(null);
            setFormData({ name: "", email: "", role: "user", password: "" });
          }}>
            Cancel
          </button>
        )}
      </form>

      {/* Users Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(u)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(u._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-users">
                  🚫 No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
