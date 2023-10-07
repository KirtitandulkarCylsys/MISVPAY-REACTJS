
import { useState } from "react";
import RollWiseContext from "./RollWiseContext";

const RollWiseData = (props) => {
 const [roleWiseData, setRoleWiseData]= useState([]);

  return (
    <RollWiseContext.Provider value={roleWiseData} >
        {props.children}
    </RollWiseContext.Provider>
    );
};
export default RollWiseData;
