import { API_SCHEME_DETAILS } from '../../../Constant/apiConstant';
import { API_Asset_Class } from '../../../Constant/apiConstant';
import axiosInstance from '../../../Constant/apiConstant';

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
  
  export const Scheme =(queryParams)=>{
  
    const [scheme_details, setSchemeDetails] = useState([]);
    const {asset} = AssetClass();
    const aseetClass = asset ? asset[0].SM_NATURE : null;
    
    useEffect(() => {
      const fetchData = async () => {
       
        try {
          const queryParams = new URLSearchParams({
            asset_class: aseetClass
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
    }, []);
    return {scheme_details};
  
  }