import { useState } from "react";
import { API_SUMMARY_TRANSACTION } from "../../../Constant/apiConstant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../../../Constant/apiConstant";

const Api = ({ headers }) => {
  const [hide, setHide] = useState(false);
  const [employee_id, setEmployeeId] = useState("");
  const [emprole, setEmpRole] = useState("");
  const [quarter, setQuarter] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [select_type, setSelectType] = useState("");
  const [scheme_code, setSchemeCode] = useState("");
  const [channel, setChannel] = useState("");
  const [zone, setZone] = useState("");
  const [region, setRegion] = useState("");
  const [ufc, setUfc] = useState("");
  const [rm, setRm] = useState("");
  const [common_report, setCommonReport] = useState("");
  const [transaction_summary_report, setTransactionSummaryReport] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchTransactionSummary = async () => {
    try {
      const formattedStartDate = startDate.split("-").reverse().join("/");
      const formattedEndDate = endDate.split("-").reverse().join("/");
      const queryParams = new URLSearchParams({
        employee_id: "1234",
        emprole: "ADMIN",
        quarter: "202324Q2",
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        select_type: select_type,
        scheme_code: "nill",
        channel: "RTL",
        zone: "",
        region: "BIHR",
        ufc: "",
        rm: "",
        common_report: "REGIONWISE",
      });
      if (startDate > endDate) {
        toast.error("End Date must be Greater Than Start Date");
        setLoading(false);
      } else {
        setLoading(true);

        const response = await axiosInstance.get(
          API_SUMMARY_TRANSACTION.DATA(queryParams)
        );
        // const data = await response.json();
        const data = response.data;
        setTransactionSummaryReport(data);
        setLoading(false);
        setHide(true);
        console.log(transaction_summary_report);
      }
    } catch (error) {
      console.error("error fetching transaction summary data", error);
      throw new Error("Error fetching transaction summary data");
    }
  };

  const togglehide = async () => {
    try {
      await fetchTransactionSummary();
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

  return{
   employee_id,emprole,quarter,ufc,rm,channel, zone, region, common_report,hide,startDate, endDate, setStartDate, setEndDate,select_type, setSelectType, transaction_summary_report,loading,togglehide,setHide,setLoading,formatNumberToIndianFormat
  }
  
}

export default Api;
