import React from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader.jsx"
const Dashboard = () => {
  const stateData = useSelector((state) => state);
  if(stateData?.isLoading){
    return <Loader/>

  }

  return( <>This is Dashboard pages</>)
};

export default Dashboard;
