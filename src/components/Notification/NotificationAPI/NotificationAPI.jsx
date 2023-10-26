import { useState } from "react";
import { toast } from "react-toastify"; // Import toast for showing error messages
import { NOTIFICATION_MASTER } from "../../../Constant/apiConstant";
import { useDataContext } from "../../../Context/DataContext";

export const NotificationApi = ({ headers }) => {
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const { notification_desc,
    setNotificationDesc, valid_from, setValidFrom, valid_upto, setValidUpto, last_updated_by, setLastUpdatedBy, status, setStatus } = useDataContext();
  const fetchNotificationMaster = async () => {
    try {
      const formattedValidFrom = valid_from.split("-").reverse().join("/");
      const formattedValidUpto = valid_upto.split("-").reverse().join("/");
      const queryParams = new URLSearchParams({
        notification_desc: notification_desc,
        valid_from: formattedValidFrom,
        valid_upto: formattedValidUpto,
        last_updated_by: last_updated_by,
        status: status,
      });
      const postData = async (postDataObject) => {
        try {
          setLoading(true);
          const response = await fetch(NOTIFICATION_MASTER.DATA(queryParams), {
            method: "POST",
            headers: headers,
            body: JSON.stringify(postDataObject),
          });

          if (response.ok) {
            toast.success("Data posted successfully");
          } else {
            toast.error("Failed to post data");
          }

          setLoading(false);
        } catch (error) {
          console.error("Error posting data", error);
          toast.error("Error posting data");
          setLoading(false);
        }
      };
      const dataToPost = {
        notification_desc: notification_desc,
        valid_from: formattedValidFrom,
        valid_upto: formattedValidUpto,
        last_updated_by: last_updated_by,
        status: status,
      };

      await postData(dataToPost);
    } catch (error) {
      console.error("Error fetching notification master data", error);
      throw new Error("Error fetching notification master data");
    }
  };

  const togglehide = async () => {
    try {
      setHide(true);
    } catch (error) {
      setHide(false);
      toast.error("Please fill all the fields");
    }
  };

  const formatNumberToIndianFormat = (number) => {
    if (typeof number !== "number") {
      return number;
    }

    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  return {
    notification_desc,
    valid_from,
    valid_upto,
    last_updated_by,
    status,
    loading,
    hide,
    setNotificationDesc,
    setValidFrom,
    setValidUpto,
    setLastUpdatedBy,
    setStatus,
    fetchNotificationMaster,
    togglehide,
    formatNumberToIndianFormat,
  };
};
