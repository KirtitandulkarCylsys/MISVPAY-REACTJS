import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../Shared/Navbar";
import SideBar from "../../Shared/SideBar/SideBar";
import { useDataContext } from "../../../Context/DataContext";
import Retail_Transaction from "../Retail_Transaction";
import msg from "../../Assets/images/msg_icon.png";
import calender from "../../Assets/images/date-time_icon.png";
import datetime from "../../Assets/images/Vector (Stroke).png";
import { ExcelToExport } from "../ExcelToExport";
import ExportToPdf from "../ExportToPdf";
import LoaderSearch from "../../Table/LoaderSearch";
import ScheduleModal from "../../Shared/Modal/ScheduleModal";
import "./Arn.css"
const ArnReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {
    hide,
    setHide,
    emproles,
    start_Date,
    end_Date,
    rolwiseselectype,
    loading,
  } = useDataContext();

  const togglehide = () => {
    try {
      setHide(true);
    } catch (error) {
      setHide(false);
      toast.error("Please fill all the fields");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const { handleStartDateChange, handleEndDateChange, handleSelectType } =
  Retail_Transaction();

  const commonReport = emproles;
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="home-main">
        <Navbar onToggle={toggleSidebar} />
        <div className="d-flex">
          <SideBar isOpen={sidebarOpen} />
          <div
            className={`${sidebarOpen ? "dashboard-closed" : "dashboard-full"}`}
          >
            <div className="container-fluid">
              <section className="section mt-3">
                <div className="row">
                  <div className="col-lg-12 col-lg-offset-2">
                    <div className="card-body bg-white ">
                      <div className="rounded-lg p-3">
                        <button
                          class="border-0 w-100 text-left bg-transparent "
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >
                          <h5 className="text-lg-start">
                            <b> ARN TRANSACTION SUMMARY REPORT</b>
                          </h5>
                        </button>
                      </div>
                      <div className="row mt-3 d-flex justify-content-around">
                        {/* start date */}
                        <div className="form-group col-md-2">
                          <label for="">
                            <b> Start Date </b>
                          </label>
                          <img src={datetime} alt="datetime" />
                          <input
                            type="date"
                            class="form-control"
                            id=""
                            placeholder="Project Start Date"
                            value={start_Date}
                            onChange={handleStartDateChange}
                          />
                        </div>
                        {/* end Date */}
                        <div class="form-group col-md-2">
                          <label for="">
                            <b> End Date </b>
                          </label>
                          <img src={datetime} alt="datetime" />
                          <input
                            type="date"
                            class="form-control"
                            id=""
                            placeholder="Project End Date"
                            value={end_Date}
                            onChange={handleEndDateChange}
                          />
                        </div>

                        {/* arncode */}
                        <div class="form-group col-md-2">
                          <label for="">
                            <b> Enter ARN </b>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter ARN Code"
                          />
                        </div>
                        {/* select type */}
                        <div class="form-group col-md-2">
                          <label for="">
                            <b> Select Type</b>
                          </label>
                          <select
                            name=""
                            id="ab"
                            class="form-select form-control"
                            value={rolwiseselectype}
                            onChange={(e) => handleSelectType(e.target.value)}
                          >
                            <option value=""> choose type</option>
                            <option value="NETSALES">NET SALES </option>
                            <option value="GROSSSALES">GROSS SALES </option>
                          </select>
                        </div>
                      </div>

                      <div className="row mt-4 d-flex justify-content-around">
                        
                          {/* asset class */}
                          <div class="form-group col-md-2">
                            <label for="">
                              <b>Asset Class</b>
                            </label>
                            <select
                              name=""
                              id="ab"
                              class="form-select form-control"
                            >
                              <option value="">All </option>
                              <option value="">Arbitrage </option>
                              <option value="">Cash </option>
                              <option value="">Equity </option>
                              <option value="">Fixed Income</option>
                            </select>
                          </div>
                          {/* scheme details */}

                          <div className="form-group col-md-3">
                            <label className="form-lables">
                              <b> Scheme</b>
                            </label>
                            <select
                              name=""
                              id="ab"
                              class="form-select form-control"
                            >
                              <option value="">t </option>
                              <option value="">h </option>
                              <option value="">Cash </option>
                            </select>
                          </div>

                          
                          {/* search button */}

                          <div className="col-md-2 search mt-3 ">
                            <button
                              className="btn  BgcolorOrange float-end"
                              onClick={togglehide}
                            >
                              <b className="colorwhite"> Search</b>
                            </button>
                          </div>

                          {/* export, pdf, model */}
                          <div className="col-md-2 arnexport mt-3 ">
                            <p>
                              <ExcelToExport />
                              |<ExportToPdf />|
                              <img src={msg} alt="msgicon" /> |{" "}
                              <img
                                id="myImg"
                                src={calender}
                                alt="calendericon"
                                data-bs-toggle="modal"
                                data-bs-target="#scheduleModal"
                              />
                            </p>
                          </div>
                        
                      </div>
                      <ScheduleModal />
                      <>
                        <div className="Table">
                          {loading ? (
                            <div className="text-center mt-4">
                              <i className="fas fa-spinner fa-spin fa-2x"></i>{" "}
                              <LoaderSearch />
                            </div>
                          ) : hide ? (
                            <>
                              {commonReport === "ZH" ||
                              commonReport === "ADMIN" ? (
                                <></>
                              ) : commonReport === "RH" ? (
                                <></>
                              ) : commonReport === "CM" ? (
                                <></>
                              ) : commonReport === "RM" ? (
                                <></>
                              ) : null}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArnReport;
