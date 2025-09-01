import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users"); // calls http://localhost:5000/api/users
        setUsers(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">UniME Users</h1>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user._id} className="p-2 border rounded mb-2">
            {user.username}
          </div>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}

export default App;
