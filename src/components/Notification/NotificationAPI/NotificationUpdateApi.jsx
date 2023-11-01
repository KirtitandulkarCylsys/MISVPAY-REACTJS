// import { useState } from "react";
// import { toast } from "react-toastify";
// import { NOTIFICATION_UPDATE } from "../../../Constant/apiConstant";
// import { useDataContext } from "../../../Context/DataContext";

// export const NotificationUpdateApi = ({ headers }) => {
//   const {
//     notif_id,
//     setNotif_id,
//     notification_desc,
//     setNotificationDesc,
//     valid_from,
//     setValidFrom,
//     valid_upto,
//     setValidUpto,
//     last_updated_by,
//     setLastUpdatedBy
//   } = useDataContext();
  
//   const [loading, setLoading] = useState(false);
//   const [hide, setHide] = useState(false);

//   const formatNumberToIndianFormat = (number) => {
//     if (typeof number !== "number") {
//       return number;
//     }

//     return number.toLocaleString("en-IN");
//   };

//   // Function to send a PUT request to update a notification
//   const updateNotification = async () => {
//     try {
//       setLoading(true);

//       // Create the URL with the notification ID to update
//       const updateUrl = `${NOTIFICATION_UPDATE.DATA}`;

//       const formattedValidFrom = valid_from.split("-").reverse().join("/");
//       const formattedValidUpto = valid_upto.split("-").reverse().join("/");

//       const queryParams = new URLSearchParams({
//         notif_id,
//         notification_desc,
//         valid_from: formattedValidFrom,
//         valid_upto: formattedValidUpto,
//         last_updated_by,
//       });

//       const response = await fetch(updateUrl, {
//         method: "PUT", // Use PUT method for updating
//         headers,
//         body: JSON.stringify(),
//       });

//       if (response.ok) {
//         toast.success("Notification updated successfully");
//       } else {
//         toast.error("Failed to update notification");
//       }
//     } catch (error) {
//       console.error("Error updating notification", error);
//       toast.error("Error updating notification");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const postData = async (data) => {
//     try {
//       setLoading(true);
//       const formattedValidFrom = valid_from.split("-").reverse().join("/");
//       const formattedValidUpto = valid_upto.split("-").reverse().join("/");

//       const queryParams = new URLSearchParams({
//         notif_id,
//         notification_desc,
//         valid_from: formattedValidFrom,
//         valid_upto: formattedValidUpto,
//         last_updated_by,
//       });

//       const response = await fetch(`${NOTIFICATION_UPDATE.DATA(queryParams)}`, {
//         method: "POST",
//         headers,
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         toast.success("Data posted successfully");
//       } else {
//         toast.error("Failed to post data");
//       }
//     } catch (error) {
//       console.error("Error posting data", error);
//       toast.error("Error posting data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchNotificationMaster = async () => {
//     try {
//       const dataToPost = {
//         notif_id:'8',
//         notification_desc,
//         valid_from: valid_from.split("-").reverse().join("/"),
//         valid_upto: valid_upto.split("-").reverse().join("/"),
//         last_updated_by,
    
//       };

//       await postData(dataToPost);
//     } catch (error) {
//       console.error("Error fetching notification master data", error);
//       throw  Error("Error fetching notification master data");
//     }
//   };

//   const togglehide = async () => {
//     if ( notif_id || !notification_desc || !valid_from || !valid_upto || !last_updated_by ) {
//       setHide(false);
//       toast.error("Please fill all the fields");
//     } else {
//       setHide(true);
//     }
//   };

//   return {
//     notif_id,
//     notification_desc,
//     valid_from,
//     valid_upto,
//     last_updated_by,
//     loading,
//     hide,
//     setNotificationDesc,
//     setValidFrom,
//     setValidUpto,
//     setLastUpdatedBy,
//     setNotif_id,
//     fetchNotificationMaster,
//     togglehide,
//     formatNumberToIndianFormat,
//     // Add the updateNotification function to the returned object
//     updateNotification,
//   };
// };
