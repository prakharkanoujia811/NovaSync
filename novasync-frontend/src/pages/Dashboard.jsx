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

  const userCreatedGroupsCount = groups.filter(
    (g) => g.user === user?._id).length;

  return (
    <div className="dashboard-container">
      <div>
      <h2 className="dashboard-header">Your Dashboard</h2>
      <div className="profile">
        <div className="profile-card">
          <div className="profile-info">
            <img src="default.png" className="profile-pic"></img>
            <h3>{user?.name || "User Name"}</h3>
            <p className="profile-email">Email: {user?.email}</p>
          </div>
          <div className="profile-stats">
            <span className="stat-label">Groups Created:</span>
            <span className="stat-value">{userCreatedGroupsCount}</span>
          </div>
        </div>
      </div>
      </div>
      <div className="Groups">
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

      <Link to="/group" className="add-btn create-group-btn">
        + Create New Group
      </Link>
    </div>
    </div>
  );
};

export default Dashboard;
