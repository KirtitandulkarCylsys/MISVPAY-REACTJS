import { useState, useEffect, useMemo } from 'react';
import { API_ALL_RM_AUM, API_ALL_UFC_AUM, API_AUM_DROPDOWN, API_AUM_RM, API_AUM_Region, API_AUM_UFC } from '../../../Constant/apiConstant';
import { API_AUM_period } from '../../../Constant/apiConstant';
import { API_SCHEME_DETAILS } from '../../../Constant/apiConstant';
import axiosInstance from '../../../Constant/apiConstant';
import { API_ALL_REGION_AUM } from '../../../Constant/apiConstant';
import { useDataContext } from '../../../Context/DataContext';


export const AumDropdownApi = () => {
  const [aum_dropdown, setAumDropdown] = useState([]);
  const { setLoading } = useDataContext();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axiosInstance.get(API_AUM_DROPDOWN.DATA);
        // const data = await response.json();
        const data = response.data;
        setAumDropdown(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching AUM details", error);
      }
    };

    fetchData();
  }, []);
  return { aum_dropdown }
}


export const usePeriodApi = () => {
  const [aum_period, setAumperiod] = useState([]);
  const {
    emproles, channel, zoneData, REGIONData, UFCData, QUARTERData, emp_id, setLoading, report_period
  } = useDataContext();

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
  const quarter = QUARTERData.replace("-", "").replace("-", "");

  useEffect(() => {


    const fetchData = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams({
        empid: emp_id,
        emprole: emproles,
        quarter: quarter,
        period_code: report_period,
        zone: zoneData,
        region_code: REGIONData,
        ufc_code: UFCData,
        rm_code: emp_id,
        chn_code: channel,
        common_report: commonReportValue,
        page_number: "",
        page_size: ""
      });

      try {
        const response = await axiosInstance.get(API_AUM_period.DATA(queryParams));
        if (response.status === 200) {
          const data = await response.data;
          setAumperiod(data);
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

  return { aum_period };
};

export const useAUMApi = (queryParams) => {
  const [aum_regions, setAumRegions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axiosInstance.get(API_AUM_Region.DATA(queryParams));
        // const data = await response.json();
        const data = response.data;
        setAumRegions(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching AUM details", error);
      }
    };

    fetchData();
  }, []);

  return { aum_regions, loading, };
};


// Replace with your axios instance
// Replace with your API_AUM_period import

export const UfcApi = (queryParams) => {
  const [aumUfc, setAumUfc] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axiosInstance.get(API_AUM_UFC.DATA(queryParams));
        const data = response.data;
        setAumUfc(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching AUM details", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { aumUfc, loading };
};

export const RMApi = (queryParams) => {
  const [aumRM, setAumRM] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axiosInstance.get(API_AUM_RM.DATA(queryParams));
        const data = response.data;
        setAumRM(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching AUM details", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { aumRM, loading };
};

export const useAllRegion = (queryParams) => {
  const [aum_AllAumRegion, setAumAllAumRegion] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {

        const responseAUM = await axiosInstance.get(API_ALL_REGION_AUM.DATA(queryParams));
        const data = responseAUM.data;

        setAumAllAumRegion(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching AUM details", error);
      }
    };

    fetchData();
  }, []);

  return { aum_AllAumRegion, loading };
};

export const useAllUfc = (queryParams) => {
  const [aum_AllAumUfc, setAumAllAumUfc] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {



        const responseAUM = await axiosInstance.get(API_ALL_UFC_AUM.DATA(queryParams));
        const data = responseAUM.data;
        setAumAllAumUfc(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching AUM details", error);
      }
    };

    fetchData();
  }, []);

  return { aum_AllAumUfc, loading };
};

export const useAllRM = (queryParams) => {
  const [aum_AllAumRM, setAumAllAumRM] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {

        const response = await axiosInstance.get(API_ALL_RM_AUM.DATA(queryParams));
        const data = response.data;
        setAumAllAumRM(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching AUM details", error);
      }
    };

    fetchData();
  }, []);

  return { aum_AllAumRM, loading };
};



















// export const usePeriodApi = () => {
//   const [aum_period, setAumPeriod] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [report_period, setReportPeriod] = useState("");
//   const queryParams = new URLSearchParams({
//     report_period: report_period,
//   })

//     const fetchData = async () => {
//       setLoading(true)
//       try {
//         const response = await fetch(API_AUM_period.DATA(queryParams));
//         const data = await response.json();
//         setAumPeriod(data)
//         setLoading(false)
//       } catch (error) {
//         console.error("Error fetching AUM details", error);
//       }
//     };


//   return{ aum_period, loading, fetchData, report_period, setReportPeriod};
// };


export const useUfc = (queryParams) => {
  const [aum_ufc, setAumUfc] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axiosInstance.get(API_AUM_UFC.DATA(queryParams));
        // const data = await response.json();
        const data = response.data;
        setAumUfc(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching AUM details", error);
      }
    };
    fetchData();
  }, []);
  return { aum_ufc, loading };
};

export const Scheme = () => {

  const [scheme_details, setSchemeDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axiosInstance.get(API_SCHEME_DETAILS.DATA);
        // const data = await response.json();
        const data = response.data;
        setSchemeDetails(data);
        console.log(scheme_details, "aaaa")
      } catch (error) {
        console.error("Error fetching AUM details", error);
      }
    };
    fetchData();
  }, []);
  return { scheme_details };

}

