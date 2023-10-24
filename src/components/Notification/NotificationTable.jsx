import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import SideBar from "../Shared/SideBar/SideBar";
import Navbar from "../Shared/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

const NotificationTable = () => {
  // Sample data for the table
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const data = [
    {
      id: 1,
      description: "Notification 1",
      validFrom: "2023-10-17",
      validUpto: "2023-10-31",
      lastUpdateDate: "2023-10-17",
      lastUpdatedBy: "User A",
      status: "Y",
    },
  ];
  const [dataa,setDataa]= useState(data)
 

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDelete = (id) => {
    const updatedData = dataa.filter(item => item.id !== id);
    setDataa(updatedData);
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
                      <th>ID</th>
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
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.description}</td>
                        <td>{item.validFrom}</td>
                        <td>{item.validUpto}</td>
                        <td>{item.lastUpdateDate}</td>
                        <td>{item.lastUpdatedBy}</td>
                        <td>{item.status}</td>
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
};

export default NotificationTable;
