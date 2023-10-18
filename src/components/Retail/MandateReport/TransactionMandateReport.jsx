import React, { useState } from "react";
import SideBar from "../../Shared/SideBar/SideBar";
import Navbar from "../../Shared/Navbar";
import "./TransactionMandateReport.css";
// import SalesTable from "../Table/SalesTable";
import LoaderSearch from "../../Table/SubTable/LoaderSearch";
// import Api from "../RetailApi/Api";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AssetClass, Scheme } from "../RetailApi/SchemeApi";
// import RedemptionTable from "../Table/RedemptionTable";
// import NetSalesTable from "../Table/NetSalesTable";
import { ExcelToExport } from "../ExcelToExport";
import ExportToPdf from "../ExportToPdf";
import MandateTable from "./MandateTable";
import { useParams } from "react-router-dom";

const TransactionMandateReport = () => {
  const { scheme_details } = Scheme();
  const { asset } = AssetClass();


  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("Live");
  const [showDateFields, setShowDateFields] = useState(false);

  // const {
  //   hide,
  //   loading,
  // } = Api();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    setShowDateFields(status === "new-reg");
  };

  return (
    <>
      {/* <ToastContainer
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
      /> */}

      <div className="container-fluid p-0 home-main ">
        <Navbar onToggle={toggleSidebar} />
        <div className="d-flex">
          <SideBar isOpen={sidebarOpen} />
          <div
            className={` ${
              sidebarOpen ? "dashboard-closed" : "dashboard-full"
            }`}
          >
            <div className="bg-white card m-4">
              <div className="col-l-12  ">
                <div className=" rounded-lg p-3">
                  <button
                    className="border-0 w-100 text-left bg-transparent "
                    type="button"
                  >
                    <h5 className="headline-2">
                      <b>RTL-SIP ZoneWise Transaction Summary</b>
                    </h5>
                  </button>
                  {showDateFields && (
                    <div className="col-lg-12 d-flex justify-content-around mt-2">
                      <div className=" col-md-2" />
                      <div className="form-group col-md-2">
                        <label className="form-lables-2">
                          <b>Start Date</b>
                        </label>
                        <input type="date" className="form-control mt-2" />
                      </div>
                      <div className="form-group col-md-2">
                        <label className="form-lables-2">
                          <b>End Date</b>
                        </label>
                        <input type="date" className="form-control mt-2" />
                      </div>
                      <div className=" col-md-2" />
                    </div>
                  )}
                  <div>
                    <div className="col-lg-12 d-flex justify-content-around mt-5 ">
                      <div className="form-group col-md-2">
                        <label className="form-lables-2">
                          <b>Asset Class</b>
                        </label>
                        <select
                          name="assetClass"
                          id="ab"
                          className="form-select form-control mt-2"

                        >
                          <option value="ALL">ALL</option>
                          {asset.map((item) => (
                            <option key={item.SM_NATURE} value={item.SM_NATURE}>
                              {item.SM_NATURE}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group col-md-2">
                        <label className="form-lables-2">
                          <b>Status</b>
                        </label>
                        <select
                          name=""
                          id="ab"
                          className="form-select form-control mt-2"
                          // onChange={(e) => setSelectType(e.target.value)}
                          onChange={handleStatusChange}
                          value={selectedStatus}
                        >
                          <option value="Live">Live</option>
                          <option value="new-reg">New Registration </option>
                          <option value="live-base">Live-Base</option>
                          <option value="terminated">Terminated</option>
                          <option value="grosssales">Gross Sale</option>
                          <option value="fare-log-con">
                            Farewell Login Contest
                          </option>
                        </select>
                      </div>

                      <div className="form-group col-md-2 m-md-0 mt-3">
                        <label className="form-lables-2">
                          <b>Scheme</b>
                        </label>
                        {
                          <select
                            name=""
                            id="checkbox"
                            className="form-select form-control mt-2"
                            multiple
                          >
                            <option  className="form-label select-label" value="">Select Scheme</option>
                            {scheme_details.map((item) => (
                              <option key={item.SCHEME} value={item.SCHEME}>
                                {item.SCHEME}
                              </option>
                            ))}
                          </select>
                        }
                      </div>
                      <div className="col-md-2">
                        <label className="form-lables-2 ">
                          <b>Transaction Type</b>
                        </label>
                        <select
                          className="form-select  mt-2"
                          //   onChange={(e) => setSelectType(e.target.value)}
                        >
                          <option value="sip">SIP</option>
                          <option value="stp">STP</option>
                        </select>
                      </div>
                      <div />
                    </div>

                    <div className="d-flex">
                      <div className="col-lg-12 d-flex justify-content-around ">
                        <div className="col-md-2"></div>

                        <div className=" d-flex justify-content-between mt-5 ">
                          <div className="col-md-2 ">
                            <button
                              className="btn  BgcolorOrange "
                              //   onClick={togglehide}
                            >
                              <b className="colorwhite"> Search</b>
                            </button>
                          </div>
                          <div className="col-md-4"></div>
                          <div className="col-md-2 ">
                            <p className="rcorners-2">
                              <ExcelToExport />
                              |<ExportToPdf />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <>
                <div className="Table">
                  {/* {loading ? (
                    <div className="text-center mt-4">
                      <i className="fas fa-spinner fa-spin fa-2x"></i>{" "}
                      <LoaderSearch />
                    </div>
                  ) : (
                    hide && ( */}
                  <div>
                    <MandateTable />
                  </div>
                  {/* //   ) */}
                  {/* // )} */}
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TransactionMandateReport;
