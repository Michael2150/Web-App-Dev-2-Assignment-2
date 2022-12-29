import React, { useEffect } from "react";
import Login from "../components/templateAuthPage"; 
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  //If the user is already logged in, redirect them to the home page
  const { currentUser } = getAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  
  return (
    <>
      <Login isLogin={true}/>
    </>
  );
};
export default LoginPage;