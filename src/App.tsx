import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import NotFound from "./pages/notfound";

const App: React.FC = () => {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <BrowserRouter>
      <Routes>
        {accessToken ? (
          <Route path="/" element={<Home />}></Route>
        ) : (
          <>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
          </>
        )}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
