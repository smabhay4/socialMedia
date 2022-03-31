import { useState, useEffect } from "react";
import "./UpdatePassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Actions/User";
import { useAlert } from "react-alert";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword));
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
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Media
        </Typography>

        <input
          className="updatePasswordInputs"
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />

        <input
          className="updatePasswordInputs"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <Button disabled={loading} type="submit">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
