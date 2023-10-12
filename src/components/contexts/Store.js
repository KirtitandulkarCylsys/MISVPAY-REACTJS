import React, { useState, useEffect } from "react";
import { ApiContext } from "./APIContext";

function Store({ children }) {
  const [roleWiseData, setRoleWiseData] = useState();

  useEffect(()=>{
    console.log(roleWiseData,"got data")
  },[roleWiseData])
  return (
    <ApiContext.Provider value={{ roleWiseData ,setRoleWiseData}}>
      {children}
    </ApiContext.Provider>
  );
}

export default Store;
