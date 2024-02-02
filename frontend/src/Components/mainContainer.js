import React, { createContext, useEffect, useState } from "react";
import "./style.css";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const myContext = createContext();
const MainContainer = () => {
  //  const dispatch = useDispatch();
  // const newRefresh = useSelector((state) => state);
  const [refresh, setRefresh] = useState(true);
  // console.log(newRefresh, "newRefresh");
  // setRefresh(newRefresh);
  console.log("hi")
  
  useEffect(() => {
    // window.location.reload();
  },[refresh])
  return (
    <div className="main-container">
      <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
        <Sidebar />
        <Outlet />
      </myContext.Provider>
      {/* <UsersGroups/> */}
    </div>
  );
};

export default MainContainer;
