import { useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance, { API_ALL_ETF_SALE } from "../../../Constant/apiConstant";
import { useDataContext } from "../../../Context/DataContext";
const ETF_Api = () => {
  const [hide, setHide] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [etf_Sale, setEtfSale] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const { roleWiseData } = useDataContext(); 
  const emproles = roleWiseData ? roleWiseData[0].EMP_ROLE : null; 
  const channel = roleWiseData ? roleWiseData[0].CHANNEL_CODE : null; 
  const zoneData = roleWiseData ? roleWiseData[0].ZONE : null;
  const REGIONData = roleWiseData ? roleWiseData[0].REGIONCODE : null;
  const UFCData = roleWiseData ? roleWiseData[0].UFC_CODE : null;
  const QUARTERData = roleWiseData ? roleWiseData[0].YEAR : null;
  const emp_id = roleWiseData ? roleWiseData[0].EMP_ID : null;

  const fetchEtfSale = async () => {
    try {
      const formattedStartDate = startDate.split("-").reverse().join("/");
      const formattedEndDate = endDate.split("-").reverse().join("/");
      const queryParams = new URLSearchParams({
        employee_id: emp_id,
        emprole: emproles,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        zone: zoneData,
        region_code: REGIONData,
        ufc_code: UFCData,
        // channel: channel,
        rm_code:emp_id
        
        
      });

      if (startDate > endDate) {
        toast.error("End Date must be Greater Than Start Date");
        setLoading(false);
      } else {
        setLoading(true);

        const response = await axiosInstance.get(
          API_ALL_ETF_SALE.DATA(queryParams)
        );
        const data = response.data;
        setEtfSale(data);
        setLoading(false);
        setHide(true);
        console.log(etf_Sale);
      }
    } catch (error) {
      console.error("error fetching ETFSale data", error);
      throw new Error("Error fetching ETFSale data");
    }
  };

  const togglehide = async () => {
    try {
      await fetchEtfSale();
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
    hide,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    etf_Sale,
    loading,
    togglehide,
    setHide,
    setLoading,
    formatNumberToIndianFormat,
    emproles
  };
};

export default ETF_Api;
