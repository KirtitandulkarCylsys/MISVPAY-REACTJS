import { useState, useEffect } from "react";
import { NOTIFICATION_GET } from "../../../Constant/apiConstant";

export const Notif_Details = () => {
    const [notif_details, setNotifDetails] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(NOTIFICATION_GET.DATA);
            const data = await response.json();
            setNotifDetails(data);
        } catch (error) {
            console.error("Error fetching Notification details", error);
        }
        };
        fetchData();
    }, []);
    return { notif_details };
    };