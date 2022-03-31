import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Actions/User";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const { loading, error, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(resetPassword(params.token, password));
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
  }, [dispatch, alert, error, message]);

  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Media
        </Typography>

        <input
          className="resetPasswordInputs"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Link to="/">
          <Typography>Login</Typography>
        </Link>

        <Typography>Or</Typography>

        <Link to="/forgot/password">
          <Typography>Request Another Token</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
