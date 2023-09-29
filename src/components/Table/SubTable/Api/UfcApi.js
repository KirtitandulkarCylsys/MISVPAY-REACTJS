import{useEffect, useState} from 'react'
import { API_UFC } from '../../../../Constant/apiConstant';

const UfcApi = (queryParams) => {
  const[transaction_summary_report_ufc, setTransactionSummaryReportUfc] = useState([]);

  useEffect(() => {
    const fetchUfcData = async () => {
      try {
        const response = await fetch(API_UFC.DATA(queryParams));
        const data = await response.json();
        setTransactionSummaryReportUfc(data);
      } catch (error) {
        console.error("Error fetching transaction data", error);
      }
    };
    fetchUfcData();
  }, [queryParams]);

  return transaction_summary_report_ufc;

}

export default UfcApi
