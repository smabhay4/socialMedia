import { useEffect, useState } from "react";
import "./Register.css";
import { Typography, Button, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts, registerUser } from "../../Actions/User";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(registerUser(name, email, password, avatar));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = (e) => {
      if (e.target.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, alert, error]);

  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Media
        </Typography>

        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          className="registerInputs"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="registerInputs"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="registerInputs"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Link to="/">
          <Typography>Already Signed Up?</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
