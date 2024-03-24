import { Route, Routes } from "react-router-dom";
import "./App.css";
import React, { Suspense } from "react";
import Loading from "./components/loading";
import AuthLayout from "./utils/layout";
import { toast } from "react-toastify";

toast.configure();
const App: React.FC = () => {
  const Login = React.lazy(() => import("./pages/login"));
  const SignUp = React.lazy(() => import("./pages/signup"));
  const Home = React.lazy(() => import("./pages/home"));
  const Google = React.lazy(() => import("./pages/google"));
  const NotFound = React.lazy(() => import("./pages/notfound"));

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/google" element={<Google />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
