import React, { useState, useEffect } from "react";
import SideBar from "../Shared/SideBar/SideBar";
import Navbar from "../Shared/Navbar";
import "../UserModule/Employee_details.css";
import { Link, useParams } from "react-router-dom";
import { API_MANAGE_USER_CHANNEL_CODE_DROPDOWN } from "../../Constant/apiConstant";
import { API_MANAGE_EMPLOYEE_ROLE_DROPDOWN } from "../../Constant/apiConstant";
import { API_MANAGE_REGION_DROPDOWN } from "../../Constant/apiConstant";
import { API_MANAGE_UFC_LOCATION_DROPDOWN } from "../../Constant/apiConstant";
import { API_MANAGE_USER_ZONE_DROPDOWN } from "../../Constant/apiConstant";
import { Usermodulereportingroledropdown } from "./Usermoduleapi";
import { Usermodulepoweruserdropdown } from "./Usermoduleapi";
import { Usermodulfunctionalroledropdown } from "./Usermoduleapi";
import { Usermodulecitydropdown } from "./Usermoduleapi";
import { UsermodulQuarterdropdown } from "./Usermoduleapi";
import Loader from "../Table/Loader";

const Employee_details = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [employee_role, setEmployee_role] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [regionCode, setRegionCode] = useState("");
  const [isDropdownActive, setDropdownActive] = useState(false);
  const [isLoadingDropdown, setLoadingDropdown] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const queryParams = new URLSearchParams({
    city_type: 'T5',
    valid_upto: '30-12-99',
  });

  const { crm_role } = Usermodulereportingroledropdown();
  const { power_user } = Usermodulepoweruserdropdown();
  const { functional_role } = Usermodulfunctionalroledropdown();
  const { quarter } = UsermodulQuarterdropdown();
  const { employee_city } = Usermodulecitydropdown(queryParams);

  const [channelCode, setChannelCode] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_MANAGE_USER_CHANNEL_CODE_DROPDOWN.DATA);
        const data = await response.json();
        setChannelCode(data);
      } catch (error) {
        console.error("Error fetching channel codes", error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    setEmployee_role([]);
    setEmployee_role("");
    const fetchData = async () => {
      const queryParams = new URLSearchParams({
        channel_code: selectedChannel,
      });
      setLoadingDropdown(true);
      try {
        const response = await fetch(API_MANAGE_EMPLOYEE_ROLE_DROPDOWN.DATA(queryParams));
        const data = await response.json();
        if (data && data.length > 0) {
          setEmployee_role(data);
          setDropdownActive(true);
        }
      } catch (error) {
        console.error("Error fetching employee roles", error);
      }
      finally {
        setLoadingDropdown(false);
      }
    };
    if (selectedChannel !== "") {
      fetchData();
    }
  }, [selectedChannel]);


  const [zonec, setZonec] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams({
        channel_code: selectedChannel,
        valid_upto: '30-12-99',
      })
      setLoadingDropdown(true);
      try {
        const response = await fetch(API_MANAGE_USER_ZONE_DROPDOWN.DATA(queryParams));
        const data = await response.json();
        setZonec(data);
      } catch (error) {
        console.error("Error fetching region details", error);
      } finally {
        setLoadingDropdown(false);
      }
    };
    if (selectedChannel !== "") {
      fetchData();
    }
  }, [selectedChannel]);

  const [region, setRegion] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams({
        channel_code: selectedChannel,
        valid_upto: '30-12-99',
      })
      setLoadingDropdown(true);
      try {
        const response = await fetch(API_MANAGE_REGION_DROPDOWN.DATA(queryParams));
        const data = await response.json();
        setRegion(data);
      } catch (error) {
        console.error("Error fetching region details", error);
      }
      finally {
        setLoadingDropdown(false);
      }
    };
    if (selectedChannel !== "") {
      fetchData();
    }
  }, [selectedChannel]);

  const [loactionUfc, setLocationUfc] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams({
        region_code: regionCode,
        channel_code: selectedChannel,
        valid_upto: '30-12-99'
      })
      setLoadingDropdown(true);
      try {
        const response = await fetch(API_MANAGE_UFC_LOCATION_DROPDOWN.DATA(queryParams));
        const data = await response.json();
        setLocationUfc(data);
      } catch (error) {
        console.error("Error fetching region details", error);
      } finally {
        setLoadingDropdown(false);
      }
    };
    fetchData();
  }, [regionCode, selectedChannel])

  const [emp_id, setEmp_id] = useState("");
  const [emp_name, setEmp_name] = useState("");
  const [emailid, setEmailid] = useState("");
  const [emp_pass, setEmp_pass] = useState("");
  const [reporting_role, setReporting_role] = useState("");
  const [power_user_code, setPower_user_code] = useState("");
  const [location, setLocation] = useState("");
  const [kam_flag, setKam_flag] = useState("");
  const [nam_group, setNam_group] = useState("");
  const [func_role, setFunc_role] = useState("");
  const [city, setCity] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [status, setstatus] = useState("");
  const [dv_flag, setDv_flag] = useState("");
  const [remark, setRemark] = useState("");
  const [select_quarter, setSelect_quarter] = useState("");
  const [valid_from, setValid_from] = useState("");
  const [valid_upto, setValid_upto] = useState("");
  const [access_from, setAccess_from] = useState("");
  const [access_upto, setAccess_upto] = useState("");
  const [zone, setZone] = useState("");
  const formattedStartDate = start_date.split("-").reverse().join("/");
  const formattedEndDate = end_date.split("-").reverse().join("/");
  const formattedvalid_from = valid_from.split("-").reverse().join("/");
  const formattedvalid_upto = valid_upto.split("-").reverse().join("/");
  const formattedaccess_from = access_from.split("-").reverse().join("/");
  const formattedaccess_upto = access_upto.split("-").reverse().join("/");

  const storeData = async (e) => {
    setIsLoading(true)
    const response = await fetch('http://localhost:3000/api/v1/employees', {
      method: 'POST',
      body: JSON.stringify(
        {
          emp_id: emp_id,
          emp_name: emp_name,
          emailid: emailid,
          emp_pass: emp_pass,
          channel_code: selectedChannel,
          emp_role: selectedRole,
          reporting_role: reporting_role,
          power_user_code: power_user_code,
          zone: zone,
          region_code: regionCode,
          location: location,
          kam_flag: kam_flag,
          nam_group: nam_group,
          func_role: func_role,
          city: city,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          status: status,
          dv_flag: dv_flag,
          remark: remark,
          select_quarter: select_quarter,
          valid_from: formattedvalid_from,
          valid_upto: formattedvalid_upto,
          access_from: formattedaccess_from,
          access_upto: formattedaccess_upto
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    {
      setIsLoading(false)
      window.location.reload();
    }
  }

  return (
    <>
      <Navbar onToggle={toggleSidebar} />
      <div className="d-flex">
        <SideBar isOpen={sidebarOpen} />
        <div
          className={` ${sidebarOpen ? "dashboard-closed" : "dashboard-full"
            }`}
        >

          <div className="container-fluid pt-3 home-main">
            <div className="card" style={{ borderRadius: "10px 10px 10px 10px " }}>
              <div>
                <h4 className="p-3 a1">Employee Details</h4>
              </div>
              <div className="d-flex justify-content-around mt-3">
                <div className="col-md-3">
                  <label><b>Employee ID</b></label>
                  <input type="text" className="form-control" value={emp_id} onChange={(e) => setEmp_id(e.target.value)} />
                </div>
                <div className="col-md-3">
                  <label><b>Employee Name</b></label>
                  <input type="text" className="form-control" value={emp_name} onChange={(e) => setEmp_name(e.target.value)} />
                </div>
                <div className="col-md-3">
                  <label><b>Email ID</b></label>
                  <input type="email" className="form-control" value={emailid} onChange={(e) => setEmailid(e.target.value)} />
                </div>
              </div>
              <div className="d-flex justify-content-around mt-3">
                <div className="col-md-3">
                  <label><b>Password</b></label>
                  <input type="password" className="form-control" value={emp_pass} onChange={(e) => setEmp_pass(e.target.value)} />
                </div>
                <div className="col-md-3">
                  <label><b>Channel Code</b></label>
                  <select class="form-select" value={selectedChannel} onChange={(e) => setSelectedChannel(e.target.value)}>
                    <option>Select</option>
                    {channelCode.length > 0 && channelCode.map((item) =>
                      <option key={item.CHANNEL_CODE} value={item.CHANNEL_CODE}>{item.CHANNEL_CODE}</option>
                    )}
                  </select>
                </div>
                <div className="col-md-3">
                  <label><b>Employee Role</b></label>
                  <select className="form-select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}
                    disabled={!isDropdownActive || isLoadingDropdown}
                  >
                    <option>Select</option>
                    {employee_role.length > 0 && employee_role.map((item) => (
                      <option key={item.DES} value={item.ROLE}>{item.DES}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-around mt-3">
                <div className="col-md-3">
                  <label><b>CRM Reporting Role</b></label>
                  <select class="form-select" value={reporting_role} onChange={(e) => setReporting_role(e.target.value)} >
                    <option>Select</option>
                    {crm_role.length > 0 && crm_role.map((item) =>
                      <option >{item.REPORTING_ROLE}</option>
                    )}
                  </select>
                </div>
                <div className="col-md-3">
                  <label><b>CRM Power User</b></label>
                  <select class="form-select" value={power_user_code} onChange={(e) => setPower_user_code(e.target.value)}>
                    <option value="">select</option>
                    {power_user.length > 0 && power_user.map((item) =>
                      <option value={item.POWER_USER_CODE}>{item.POWER_USER_CODE_DESC}</option>
                    )}
                  </select>
                </div>
                <div className="col-md-3">
                  <label><b>Zone</b></label>
                  <select class="form-select" value={zone} onChange={(e) => setZone(e.target.value)}
                    disabled={!isDropdownActive || isLoadingDropdown}
                  >
                    <option value="">select</option>
                    {zonec.length > 0 && zonec.map((item) =>
                      <option key={item.ZONE}>{item.ZONE}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-around mt-3">
                <div className="col-md-3">
                  <label><b>Region</b></label>
                  <select className="form-select" value={regionCode} onChange={(e) => setRegionCode(e.target.value)}
                    disabled={!isDropdownActive || isLoadingDropdown}>
                    <option>Select</option>
                    {region.length > 0 && region.map((item) =>
                      <option key={item.REGION_CODE}>{item.REGION_CODE}</option>
                    )}
                  </select>
                </div>
                <div className="col-md-3">
                  <label><b>Location/UFC</b></label>
                  <select class="form-select" disabled={!isDropdownActive || isLoadingDropdown} value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="">select</option>
                    {loactionUfc.length > 0 && loactionUfc.map((item) =>
                      <option key={item.UFC_NAME} value={item.UFC_CODE}>{item.UFC_NAME}</option>
                    )}
                  </select>
                </div>
                <div className="col-md-3">
                  <label><b>KAM Group</b></label>
                  <select class="form-select" value={kam_flag} onChange={(e) => setKam_flag(e.target.value)}>
                    <option value="">select</option>
                    <option value="BOTH">BOTH</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-around mt-3">
                <div className="col-md-3">
                  <label><b>NAM Group</b></label>
                  <select class="form-select" value={nam_group} onChange={(e) => setNam_group(e.target.value)}>
                    <option value="">select</option>
                    <option value="BOTH">BOTH</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label><b>Functional Role</b></label>
                  <select class="form-select" value={func_role} onChange={(e) => setFunc_role(e.target.value)}>
                    <option value="">select</option>
                    {functional_role.length > 0 && functional_role.map((item) =>
                      <option >{item.FUNCTION}</option>
                    )}
                  </select>
                </div>
                <div className="col-md-3">
                  <label><b>City</b></label>
                  <select class="form-select" value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="">select</option>
                    {employee_city.length > 0 && employee_city.map((item) =>
                      <option >{item.CITY_NAME}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-around mt-3">
                <div className="col-md-3">
                  <label><b>Start Date</b></label>
                  <input type="date" className="form-control" value={start_date} onChange={(e) => setStart_date(e.target.value)} />
                </div>
                <div className="col-md-3">
                  <label><b>End Date</b></label>
                  <input type="date" className="form-control" value={end_date} onChange={(e) => setEnd_date(e.target.value)} />
                </div>
                <div className="col-md-3">
                  <label><b>Status</b></label>
                  <select class="form-select" value={status} onChange={(e) => setstatus(e.target.value)}>
                    <option value="">select</option>
                    <option value="Y">Working</option>
                    <option value="N">Not Working</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-around mt-3">
                <div className="col-md-3">
                  <label><b>Petty Cash Claim</b></label>
                  <select class="form-select" value={dv_flag} onChange={(e) => setDv_flag(e.target.value)}>
                    <option value="">select</option>
                    <option value="Y">YES</option>
                    <option value="N">NO</option>
                  </select>
                </div>
                <div className="col-md-7">
                  <label><b>Remark</b></label>
                  <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-around mt-3">
                <div className="col-md-3">
                  <label><b>Select Quarter</b></label>
                  <select className="form-select" value={select_quarter} onChange={(e) => setSelect_quarter(e.target.value)}>
                    <option value="">select</option>
                    {quarter.length > 0 && quarter.map((item) =>
                      <option >{item.YEAR}</option>
                    )}
                  </select>
                </div>
                <div className="col-md-3">
                  <label><b>Valid From</b></label>
                  <input type="date" className="form-control" value={valid_from} onChange={(e) => setValid_from(e.target.value)} />
                </div>
                <div className="col-md-3">
                  <label><b>Valid Upto</b></label>
                  <input type="date" className="form-control" value={valid_upto} onChange={(e) => setValid_upto(e.target.value)} />
                </div>
              </div>
              <div className="d-flex justify-content-around mt-3">
                <div className="col-md-3"></div>
                <div className="col-md-3">
                  <label><b>HR Valid From</b></label>
                  <input type="date" className="form-control" value={access_from} onChange={(e) => setAccess_from(e.target.value)} />
                </div>
                <div className="col-md-3">
                  <label><b>HR Valid Upto</b></label>
                  <input type="date" className="form-control" value={access_upto} onChange={(e) => setAccess_upto(e.target.value)} />
                </div>
              </div>
              <div className="col-md-12 d-flex justify-content-around mb-5 mt-5">
                <div className="col-md-9"></div>
                <div>
                  {isLoading ? (
                    <div className="text-center mt-4">
                      <i className="fas fa-spinner fa-spin fa-2x loder"></i>{" "}
                      <Loader className="loder" />
                    </div>
                  ) : (
                    <button type="button" className="btn1" onClick={storeData}>
                      <b>Save</b>
                    </button>
                  )}
                </div>
                {/* <div >
                  <button type="btn" className="btn1"><b>Cancel</b></button>
                </div> */}
                <div className="mt-2">
                  <Link to="/manageuser" className="btn1" ><b>Back</b></Link>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  )
}
export default Employee_details;
