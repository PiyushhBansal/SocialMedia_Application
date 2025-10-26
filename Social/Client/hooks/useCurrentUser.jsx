import React from "react";
import { useEffect } from "react";
import { getCurrentUser } from "../apiCalls/authCalls";
import { useDispatch } from "react-redux";
import { setUserData } from "../src/redux/userSlice";


function useCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCurrentUser();
        console.log("Fetched user:", response);

        // If backend response = { data: {...}, token, message }
        dispatch(setUserData(response.data));
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
    fetchData();
  }, [dispatch]);
}

export default useCurrentUser;