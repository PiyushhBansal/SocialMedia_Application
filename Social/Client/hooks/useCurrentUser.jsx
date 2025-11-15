import { useEffect } from "react";
import { getCurrentUser } from "../apiCalls/authCalls";
import { useDispatch } from "react-redux";
import { setUserData } from "../src/redux/userSlice";


function useCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getCurrentUser();
        console.log("Fetched user:", user);

        dispatch(setUserData(user));
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
    fetchData();
  }, [dispatch]);
}

export default useCurrentUser;