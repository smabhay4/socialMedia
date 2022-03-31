import React from "react";
import "./Search.css";
import { Typography, Button } from "@mui/material";
import { getAllUsers } from "../../Actions/User";
import { useSelector, useDispatch } from "react-redux";
import User from "../User/User";

const Search = () => {
  const [name, setName] = React.useState("");

  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.allUsers);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name);
    dispatch(getAllUsers(name));
  };

  return (
    <div className="search">
      <form className="searchForm" onClick={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Media
        </Typography>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Button disabled={loading} type="submit">
          Search
        </Button>
        <div className="searchResults">
          {users &&
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
