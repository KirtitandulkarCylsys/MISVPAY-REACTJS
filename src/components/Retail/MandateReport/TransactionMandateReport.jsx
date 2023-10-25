import React, { useState } from "react";
import SideBar from "../../Shared/SideBar/SideBar";
import Navbar from "../../Shared/Navbar";
import "./TransactionMandateReport.css";
import LoaderSearch from "../../Table/LoaderSearch";
// import SalesTable from "../Table/SalesTable";
// import Api from "../RetailApi/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AssetClass, Scheme } from "../RetailApi/SchemeApi";
import { ExcelToExport } from "../ExcelToExport";
import ExportToPdf from "../ExportToPdf";
import MandateTable from "./MandateTable";
// import { useParams } from "react-router-dom";
import { useDataContext } from "../../../Context/DataContext";
// import SubMandateTable from "./SubMandateTable";
import Retail_Transaction from '../Report_Transaction';
// import UfcMandateTable from "./UfcMandateTable";
// import RMMandateTable from "./RMMandateTable";

const TransactionMandateReport = () => {
  const { scheme_details } = Scheme();
  const { asset } = AssetClass();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  // const [selectedStatus, setSelectedStatus] = useState("Live");
  const [showDateFields, setShowDateFields] = useState(false);

  const {
    setRolwiseStype,
    hide,
    fetchmandatereport,
    setHide,
    emproles,
    start_Date,
    end_Date,
    status,
    loading,
    setSelectAsset,
    setScheme,
    setStatus,
    setStart_Date,
    setEnd_Date,
  } = useDataContext();
  const commonReport = emproles;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const togglehide = async () => {
    try {
      await fetchmandatereport("");
      setHide(true);
    } catch (error) {
      setHide(false);
      toast.error("Please fill all the fields");
    }
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (newStartDate > end_Date) {
      toast.error("Start date should be less than end date");
    } else {
      setStart_Date(newStartDate);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (newEndDate < start_Date) {
      toast.error("End date should be greater than start date");
    } else {
      setEnd_Date(newEndDate);
    }
  };

  const handleSType = (e) => {
    const rolwiseStype = e.target.value;
    setRolwiseStype(rolwiseStype);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setStatus(status);
    setShowDateFields(status === "NEW_REG");
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
                        <input type="date" className="form-control mt-2" value={start_Date} onChange={handleStartDateChange}/>
                      </div>
                      <div className="form-group col-md-2">
                        <label className="form-lables-2">
                          <b>End Date</b>
                        </label>
                        <input type="date" className="form-control mt-2" value={end_Date} onChange={handleEndDateChange}/>
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
                          onChange={(e)=>setSelectAsset(e.target.value)}
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
                          //  onChange={(e) => setSelectedStatus(e.target.value)}
                          onChange={handleStatusChange}
                          value={status}
                        >
                          <option value="Live">Live</option>
                          <option value="NEW_REG">New Registration </option>
                          <option value="LIVE_BASE">Live-Base</option>
                          <option value="TERMINATED">Terminated</option>
                          <option value="GROSS_SALE">Gross Sale</option>
                          <option value="FAREWELL">
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
                            id=""
                            className="form-select form-control mt-2"
                            onChange={(e)=>setScheme(e.target.value)}
                          >
                            <option  className="form-label select-label" value="ALL">ALL</option>
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
                          onChange={handleSType}
                        >
                          <option>Choose Stype</option>
                          <option value="SIP">SIP</option>
                          <option value="STP">STP</option>
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
                                onClick={togglehide}
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
                  {loading ? (
                    <div className="text-center mt-4">
                      <i className="fas fa-spinner fa-spin fa-2x"></i>{" "}
                      <LoaderSearch />
                    </div>
                  ) : hide ? (
                  <>
                  {commonReport === "ZH" ||
                              commonReport === "ADMIN" ? (
                                <MandateTable />
                              // ) : commonReport === "RH" ? (
                              //   <SubMandateTable />
                              // ) : commonReport === "CM" ? (
                              //   <UfcMandateTable />
                              // ) : commonReport === "RM" ? (
                              //   <RMMandateTable />
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
      </div>
    </>
  );
};
export default TransactionMandateReport;
