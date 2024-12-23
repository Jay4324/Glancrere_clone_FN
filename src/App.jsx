import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
const Register = lazy(() => import("./pages/Register.jsx"));
const Loader = lazy(() => import("./pages/Loader.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Mainlayout = lazy(() => import("./section/Mainlayout.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "./apis/generalApis.js";

function App() {
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state);
  const PrivateRoute = ({ children }) => {
    if (stateData.isLoading) {
      return <Loader />;
    } else {
      return !stateData.isLogin ? children : <Navigate to="/dashboard" />;
    }
  };
  const IsAuthenticated = ({ children }) => {
    if (stateData.isLoading) {
      return <Loader />;
    } else {
      return stateData.isLogin ? children : <Navigate to="/login" />;
    }
  };
  useEffect(() => {
    const getUserData = async () => {
      try {
        dispatch({ type: "Loading" });

        let userData = await userProfile();
        console.log(userData);
        if (userData) {
          userData = userData.data.userData;
          console.log("line number 40 ", userData);

          dispatch({ type: "userProfile", payload: { userData } });
        }
      } catch (err) {
        if (err.status == 401 || err.status == 404) {
          dispatch({ type: "Logout" });
        }

        console.log("error in getting User data ", err);
      }
    };
    getUserData();
  }, []);
  console.log("updated state", stateData);

  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen  justify-center items-center ">
          <Loader />
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route
            path="/login"
            element={
              <PrivateRoute>
                <Login />
              </PrivateRoute>
            }
          />
          <Route path="/dashboard" element={<Mainlayout />}>
            <Route path="/dashboard/" element={
              <IsAuthenticated>
              <Dashboard />
              </IsAuthenticated>
              } />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
