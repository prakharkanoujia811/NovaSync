import { useContext } from "react";
import { GroupContext } from "../context/GroupContext";

export const useGroups = () => useContext(GroupContext);

export default useGroups;
