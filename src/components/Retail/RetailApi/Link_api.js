// useRegionApi.js
import { useEffect, useState } from 'react';
import { API_ALL_REGION_RETAIL, API_ALL_RM_RETAIL, API_ALL_UFC_RETAIL } from '../../../Constant/apiConstant';

export const useRegionApi = (queryParams) => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
			setLoading(true);
      try {
        const response = await fetch(API_ALL_REGION_RETAIL.DATA(queryParams));
        const data = await response.json();
        setRegions(data);
				setLoading(false)
      } catch (error) {
        console.error("Error fetching region details", error);
      }
    };
    fetchData();
  }, []); 

  return { regions, loading };
};

export const useUFCApi = (queryParams) => {
  const [ufc, setUfc] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
			setLoading(true);
      try {
        const response = await fetch(API_ALL_UFC_RETAIL.DATA(queryParams));
        const data = await response.json();
        setUfc(data);
				setLoading(false)
      } catch (error) {
        console.error("Error fetching region details", error);
      }
    };
    fetchData();
  }, []); 

  return { ufc, loading };
};

export const useRMApi = (queryParams) => {
  const [rm, setRm] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
			setLoading(true);
      try {
        const response = await fetch(API_ALL_RM_RETAIL.DATA(queryParams));
        const data = await response.json();
        setRm(data);
				setLoading(false)
      } catch (error) {
        console.error("Error fetching region details", error);
      }
    };
    fetchData();
  }, []); 

  return { rm, loading };
};

