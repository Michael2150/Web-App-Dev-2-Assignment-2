import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import "./login.css";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ isLogin }) {
    const emailRef = useRef();
    const [errorMessages, setErrorMessages] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, signup, resetPassword } = useAuth();
    const navigate = useNavigate();

    const errors = {
        email: "Invalid email address",
        email_in_use: "Email already in use",
        user_not_found: "User not found, please sign up",
        uname_password: "Invalid email or password",
        weak_pass: "Password must be at least 6 characters",
        confpass: "Password does not match",
        unknown: "Unknown error",
    };

    const onUserSignedUp = (user) => {
        console.log("User signed up: ", user);
        navigate("/dashboard");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isLogin) {
            const uname = event.target.uname.value;
            const pass = event.target.pass.value;
            login(uname, pass).then((result) => {
                navigate("/");
            }).catch((error) => {
                if (error.code === "auth/user-not-found") {
                    setErrorMessages({ name: "pass", message: errors.user_not_found });
                } else if (error.code === "auth/wrong-password") {
                    setErrorMessages({ name: "pass", message: errors.uname_password });
                } else if (error.code === "auth/invalid-email") {
                    setErrorMessages({ name: "uname", message: errors.email });
                } else {
                    setErrorMessages({ name: "pass", message: errors.unknown });
                }
            });

        } else {
            const uname = event.target.uname.value;
            const pass = event.target.pass.value;
            const confpass = event.target.confpass.value;
            if (pass !== confpass) {
              setErrorMessages({ name: "confpass", message: errors.confpass });
            } else {
              signup(uname, pass).then((result) => {
                onUserSignedUp(result.user);
              }).catch((error) => {
                  if (error.code === "auth/email-already-in-use") {
                      setErrorMessages({ name: "uname", message: errors.email_in_use });
                  } else if (error.code === "auth/weak-password") {
                      setErrorMessages({ name: "pass", message: errors.weak_pass });
                  } else if (error.code === "auth/invalid-email") {
                      setErrorMessages({ name: "uname", message: errors.email });
                  } else {
                      setErrorMessages({ name: "pass", message: errors.unknown });
                  }
              });
            }
        }
      };

      const handleResetPassword = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        if (email === "") {
          setErrorMessages({ name: "uname", message: errors.email });
        } else {
          resetPassword(email).then((result) => {
            setErrorMessages({ name: "forgot_password", message: "Password reset email sent, check your emails" });
          }).catch((error) => {
              if (error.code === "auth/user-not-found") {
                  setErrorMessages({ name: "uname", message: errors.user_not_found });
              } else if (error.code === "auth/invalid-email") {
                  setErrorMessages({ name: "uname", message: errors.email });
              } else {
                  setErrorMessages({ name: "uname", message: errors.unknown });
              }
          });
        }
      };
    
      const renderErrorMessage = (name) =>
        name === errorMessages.name && (
          <div className="error">{errorMessages.message}</div>
        );
    
      const renderForm = (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Email* </label>
              <input type="text" name="uname" ref={emailRef} required />
              {renderErrorMessage("uname")}
            </div>
            <div className="input-container">
              <label>Password* </label>
              <input type="password" name="pass" required />
              {renderErrorMessage("pass")}
            </div>
            {!isLogin ? (<div className="input-container">
              <label>Confirm Password* </label>
              <input type="password" name="confpass" required />
              {renderErrorMessage("confpass")}
            </div>): null}
            <div>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Link to={isLogin ? "/sign-up" : "/login"}>{isLogin ? "Sign Up" : "Login"}</Link>
            </div>
            <div>
                {isLogin ? <a href="#forgot_password"><span onClick={handleResetPassword}>Forgot password?</span></a> : null}
                {renderErrorMessage("forgot_password")}
            </div>
            <div className="button-container">
              <input type="submit" value={isLogin?"Login":"Sign up"}/>
            </div>
          </form>
        </div>
      );
    
      return (
        <div className="app">
          <div className="login-form">
            <div className="title">{isLogin? "Login" : "Sign up"}</div>
                {renderForm}
          </div>
        </div>
      );
}