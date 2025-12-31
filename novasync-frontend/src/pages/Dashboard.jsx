import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import useGroups from "../hooks/useGroups";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const { groups, fetchGroups } = useGroups();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return (
    <div className="dashboard-container">
      <h2>Your Dashboard</h2>
      <p>Welcome back, {user?.name || "User"}!</p>

      <h3>Your Groups</h3>
      <div className="group-list">
        {groups.length === 0 ? (
          <p>No groups yet.</p>
        ) : (
          groups.map((g) => (
            <div key={g._id} className="group-card">
              <div className="group-detail">
              <h4>{g.name}</h4>
              <p>{g.members?.length} members</p>
              </div>
            </div>
          ))
        )}
      </div>

      <Link to="/group" className="create-group-btn">
        + Create New Group
      </Link>
    </div>
  );
};

export default Dashboard;
