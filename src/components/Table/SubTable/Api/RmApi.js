import{useEffect, useState} from 'react'
import { API_RM } from '../../../../Constant/apiConstant';

const RmApi = (queryParams) => {
  const[transaction_summary_report_rm, setTransactionSummaryReportRm] = useState([]);

  useEffect(() => {
    const fetchRmData = async () => {
      try {
        const response = await fetch(API_RM.DATA(queryParams));
        const data = await response.json();
        setTransactionSummaryReportRm(data);
      } catch (error) {
        console.error("Error fetching transaction data", error);
      }
    };
    fetchRmData();
  }, [queryParams]);

  return transaction_summary_report_rm;

}

export default RmApi
