import React, {  useState } from "react";
import "../Assets/css/Auth/Login.css";
import leftimage from "../Assets/images/utiloginfinal.png";
import { useNavigate } from "react-router-dom";
import { setEmpIdCookie, setAuthTokenCookie } from "./Cookie";
import { API_LOGIN } from "../../Constant/apiConstant";
// import Api from "../../Constant/apiConstant";
// import { fetchRoleWiseData } from "../../Constant/apiService";
import axiosInstance from "../../Constant/apiConstant";
import {API_ROLEWISE} from "../../Constant/apiConstant";
import { useRoleWiseData } from "../../Context/RoleWiseDataContext";

const Login = () => {
  const [p_emp_id, setEmpID] = useState(" ");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [roleWiseData, setRoleWiseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  
  const { setRoleWiseData } = useRoleWiseData();
  const handleLogin = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_LOGIN.DATA, {
        p_emp_id,
        password,
      });
      
      if (response.status >= 200 && response.status < 300) {
        const data = await response.data;
        if (Array.isArray(data) && data.length > 0) {
          const empId = data[0].p_emp_id;
          const token = data[0].p_auth_token;
          
          localStorage.setItem("emp_id", empId);
          localStorage.setItem("token", token);
          
          setEmpIdCookie(empId);
          setAuthTokenCookie(token);
          
          // Call fetchRoleWiseData here with empId and token
          const roleWiseData = await fetchRoleWiseData(empId, token);
          setRoleWiseData(roleWiseData);
          console.log(roleWiseData);
          
          setEmpID("");
          setPassword("");

          navigate("/Home");
        } else {
          setError("Invalid API response format");
        }
      } else {
        setError(`Network response was not ok (${response.status})`);
      }
    } catch (error) {
      setError("Error fetching data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoleWiseData = async (empId, token) => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).replace(/ /g, "-");
    
    try {
      const response = await axiosInstance.get(API_ROLEWISE.DATA, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          emp_id: empId,
          current_date: formattedDate.toString(),
          quarter_no: 0,
        },
      });
      
      if (response.status >= 200 && response.status < 300) {
        const contentType = response.headers.get("content-type");
        console.log("Content-Type:", contentType);
        
        if (contentType && contentType.includes("application/json")) {
          return response.data;
        } else {
          console.error("Response is not in JSON format");
          throw new Error("Response is not in JSON format");
        }
      } else {
        console.error(`Network response was not ok (${response.status})`);
        throw new Error(`Network response was not ok (${response.status})`);
      }
    } catch (error) {
      console.error("Error fetching role-wise data:", error);
      throw error;
    }
  };

  return (
    <>
      <div className="container-fluid" id="main-container">
        <div className="col-md-12" id="main-login">
          <div className="col-md-6">
            <img src={leftimage} alt="images" className="main-image" />
          </div>
          <div className="col-md-6" id="second-card">
            <div>
              <div className="text-center">
                <h2 id="login-heading">LOGIN</h2>
                <p className="login-p">Please enter your details</p>
              </div>
              <div className="main-form">
                <form>
                  <div className="mb-3">
                    <label className="form-label" id="label-text">
                      Employee ID <span className="required-span">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Please Enter your valid Employee ID"
                      value={p_emp_id}
                      onChange={(e) => {
                        setEmpID(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" id="label-text">
                      Password <span className="required-span">*</span>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"} // Toggle the input type based on showPassword state
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Please Enter your Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <label className="form-check-label">Show Password</label>
                  </div>
                  <div className="text-center">
                    <button
                      className="btn w-100"
                      id="button-login"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <div className="query">
                <p className="query-p">
                  For any query, Please write to :{" "}
                  <span>mis.analytics@uti.com</span>
                </p>
              </div>
            </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
