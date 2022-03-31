import { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { Typography, Button, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../../Actions/User";
import { useAlert } from "react-alert";
import Loader from "../../Components/Loader/Loader";

const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [prevAvatar, setPrevAvatar] = useState(user.avatar.url);
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    dispatch(loadUser());
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = (e) => {
      if (e.target.readyState === 2) {
        setPrevAvatar(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearError" });
    }
    if (updateError) {
      alert.error(updateError);
      dispatch({ type: "clearError" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, alert, error, updateError, message]);

  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Media
        </Typography>

        <Avatar
          src={prevAvatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          className="updateProfileInputs"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="updateProfileInputs"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button disabled={updateLoading} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
