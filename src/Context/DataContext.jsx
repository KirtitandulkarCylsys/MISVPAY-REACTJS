// DataContext.js
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance, {
  API_ARN,
  API_SUMMARY_TRANSACTION,
} from "../Constant/apiConstant";

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataContextProvider = ({ children }) => {
  const [roleWiseData, setRoleWiseData] = useState(null);
  const [zonetablecurrentPage, setZonetablecurrentPage] = useState("1");
  const [zontablepageSize, setZonetablepageSize] = useState("");
  const [start_Date, setStart_Date] = useState();
  const [end_Date, setEnd_Date] = useState();
  const [summary_report, setSummaryReport] = useState([]);
  const [rolwiseselectype, setRolwiseselectype] = useState("");
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const [select_asset, setSelectAsset] = useState("ALL");
  const [arn, setArn] = useState([]);
  const [scheme, setScheme]= useState('ALL');
  const [report_period, setReportPeriod] = useState('');

  const emproles = roleWiseData ? roleWiseData[0].EMP_ROLE : null;
  const channel = roleWiseData ? roleWiseData[0].CHANNEL_CODE : null;
  const zoneData = roleWiseData ? roleWiseData[0].ZONE : null;
  const REGIONData = roleWiseData ? roleWiseData[0].REGIONCODE : null;
  const UFCData = roleWiseData ? roleWiseData[0].UFC_CODE : null;
  const QUARTERData = roleWiseData ? roleWiseData[0].YEAR : null;
  const emp_id = roleWiseData ? roleWiseData[0].EMP_ID : null;
  const quarterLastDate = roleWiseData ? roleWiseData[0].END_DATE : null;


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
  const fetchTransactionSummary = async (pagesize, currentPage) => {
    try {
      const formattedStartDate = start_Date?.split("-").reverse().join("/");
      const formattedEndDate = end_Date?.split("-").reverse().join("/");
      const quarter = QUARTERData.replace("-", "").replace("-", "");
      const queryParams = new URLSearchParams({
        employee_id: emp_id,
        emprole: emproles,
        quarter: quarter,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        select_type: rolwiseselectype,
        scheme_code: "nill",
        channel: channel,
        zone: zoneData,
        region: REGIONData,
        ufc: UFCData,
        rm: emp_id,
        common_report: commonReportValue,
        page_number: currentPage,
        page_size: pagesize,
      });
      console.log(quarter, "quarter");
      if (start_Date > end_Date) {
        toast.error("End Date must be Greater Than Start Date");
        setLoading(false);
      } else {
        setLoading(true);

        const response = await axiosInstance.get(
          API_SUMMARY_TRANSACTION.DATA(queryParams)
        );
        const data = response.data;
        setSummaryReport(data);
        setLoading(false);
        setHide(true);
        console.log(summary_report);
      }
    } catch (error) {
      console.error("error fetching transaction summary data", error);
      throw new Error("Error fetching transaction summary data");
    }
  };

  const fetchArnSummary = async () => {
    setLoading(false);
    try {
      const formattedStartDate = start_Date?.split("-").reverse().join("/");
      const formattedEndDate = end_Date?.split("-").reverse().join("/");
      const quarter = QUARTERData.replace("-", "").replace("-", "");
      const queryParams = new URLSearchParams({
        employee_id: emp_id,
        emprole: emproles,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        quarter: quarter,
        quarter_last_date:quarterLastDate,
        multicity: "",
        zone: zoneData,
        region: REGIONData,
        ufc: UFCData,
        rm: emp_id,
        select_type: rolwiseselectype,
        channel: "RTL",
        scheme: scheme,
      });
      setLoading(true);
      const response = await axiosInstance.get(API_ARN.DATA(queryParams));
      const data = response.data;
      setArn(data);
      setLoading(false);
      setHide(true);
    } catch (error) {
      toast.error("error fetching transaction summary data", error);
      throw new Error("Error fetching transaction summary data");
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

  return (
    <DataContext.Provider
      value={{
        roleWiseData,
        setRoleWiseData,
        zontablepageSize,
        setZonetablepageSize,
        zonetablecurrentPage,
        setZonetablecurrentPage,
        setStart_Date,
        setEnd_Date,
        summary_report,
        fetchTransactionSummary,
        setRolwiseselectype,
        hide,
        setHide,
        start_Date,
        end_Date,
        emproles,
        emp_id,
        rolwiseselectype,
        channel,
        zoneData,
        REGIONData,
        UFCData,
        loading,
        formatNumberToIndianFormat,
        QUARTERData,
        select_asset,
        setSelectAsset,
        arn,
        fetchArnSummary,
        scheme, setScheme,setLoading,report_period, setReportPeriod
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
