import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, dispatch, error, message]);

  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Media
        </Typography>

        <input
          className="forgotPasswordInputs"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button disabled={loading} type="submit">
          Send Token
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
