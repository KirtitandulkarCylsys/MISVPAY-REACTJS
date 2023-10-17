import React, { useState, useEffect } from "react";
import { ApiContext } from "./APIContext";

function Store({ children }) {
  const [roleWiseData, setRoleWiseData] = useState();
 const[empId,setEmpId]=useState();
 

  useEffect(()=>{
    console.log(roleWiseData,"got data")
  },[roleWiseData])
  return (
    <ApiContext.Provider value={{ roleWiseData ,setRoleWiseData,empId,setEmpId}}>
      {children}
    </ApiContext.Provider>
  );
}

export default Store;
