import { useState } from "react";
import { API_ACCOUNT_SUMMARY } from "../../../Constant/apiConstant";
import { ToastContainer, toast } from "react-toastify";
import { useDataContext } from "../../../Context/DataContext";

export const Account_Api = ({ headers }) => {
  const [hide, setHide] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [amount, setAmount] = useState();
  const [transaction_type, setTransactionType] = useState([]);
  const [transaction_account_report, setTransactionAccountReport] = useState([]);
  const [condition, setCondition] = useState();
  const [ufc, setUfc] = useState();
  const [no_mapping, setNoMapping] = useState();
  const [loading, setLoading] = useState(false);
  const { roleWiseData } = useDataContext();
  const emp_id = roleWiseData ? roleWiseData[0].EMP_ID : null; 
  const emproles = roleWiseData ? roleWiseData[0].EMP_ROLE : null; 
  const channel_code = roleWiseData ? roleWiseData[0].CHANNEL_CODE : null; 
  const zone = roleWiseData ? roleWiseData[0].ZONE : null;
  const region_code = roleWiseData ? roleWiseData[0].REGIONCODE : null;
  const ufc_code = roleWiseData ? roleWiseData[0].UFC_CODE : null;
  const QUARTERData = roleWiseData ? roleWiseData[0].YEAR : null;
  let commonReportValue = "";
  switch (emproles) {
    case "ZH":
      commonReportValue = "ZONEWISE";
      break;
    case "RH":
      commonReportValue = "REGIONWISE";
      break;
    case "CM":
      commonReportValue = "UFCWISE";
      break;
    case "RM":
      commonReportValue = "RMWISE";
      break;
    default:
      commonReportValue = ""; 
  }
  const fetchTransactionAccount = async () => {
    try {
      const formattedStartDate = startDate.split("-").reverse().join("/");
      const formattedEndDate = endDate.split("-").reverse().join("/");
      const queryParams = new URLSearchParams({
        employee_id: emp_id,
        employee_role: emproles,
        quarter: '202324Q2',
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        amount: amount,
        transaction_type: "SALES",
        condition: condition,
        ufc: "115",
        zone: zone,
        region_code: region_code,
        ufc_code: ufc_code,
       
       
        channel_code: "RTL",
        common_report: " "
      });

      if (startDate > endDate) {
        toast.error("End Date must be Greater Than Start Date");
        setLoading(false);
      } else {
        setLoading(true);
        const response = await fetch(API_ACCOUNT_SUMMARY.DATA(queryParams), {
          method: "GET",
          headers: headers,
        });

        const data = await response.json();
       
        console.log(data,"data")
        setTransactionAccountReport(data);
        setLoading(false);
        setHide(true);
      }
    } catch (error) {
      console.error("error fetching transaction summary data", error);
      throw new Error("Error fetching transaction summary data");
    }
  };

  const togglehide = async () => {
    try {
      await fetchTransactionAccount();
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
    transaction_account_report,
    loading,
    transaction_type,
    amount,
    condition,
    ufc,
    no_mapping,
    setTransactionType,
    setEndDate,
    setHide,
    setStartDate,
    setLoading,
    formatNumberToIndianFormat,
    togglehide,
    setAmount,
    setCondition,
    setUfc,
    setNoMapping,
    emproles,
  };
};
