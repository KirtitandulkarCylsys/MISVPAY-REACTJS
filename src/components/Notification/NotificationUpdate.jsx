import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import SideBar from "../Shared/SideBar/SideBar";
import Navbar from "../Shared/Navbar";
import { NOTIFICATION_UPDATE } from "../../Constant/apiConstant";
import { useDataContext } from "../../Context/DataContext";
import "./NotificationForm.css";

const NotificationUpdate = ({ headers }) => {
  const location = useLocation();
  const existingData = location.state ? location.state.existingData : null;
  const { notif_id, notification_desc, valid_from, valid_upto, last_updated_by } = useDataContext();

  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [formData, setFormData] = useState({
    notif_id,
    notification_desc: notification_desc,
    valid_from: valid_from,
    valid_upto: valid_upto,
    last_updated_by: last_updated_by,

  });

  useEffect(() => {
    if (existingData) {
      setFormData({
        notif_id: existingData.NOTIF_ID,
        notification_desc: existingData.NOTIF_DESC,
        valid_from: formatDateToDdMmYy(existingData.VALID_FROM),
        valid_upto: formatDateToDdMmYy(existingData.VALID_UPTO),
        last_updated_by: existingData.LAST_UPDATED_BY,
      });
    }
  }, [existingData]);

  function convertStringToFormattedDate(inputString) {  
    const dateObject = new Date(inputString); 
    if (!isNaN(dateObject.getTime())) {   
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      const day = String(dateObject.getDate()).padStart(2, '0');
      console.log(year,month,day ,"hfsdkj")
      return `${year}-${month}-${day}`;
    } else { return "Invalid date"; }
  }

  function formatDateToDdMmYy(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
    const formattedYear = String(year).padStart(2, '0');
    const formattedDate = `${formattedDay}-${formattedMonth}-${formattedYear}`;
   
    return formattedDate;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNotification(formData);
  };

  const updateNotification = async (data) => {
    try {
      setLoading(true)
      const response = await fetch(`${NOTIFICATION_UPDATE.DATA}`, {
        method: "PUT",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Notification updated successfully");
      } else {
        toast.error("Failed to update notification");
      }
    } catch (error) {
      console.error("Error updating notification", error);
      toast.error("Error updating notification");
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="container-fluid p-0 home-main">
      <Navbar onToggle={toggleSidebar} />
      <div className="d-flex">
        <SideBar isOpen={sidebarOpen} />
        <div className={` ${sidebarOpen ? "dashboard-closed" : "dashboard-full"}`}>
          <div className="bg-white card m-4">
            <div className="col-l-12  ">
              <div className=" rounded-lg p-3"></div>
              <button
                className="border-0 w-100 text-left bg-transparent "
                type="button"
              >
                <h5 className="headline">
                  <b>UPDATE NOTIFICATION</b>
                </h5>
              </button>
              <form onSubmit={handleSubmit}>
                <div className="col-lg-12 d-flex justify-content-around mt-5">
                  <div className="form-group col-md-2">
                    <label className="form-lables" style={{ marginRight: "5px" }}>
                      <b>NOTIFICATION</b>
                    </label>
                    <input
                      type="text"
                      name="notification_desc"
                      value={formData.notification_desc}
                      onChange={handleChange}
                      className="form-control mt-2"
                      placeholder="Enter Notification"
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label className="form-lables" style={{ marginRight: "5px" }}>
                      <b>VALID FROM</b>
                    </label>
                    <input
                      type="date"
                      name="valid_from"
                      value={convertStringToFormattedDate(formData.valid_from )}
                      onChange={handleChange}
                      className="form-control mt-2"
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label className="form-lables">
                      <b>VALID UPTO</b>
                    </label>
                    <input
                      type="date"
                      name="valid_upto"
                      value={convertStringToFormattedDate(formData.valid_upto)}
                      onChange={handleChange}
                      className="form-control mt-2"
                    />
                  </div>
                  <div className="form-group col-md-2 m-md-0 mt-3">
                    <label className="form-lables">
                      <b>LAST UPDATED BY</b>
                    </label>
                    <input
                      type="text"
                      name="last_updated_by"
                      value={formData.last_updated_by}
                      onChange={handleChange}
                      className="form-control mt-2"
                      placeholder="Enter Name"
                    />
                  </div>
                  
                </div>
                <div className="col-lg-12 d-flex justify-content-around mt-5">
                  {/* <div className="col-md-2 form-group">
                    <label className="form-lables">
                      <b>STATUS (Y/N)</b>
                    </label>
                    <input
                      type="text"
                      name="status"
                      value={"Y"}
                      className="form-control mt-2"
                      placeholder="Enter Y/N"
                    />
                  </div> */}
                  <div className="col-md-7"></div>
                  <div className="col-md-2 m-2">
                    <button onClick={handleSubmit} className="btn BgcolorOrange mb-5 mt-5">
                      <b>UPDATE</b>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationUpdate;
