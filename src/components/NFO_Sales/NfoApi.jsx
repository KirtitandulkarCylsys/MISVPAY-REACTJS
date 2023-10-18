import { useState, useEffect } from "react";
import { API_NFO, API_NFO_UPLOAD } from "../../Constant/apiConstant";
import axiosInstance from "../../Constant/apiConstant";
import { useDataContext } from "../../Context/DataContext";

export const NfoApi = () => {
  const [nfo_details, setNfoDetails] = useState([]);
  const [loading, setLoading] = useState("");
  const { emproles, emp_id, zoneData, REGIONData, UFCData } = useDataContext();  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          emp_id: emp_id,
          emprole: emproles,
          zone: zoneData,
          region: REGIONData,
          ufc: UFCData,
          rm: emp_id,
        });
        const response = await axiosInstance.get(API_NFO.DATA(queryParams));
        const data = response.data;
        setNfoDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Nfo details", error);
      }
    };

    fetchData();
  }, []);


  // const handleUpload = async (excelData) => {
  //   for (let i = 1; i < excelData.length; i++) {
  //     try {
  //       const response = await axiosInstance.post(
  //         API_NFO_UPLOAD.DATA(queryParams),
  //         excelData[i]
  //       );
  //       if (response.status === 200) {
  //         console.log("File uploaded and data inserted.");
  //       } else {
  //         console.error("Error uploading file.");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   }
   

   return { nfo_details, loading};
};
