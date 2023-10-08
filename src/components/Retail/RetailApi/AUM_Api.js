import { useState, useEffect, useMemo } from 'react';
import { API_ALL_RM_AUM, API_ALL_UFC_AUM, API_AUM_DROPDOWN, API_AUM_RM, API_AUM_Region, API_AUM_UFC } from '../../../Constant/apiConstant';
import {API_AUM_period} from '../../../Constant/apiConstant';
import { API_SCHEME_DETAILS } from '../../../Constant/apiConstant';
import axiosInstance from '../../../Constant/apiConstant';
import { API_ALL_REGION_AUM } from '../../../Constant/apiConstant';


export const AumDropdownApi = () => {
  const [aum_dropdown, setAumDropdown] = useState([]);
  const [loading, setLoading] = useState(false);
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
  return {aum_dropdown, loading}
}

export const usePeriodApi = () => {
  const [aum_period, setAumperiod] = useState([]);
  const [loading, setLoading] = useState(false);
  const [report_period, setReportPeriod] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams({
        empid: "1234",
        emprole: "ADMIN",
        quarter: "202324Q2",
        period_code: "DD58180823",
        zone: "",
        region_code: "",
        ufc_code: "",
        rm_code: "",
        chn_code: "",
        common_report: ""
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

  return { aum_period, report_period, setReportPeriod, loading };
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

  return {aum_regions,loading};
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
        const data= responseAUM.data;
        
        setAumAllAumRegion(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching AUM details", error);
      }
    };

    fetchData();
  }, []);

  return {aum_AllAumRegion,loading};
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

  return {aum_AllAumUfc,loading};
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

  return {aum_AllAumRM,loading};
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
  return {aum_ufc,loading};
};

export const Scheme =()=>{

  const [scheme_details, setSchemeDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const response = await axiosInstance.get(API_SCHEME_DETAILS.DATA);
        // const data = await response.json();
        const data = response.data;
        setSchemeDetails(data);
        console.log(scheme_details,"aaaa")
      } catch (error) {
        console.error("Error fetching AUM details", error);
      }
    };
    fetchData();
  }, []);
  return {scheme_details};

}
 
 