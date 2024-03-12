import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface RootState {
  auth: {
    username: string;
    accessToken: string;
  };
}

const Home: React.FC = () => {
  const username = useSelector((state: RootState) => state.auth.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="container">
      <header>
        <h1>
          Welcome Home : <span>{username}!</span>
        </h1>
      </header>
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
