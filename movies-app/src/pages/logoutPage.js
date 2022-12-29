import { useAuth } from "../contexts/authContext"; 
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

export default function LogoutPage() {
  //If the user is already logged in, redirect them to the home page
  const { currentUser } = getAuth();
  const { logout } = useAuth();
  
  useEffect(() => {
    if (currentUser) {
      logout();
    }
  }, [logout, currentUser]);

  return (
    <>
      <h1> You have successfully been logged out! </h1>
      <h2> Come back soon! <Link to="/">Log in</Link> </h2>
    </>
  );
}