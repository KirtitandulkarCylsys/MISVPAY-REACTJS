import React, { useState } from "react";
import SideBar from "../Shared/SideBar/SideBar";
import Navbar from "../Shared/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useDataContext } from "../../Context/DataContext";

function NotificationTable({ notifications }){
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { notification_desc,
    setNotificationDesc, valid_from, setValidFrom, valid_upto, setValidUpto, last_updated_by, setLastUpdatedBy, status, setStatus } = useDataContext();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="container-fluid p-0 home-main">
      <Navbar onToggle={toggleSidebar} />
      <div className="d-flex">
        <SideBar isOpen={sidebarOpen} />
        <div
          className={` ${sidebarOpen ? "dashboard-closed" : "dashboard-full"}`}
        >
          <div className="bg-white card m-4">
            <div className="col-l-12">
              <div className="rounded-lg p-3">
                <button
                  className="border-0 w-100 text-left bg-transparent"
                  type="button"
                >
                  <h5 className="headline">
                    <b>NOTIFICATION MASTER</b>
                  </h5>
                </button>
                <div></div>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Notification description</th>
                      <th>Valid from</th>
                      <th>Valid Upto</th>
                      <th>Last Update date</th>
                      <th>Last Updated by</th>
                      <th>Status (Y/N)</th>
                      <th>CRUD</th>
                    </tr>
                  </thead>
                  <tbody>
											{notifications.map((notification, index) => (
												<tr key={index}>
													<td>{notification.notification_desc}</td>
													<td>{notification.valid_from}</td>
													<td>{notification.valid_upto}</td>
													<td>{notification.last_updated_by}</td>
													<td>{notification.status}</td>
                          <td>
                          <FontAwesomeIcon icon={faEye} className="text-info mx-2" />
                          <FontAwesomeIcon icon={faEdit} className="text-primary mx-2" />
                          <FontAwesomeIcon icon={faTrash} className="text-danger mx-2" />
                        </td>
												</tr>
											))}
										</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationTable;
