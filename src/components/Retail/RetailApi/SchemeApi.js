import { useEffect, useState } from 'react';
import { API_SCHEME_DETAILS } from '../../../Constant/apiConstant';
import { API_Asset_Class } from '../../../Constant/apiConstant';
import axiosInstance from '../../../Constant/apiConstant';
import { useDataContext } from '../../../Context/DataContext';

export const AssetClass =()=>{

    const [asset, setAssetClass] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
       
        try {
          const response = await axiosInstance.get(API_Asset_Class.DATA);
          const data = response.data;
          setAssetClass(data);
          console.log(data,"asset")
        } catch (error) {
          console.error("Error fetching AUM details", error);
        }
      };
      fetchData();
    }, []);
    return {asset};
  
  }
  
  export const Scheme =()=>{
  
    const [scheme_details, setSchemeDetails] = useState([]);
    const {select_asset}= useDataContext();

    useEffect(() => {
      const fetchData = async () => {
       
        try {
          const queryParams = new URLSearchParams({
            asset_class: select_asset
          })
          const response = await axiosInstance.get(API_SCHEME_DETAILS.DATA(queryParams));
          // const data = await response.json();
          const data = response.data;
          setSchemeDetails(data);
          console.log(data, "Scheme")
        } catch (error) {
          console.error("Error fetching AUM details", error);
        }
      };
      fetchData();
    }, [select_asset]);
    return {scheme_details};
  
  }