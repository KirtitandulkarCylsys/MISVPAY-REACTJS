import { React, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../Shared/Navbar";
import SideBar from "../../Shared/SideBar/SideBar";
import { ExportToExcel } from "../AUM/ExportToExcel";
import ExportToPDF from "../AUM/ExportToPDF";
import LoaderSearch from "../../Table/SubTable/LoaderSearch";
import datetime from "../../Assets/images/Vector (Stroke).png";
import "./EtfSale.css";
import EtfSaleTable from "./EtfSaleTable";
import ETF_Api from "../RetailApi/ETF_Api";
const EtfSale = ({ headers }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {
    hide,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    etf_Sale,
    loading,
    togglehide,
    emproles,
    formatNumberToIndianFormat,
  } = ETF_Api({ headers });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (newEndDate < startDate) {
      toast.error("End date should be greater than start date");
    } else {
      setEndDate(newEndDate);
    }
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (newStartDate > endDate) {
      toast.error("Start date should be less than end date");
    } else {
      setStartDate(newStartDate);
    }
  };
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
                          <h5 className="mb-5 mt-2 text-lg-start">
                            <b>ETF_SALES_REPORT</b>
                          </h5>
                        </button>
                      </div>
                      <div className=" col-md-12 row d-flex justify-content-lg-center mb-5">
                        {/* start datw */}
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
                            value={startDate}
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
                            value={endDate}
                            onChange={handleEndDateChange}
                          />
                        </div>
                        {/* asset class */}
                        <div className="col-md-4 d-flex mt-3">
                          <div className="col-md-6  search ">
                            <button
                              className="btn  BgcolorOrange float-end mx-2 "
                              onClick={togglehide}
                            >
                              <b className="colorwhite"> Search</b>
                            </button>
                          </div>

                          {/* export, pdf, model */}
                          <div className="col-md-6  tabs ">
                            <p className="exporttab">
                              <ExportToExcel />
                              |<ExportToPDF />
                            </p>
                          </div>
                        </div>
                      </div>

                      <>
                        <div className="Table">
                          {loading ? (
                            <div className="text-center mt-4">
                              <i className="fas fa-spinner fa-spin fa-2x"></i>{" "}
                              <LoaderSearch />
                            </div>
                          ) : hide ? (
                            <EtfSaleTable
                              etf_Sale={etf_Sale}
                              startDate={startDate}
                              endDate={endDate}
                              formatNumberToIndianFormat={
                                formatNumberToIndianFormat
                              }
                            />
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

export default EtfSale;
