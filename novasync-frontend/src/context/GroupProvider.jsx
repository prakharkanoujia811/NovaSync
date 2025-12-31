import { useState, useEffect } from "react";
import { GroupContext } from "./GroupContext";
import API from "../services/api";

export const GroupProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchGroups = async () => {
    try {
      setLoading(true);
      const res = await API.get("/groups");
      setGroups(res.data);
    } catch (err) {
      console.error("Error fetching groups:", err);
    } finally {
      setLoading(false);
    }
  };


  const createGroup = async (name, members = []) => {
    try {
      const res = await API.post("/groups", { name, members });
      setGroups((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  const deleteGroup = async (groupId) => {
    try {
      await API.delete(`/groups/${groupId}`);
      setGroups((prev) => prev.filter((g) => g._id !== groupId));
      setCurrentGroup(null);
    } catch (err) {
      console.error("Error deleting group:", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

    return (
        <GroupContext.Provider value={{ groups, currentGroup, loading, fetchGroups, createGroup, deleteGroup }}>
            {children}
        </GroupContext.Provider>
    );
};