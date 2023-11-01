import React, { useState } from "react";
import SideBar from "../Shared/SideBar/SideBar";
import Navbar from "../Shared/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Notif_Details } from "./NotificationAPI/NotificationGetApi";
import { Link } from "react-router-dom";
import "./NotificationTable.css"; 

function NotificationTable() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { notif_details } = Notif_Details();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage =5;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = notif_details.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container-fluid p-0 home-main">
      <Navbar onToggle={toggleSidebar} />
      <div className="d-flex">
        <SideBar isOpen={sidebarOpen} />
        <div className={` ${sidebarOpen ? "dashboard-closed" : "dashboard-full"}`}>
          <div className="bg-white card m-4">
            <div className="col-l-12">
              <div className="rounded-lg p-3"></div>
              <button className="border-0 w-100 text-left bg-transparent" type="button">
                <h5 className="headline">
                  <b>NOTIFICATION MASTER</b>
                </h5>
              </button>
              <div></div>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Sr NO.</th>
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
                  {currentItems.map((item) => (
                    <tr key={item.NOTIF_ID}>
                      <td>{item.NOTIF_ID}</td>
                      <td>{item.NOTIF_DESC}</td>
                      <td>{item.VALID_FROM}</td>
                      <td>{item.VALID_UPTO}</td>
                      <td>{item.LAST_UPDATE_DATE}</td>
                      <td>{item.LAST_UPDATED_BY}</td>
                      <td>{item.STATUS}</td>
                      <td>
                        <FontAwesomeIcon icon={faEye} className="text-info mx-2" />

                        <Link to={`/NotificationTable/notificationUpdate/${item.NOTIF_ID}`} state={{ existingData: item }}>
                          <FontAwesomeIcon icon={faEdit} className="text-primary mx-2" />
                        </Link>

                        <FontAwesomeIcon icon={faTrash} className="text-danger mx-2" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <ul>
                  {Array(Math.ceil(notif_details.length / itemsPerPage))
                    .fill()
                    .map((_, index) => (
                      <li key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationTable;
