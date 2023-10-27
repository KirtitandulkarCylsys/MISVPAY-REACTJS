import { useState, useEffect } from 'react';
import axiosInstance, { API_MANAGE_USER_REPORTING_ROLE_DROPDOWN } from "../../Constant/apiConstant";
import { API_MANAGE_USER_POWER_USER_DROPDOWN } from "../../Constant/apiConstant";
import { API_MANAGE_USER_FUNCTIONAL_ROLE_DROPDOWN } from "../../Constant/apiConstant";
import { API_MANAGE_USER_CITY_DROPDOWN } from "../../Constant/apiConstant";
import { API_MANAGE_USER_QUARTER_DROPDOWN } from "../../Constant/apiConstant";

export const Usermodulereportingroledropdown = () => {
  const [crm_role, setCrm_role] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(API_MANAGE_USER_REPORTING_ROLE_DROPDOWN.DATA);
        const data =  response.data;
        setCrm_role(data);
      } catch (error) {
        console.error("Error fetching AUM details", error);
      }
    };
    fetchData();
  }, []);
  return { crm_role }
}

export const Usermodulepoweruserdropdown = () => {
  const [power_user, setPower_user] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(API_MANAGE_USER_POWER_USER_DROPDOWN.DATA);
        const data = response.data;
        setPower_user(data);
      } catch (error) {
        console.error("Error fetching AUM details", error);
      }
    };
    fetchData();
  }, []);
  return { power_user }
}

export const Usermodulfunctionalroledropdown = () => {
  const [functional_role, setFunctional_role] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(API_MANAGE_USER_FUNCTIONAL_ROLE_DROPDOWN.DATA);
        const data = response.data;
        setFunctional_role(data);
      } catch (error) {
        console.error("Error fetching AUM details", error);
      }
    };
    fetchData();
  }, []);
  return { functional_role }
}

export const Usermodulecitydropdown = () => {
  const [employee_city, setEmployee_city] = useState([]);
  const queryParams = new URLSearchParams({
    city_type: "T5",
    valid_upto: "30-DEC-9999"
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(API_MANAGE_USER_CITY_DROPDOWN.DATA(queryParams));
        const data = response.data;
        setEmployee_city(data);
      } catch (error) {
        console.error("Error fetching AUM details", error);
      }
    };
    fetchData();
  }, []);
  return { employee_city };
};

export const UsermodulQuarterdropdown = () => {
  const [quarter, setQuarter] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(API_MANAGE_USER_QUARTER_DROPDOWN.DATA);
        const data = response.data;
        setQuarter(data);
      } catch (error) {
        console.error("Error fetching AUM details", error);
      }
    };
    fetchData();
  }, []);
  return { quarter }
}
