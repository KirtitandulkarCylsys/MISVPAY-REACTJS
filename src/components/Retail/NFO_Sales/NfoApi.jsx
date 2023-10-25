import { useState, useEffect } from "react";
import {
  API_NFO,
  API_NFO_DELETE,
  API_NFO_UPLOAD,
} from "../../../Constant/apiConstant";
import axiosInstance from "../../../Constant/apiConstant";
import { useDataContext } from "../../../Context/DataContext";

export const NfoApi = () => {
  const [nfo_details, setNfoDetails] = useState([]);
  const [nfo_delete, setNfoDelete] = useState("");
  const { emproles, emp_id, zoneData, REGIONData, UFCData,loading, setLoading} = useDataContext();
  const [uploadProgress, setUploadProgress] = useState(0);

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

  const handleUpload = async (excelData) => {
    const keys = [
      "trn_type",
      "inhouse_number",
      "type",
      "plan",
      "plan_description",
      "from_scheme",
      "from_plan",
      "from_plan_desc",
      "amc_code",
      "sch_desc",
      "folio_number",
      "investor_name",
      "amount",
      "amt_incr",
      "arn_no",
      "arn_name",
      "ufc_code",
      "ufc_name",
      "region",
      "zone",
      "channel_name",
      "mod_channel",
      "scheme_code",
      "branch_code",
      "pin",
      "t30b30flag",
      "platform",
      "trxn_date",
      "scheme_description",
      "map_rmcode",
      "ria_code",
      "arn_ria",
      "platform2",
      "mobile_number",
      "email_id",
      "type2",
    ];
    const totalRows = excelData.length - 1;
    let uploadedRows = 0;

    if (excelData) {
      excelData.shift();
      try {
        setLoading(true);
        const result = excelData.map((data) => {
          const obj = {};
          keys.forEach((key, index) => {
            if (typeof data[index] === "number") {
              obj[key] = data[index].toString();
            } else {
              obj[key] = data[index];
            }
          });
          return obj;
        });

        const response = await axiosInstance.post(API_NFO_UPLOAD.DATA, {
          data_hash: result,
        });
        const data = response.data;
        console.log(result, "result");
        uploadedRows++;
        const progress = (uploadedRows / totalRows) * 100;
        setUploadProgress(progress);
        setUploadProgress(100);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }
  };

  return { nfo_details, loading, handleUpload, uploadProgress };
};
