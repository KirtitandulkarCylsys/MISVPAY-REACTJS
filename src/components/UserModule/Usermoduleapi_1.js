// import { useState, useEffect,  } from 'react';
// import {API_MANAGE_USER_QUARTER_DROPDOWN} from "../../Constant/apiConstant";

//   export const UsermodulQuarterdropdown = () => {
//     const [quarter, setQuarter] = useState([]);
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(API_MANAGE_USER_QUARTER_DROPDOWN.DATA);
//                 const data = await response.json();
//                 setQuarter(data);
//             } catch (error) {
//                 console.error("Error fetching AUM details", error);
//             }
//         };
//         fetchData();
//     }, []);
//     return { quarter }
//   }

