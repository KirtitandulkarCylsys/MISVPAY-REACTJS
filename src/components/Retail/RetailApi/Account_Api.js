import { useState } from "react";
import { API_ACCOUNT_SUMMARY } from "../../../Constant/apiConstant";
import { ToastContainer, toast } from "react-toastify";

export const Account_Api = ({ headers }) => {
  const [hide, setHide] = useState(false);
  const [employee_id, setEmployeeId] = useState();
  const [employee_role, setEmployeeRole] = useState();
  const [quarter, setQuarter] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [amount, setAmount] = useState();
  const [transaction_type, setTransactionType] = useState();
  const [transaction_account_report, setTransactionAccountReport] = useState([]);
  const [condition, setCondition] = useState();
  const [ufc, setUfc] = useState();
  const [zone, setZone] = useState();
  const [region_code, setRegionCode] = useState();
  const [ufc_code, setUfcCode] = useState();
  const [rmcode, setRmCode] = useState();
  const [no_mapping, setNoMapping] = useState();
  const [channel_code, setChannelCode] = useState();
  const [common_report, setCommonReport] = useState();
  const [loading, setLoading] = useState(false);
  const fetchTransactionAccount = async () => {
    try {
      const formattedStartDate = startDate.split("-").reverse().join("/");
      const formattedEndDate = endDate.split("-").reverse().join("/");
      const queryParams = new URLSearchParams({
        employee_id: employee_id,
        employee_role: employee_role,
        quarter: quarter,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        amount: amount,
        transaction_type: transaction_type,
        condition: condition,
        ufc: ufc,
        zone: zone,
        region_code: region_code,
        ufc_code: ufc_code,
        rmcode: rmcode,
        no_mapping: no_mapping,
        channel_code: channel_code,
        common_report: common_report,
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
    employee_id,
    employee_role,
    startDate,
    endDate,
    transaction_account_report,
    loading,
    transaction_type,
    amount,
    condition,
    ufc,
    zone,
    region_code,
    ufc_code,
    rmcode,
    no_mapping,
    channel_code,
    common_report,
    setTransactionType,
    setEmployeeId,
    setEmployeeRole,
    setEndDate,
    setHide,
    setStartDate,
    setLoading,
    formatNumberToIndianFormat,
    togglehide,
    setAmount,
    setCondition,
    setUfc,
    setZone,
    setRegionCode,
    setUfcCode,
    setRmCode,
    setNoMapping,
    setChannelCode,
    setCommonReport,
    setQuarter,
  };
};
