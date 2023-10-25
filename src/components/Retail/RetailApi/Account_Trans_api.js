import { useState, useEffect, useMemo } from "react";
import { API_ACCOUNT_DROPDOWN } from "../../../Constant/apiConstant";

export const Ufc_Drop = () => {
const [ufc_details, setUfcDetails] = useState([]);
useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await fetch(API_ACCOUNT_DROPDOWN.DATA);
        const data = await response.json();
        setUfcDetails(data);
    } catch (error) {
        console.error("Error fetching ACCOUNT details", error);
    }
    };
    fetchData();
}, []);
return { ufc_details };
};
