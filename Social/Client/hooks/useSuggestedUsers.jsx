import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestions } from "../apiCalls/authCalls";
import { setSuggestedUsers } from "../src/redux/userSlice";

export default function useSuggestedUsers() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) return;
    const fetchUsers = async () => {
      try {
        const result = await getSuggestions();
        dispatch(setSuggestedUsers(result));
      } catch (error) {
        console.log("Error fetching suggestions:", error);
      }
    };
    fetchUsers();
  }, [userData, dispatch]);
}
