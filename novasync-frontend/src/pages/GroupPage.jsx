import React, { useState } from 'react';
import useGroups from '../hooks/useGroups';
import '../styles/GroupPage.css';

const GroupPage = () => {
  const { groups, loading, createGroup, deleteGroup } = useGroups();

  const [groupName, setGroupName] = useState('');
  const [membersInput, setMembersInput] = useState('');
  const [msg, setMsg] = useState('');

  const handleAddGroup = async (e) => {
    e.preventDefault();
    setMsg('');

    if (!groupName.trim()) {
      setMsg("Error: Please enter a group name.");
      return;
    }

    const membersArray = membersInput
      .split(',')
      .map(m => m.trim())
      .filter(m => m !== '');

    if (membersArray.length < 4) {
      setMsg(`Error: Insufficient members. You added ${membersArray.length}, but at least 4 are required.`);
      return;
    }

    const result = await createGroup(groupName, membersArray);
    if (result && result._id) {
      setGroupName('');
      setMembersInput('');
    } else {
      setMsg(result.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    await deleteGroup(id);
  };

  return (
    <div className="page-container">

      <div className="content-wrapper">
        <div className="form-container">
          <form onSubmit={handleAddGroup} className="group-form">
            <h3 className='heading'>Add New Group</h3>
            <input
              type="text"
              className="form-input"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <input
              type="text"
              className="form-input"
              placeholder="Members (e.g. Alice, Bob, Charlie, Dave)"
              value={membersInput}
              onChange={(e) => setMembersInput(e.target.value)}
            />

            {msg && <div className="error-alert">{msg}</div>}

            <button type="submit" className="add-btn">Add Group</button>
          </form>
        </div>

        <div className="groups-section">
          <h2 className="section-title">All Groups</h2>

          {loading ? (
            <div className="empty-state">Loading groups from database...</div>
          ) : groups.length === 0 ? (
            <div className="empty-state">
              <h3>No groups created yet</h3>
              <p>Start by adding a group</p>
            </div>
          ) : (
            <div className="groups-grid">
              {groups.map((group) => (
                <div key={group._id} className="group-card">
                  <div className="card-header">
                    <h3 className="group-name">{group.name}</h3>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(group._id)}
                      title="Delete Group"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="card-body">
                    <strong>Members:</strong>
                    <p className="member-list">
                      {group.members.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupPage;