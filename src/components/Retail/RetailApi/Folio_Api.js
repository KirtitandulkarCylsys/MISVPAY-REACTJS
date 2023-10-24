import axiosInstance, { API_FOLIO_REPORT } from '../../../Constant/apiConstant';
import { useDataContext } from '../../../Context/DataContext';
import { useState, useEffect} from 'react'

export const useFolioApi = () => {
    const [folio_Report, setFolio_Report] = useState([]);
    const [loading, setLoading] = useState(false);
   
    const [selectType, setSelectType] = useState();
    const {roleWiseData}= useDataContext();
  
    const emproles = roleWiseData ? roleWiseData[0].EMP_ROLE : null; 
    const channel = roleWiseData ? roleWiseData[0].CHANNEL_CODE : null; 
    const zoneData = roleWiseData ? roleWiseData[0].ZONE : null;
    const REGIONData = roleWiseData ? roleWiseData[0].REGIONCODE : null;
    const UFCData = roleWiseData ? roleWiseData[0].UFC_CODE : null;
    const QUARTERData = roleWiseData ? roleWiseData[0].YEAR : null;
    const emp_id = roleWiseData ? roleWiseData[0].EMP_ID : null;
    
    useEffect(() => {
     
  
      const fetchData = async () => {
        setLoading(true);
        const queryParams = new URLSearchParams({
          empid: "3671",
          emprole: "ADMIN",
          quarter: "202324Q2",
          
          zone: zoneData ,
          region_code: REGIONData,
          ufc_code: UFCData ,
          rm_code: emp_id,
          period_code:  "DA58300923",
          report_type: "AUM",
          channel_code: "RTL",
          
        
        });
  
        try {
          const response = await axiosInstance.get(API_FOLIO_REPORT.DATA(queryParams));
          if (response.status === 200) {
            const data = await response.data;
            setFolio_Report(data);
          } else {
            console.error("Request failed with status code", response.status);
            // You can handle different HTTP status codes as needed
          }
        } catch (error) {
          console.error("Error fetching AUM details", error);
          // Handle the error here, e.g., set an error state
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { folio_Report,  setFolio_Report, loading, emproles ,selectType,setSelectType };
  };