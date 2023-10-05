import { useState, useEffect, useMemo } from 'react';
import { API_AUM_DROPDOWN, API_AUM_Region, API_AUM_UFC } from '../../../Constant/apiConstant';
import {API_AUM_period} from '../../../Constant/apiConstant';
import { API_SCHEME_DETAILS } from '../../../Constant/apiConstant';

export const AumDropdownApi = () => {
  const [aum_dropdown, setAumDropdown] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(API_AUM_DROPDOWN.DATA);
        const data = await response.json();
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

export const  usePeriodApi = (queryParams) => {
  const [aum_period, setAumperiod] = useState([]);
  const [loading, setLoading] = useState(false);
const [report_period, setReportPeriod] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const queryParams = new URLSearchParams({
        empid: "1234",
        emprole: "RH",
        quarter: "202324Q2",
        period_code: "DD58180823",
        zone: "",
        region_code: "",
        ufc_code: "117",
        rm_code: "nill",
        chn_code: "",
        common_report: 'UFCWISE'
      });
      try {
        const response = await fetch(API_AUM_period.DATA(queryParams));
        const data = await response.json();
        setAumperiod(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching AUM details", error);
      }
    };

    fetchData();
  }, []);

  return {aum_period, report_period, setReportPeriod, loading};
};

export const useAUMApi = (queryParams) => {
  const [aum_regions, setAumRegions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(API_AUM_period.DATA(queryParams));
        const data = await response.json();
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

export const UfcApi = (queryParams) => {
  const [aum_ufc, setAumUfc] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(API_AUM_period.DATA(queryParams));
        const data = await response.json();
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
        const response = await fetch(API_AUM_UFC.DATA(queryParams));
        const data = await response.json();
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
        const response = await fetch(API_SCHEME_DETAILS.DATA);
        const data = await response.json();
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
 
 