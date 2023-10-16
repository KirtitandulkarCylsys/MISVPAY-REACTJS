import React, { useState } from "react";
import "./Report_Transaction.css";
import SalesTransaction from "./Transaction_Type/SalesTransaction";
import datetime from "../Assets/images/Vector (Stroke).png";
import SideBar from "../Shared/SideBar/SideBar";
import Navbar from "../Shared/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { Ufc_Drop } from "../Retail/RetailApi/Account_Trans_api";
import { Account_Api } from "../Retail/RetailApi/Account_Api";
import LoaderSearch from "../Table/SubTable/LoaderSearch";
import AccPdfDownload from "./AccPdfDownload";
import { AccExcelDownload } from "./AccExcelDownload";

const TransactionReport = ({ headers }) => {
  const { ufc_details } = Ufc_Drop();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {
    hide,
    startDate,
    endDate,
    transaction_account_report,
    loading,
    transaction_type,
    amount,
    condition,
    no_mapping,
    setTransactionType,
    setEndDate,
    setHide,
    setStartDate,
    setLoading,
    formatNumberToIndianFormat,
    togglehide,
    setAmount,
    setCondition,
    setNoMapping,
    emproles,
  } = Account_Api({ headers });
  const toggleSidebar = () => { setSidebarOpen(!sidebarOpen); };
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (newStartDate > endDate) {
      toast.error("Start date should be less than end date");
    } else {
      setStartDate(newStartDate);
    }
  };
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (newEndDate < startDate) {
      toast.error("End date should be greater than start date");
    } else {
      setEndDate(newEndDate);
    }
  };

  return (
    <div className="container-fluid p-0 home-main ">
      <Navbar onToggle={toggleSidebar} />
      <div className="d-flex">
        <SideBar isOpen={sidebarOpen} />
        <div
          className={` ${sidebarOpen ? "dashboard-closed" : "dashboard-full"
            }`}
        >
          <div className="bg-white card m-4">
            <div className="col-l-12  ">
              <div className=" rounded-lg p-3"></div>
              <button
                className="border-0 w-100 text-left bg-transparent "
                type="button"
              >
                <h5 className="headline">
                  <b>DAYWISE TRANSACTION REPORT</b>
                </h5>
              </button>
              <div>
                <div className="col-lg-12 d-flex justify-content-around mt-5 ">
                  <div className="form-group col-md-2">
                    <label className="form-lables" style={{ marginRight: "5px" }} >
                      <b> A/C No </b>
                    </label>
                    <input type="text" className="form-control mt-2" placeholder="Enter A/C No" />
                  </div>
                  <div className="form-group col-md-2">
                    <label className="form-lables" style={{ marginRight: "5px" }} >
                      <b>PAN No</b>
                    </label>
                    <input type="text" className="form-control mt-2" placeholder="Enter PAN No" />
                  </div>
                  <div className="form-group col-md-2">
                    <label className="form-lables">
                      <b>PIN Code</b>
                    </label>
                    <input type="text" className="form-control mt-2" placeholder="Enter PIN Code" />
                  </div>
                  <div className="form-group col-md-2">
                    <label className="form-lables">
                      <b>ARN No</b>
                    </label>
                    <input type="text" className="form-control mt-2" placeholder="Enter ARN No" />
                  </div>
                  <div className="form-group col-md-2 m-md-0 mt-3">
                    <label className="form-lables">
                      <b>SubARN No</b>
                    </label>
                    <input type="text" className="form-control mt-2" placeholder="Enter SubARN No" />
                  </div>
                  <div />
                </div>
                <div>
                  <div className="col-lg-12 d-flex justify-content-around mt-5 ">
                    <div className="form-group col-md-2">
                      <label className="form-lables" style={{ marginRight: "5px" }} >
                        <b> UFC</b>
                      </label>
                      <select name="" id="ab" className="form-select form-control mt-2" >
                        <option value="">Select</option>
                        {ufc_details.map((item) => (
                          <option>{item.UFC_NAME}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group col-md-2">
                      <label className="form-lables" style={{ marginRight: "5px" }} >
                        <b>Amount</b>
                      </label>
                      <input type="text" className="form-control mt-2" placeholder="Enter Amount" value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <label className="form-lables">
                        <b>Condition</b>
                      </label>
                      <select name="" id="ab" 
                      className="form-select form-control mt-2"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="LESS_THAN">LESS_THAN </option>
                        <option value="GREATER_THAN">GREATER_THAN </option>
                        <option value="EQUAL_TO">EQUAL_TO </option>
                      </select>
                    </div>
                    <div className="form-group col-md-2">
                      <label className="form-lables">
                        <b>KARVY Location</b>
                      </label>
                      <input type="text" className="form-control mt-2" placeholder="Enter KARVY Location" />
                    </div>
                    <div className="form-group col-md-2">
                      <label
                        className="form-lables"
                        style={{ marginRight: "5px" }}
                      >
                        <b> Start Date </b>
                      </label>
                      <img src={datetime} alt="datetime" />
                      <input type="date" className="form-control mt-2" value={startDate} onChange={handleStartDateChange} />
                    </div>
                    <div />
                  </div>
                  <div>
                    <div className="col-lg-12 d-flex justify-content-around mt-5 ">
                      <div className="form-group col-md-2">
                        <label className="form-lables" style={{ marginRight: "5px" }} >
                          <b> End Date </b>
                        </label>
                        <img src={datetime} alt="datetime" />
                        <input type="date" className="form-control mt-2" value={endDate} onChange={handleEndDateChange} />
                      </div>
                      <div className="form-group col-md-2">
                        <label className="form-lables" style={{ marginRight: "5px" }} >
                          <b>Scheme Code</b>
                        </label>
                        <input type="text" className="form-control mt-2" placeholder="Enter Scheme Code" />
                      </div>
                      <div className="form-group col-md-2">
                        <label className="form-lables">
                          <b>RIA Code</b>
                        </label>
                        <input type="text" className="form-control mt-2" placeholder="Enter RIA Code" />
                      </div>
                      <div className="form-group col-md-2">
                        <label className="form-lables">
                          <b>Trans RM Code</b>
                        </label>
                        <input type="text" className="form-control mt-2" placeholder="Enter Trans RM Code" />
                      </div>
                      <div className="form-group col-md-2 m-md-0 mt-3">
                        <label className="form-lables">
                          <b>IHNO</b>
                        </label>
                        <input type="text" className="form-control mt-2" placeholder="Enter IHNO" />
                      </div>
                      <div />
                    </div>
                    <div>
                      <div className="col-lg-12 d-flex justify-content-around mt-5 ">
                        <div className="form-group col-md-2">
                          <label className="form-lables" style={{ marginRight: "5px" }} >
                            <b> Scheme Type </b>
                          </label>
                          <select name="" 
                          id="ab" 
                          className="form-select form-control mt-2"
                          // value={select_type}
                          // onChange={(e) => setSelectType(e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="">ALL </option>
                            <option value="">ARBITRAGE </option>
                            <option value="">CASH </option>
                            <option value="">EQUITY </option>
                            <option value="">FIXED INCOME </option>
                            <option value="">HYBRID </option>
                            <option value="">PASSIVE (EX DEBIT) </option>
                          </select>
                        </div>
                        <div className="form-group col-md-2">
                          <label className="form-lables" style={{ marginRight: "5px" }} >
                            <b>EUIN</b>
                          </label>
                          <input type="text" className="form-control mt-2" placeholder="Enter EUIN" />
                        </div>
                        <div className="form-group col-md-2">
                          <label className="form-lables">
                            <b>Transaction Type</b>
                          </label>
                          <select name="" 
                          id="ab" 
                          className="form-select form-control mt-2"
                           value={transaction_type} 
                           onChange={(e) => setTransactionType(e.target.value)}
                            >
                            <option value="">Select</option>
                            <option value="SALES">SALES</option>
                            <option value="GROSS">Gross Sales </option>
                            <option value="LIVE">Live-SIP/STP </option>
                            <option value="NEW">SIP/STP New Registration </option>
                            <option value="BASE">Live-SIP/STP-Base </option>
                            <option value="">Terminated SIP/STP </option>
                            <option value="FARE">Farewell Login Contest </option>
                            <option value="MATURE">SIP Maturity </option>
                          </select>
                        </div>
                        <div className="form-group col-md-2">
                          <input type="checkbox" className="form-check-input mt-2" />
                          <label className="form-label">
                            <b className="Check">BSF</b>
                          </label>
                        </div>
                        <div className="form-group col-md-2 m-md-0 mt-3">
                          <label className="form-lables">
                            <b>No Mapping</b>
                          </label>
                          <select name="" 
                          id="ab" 
                          className="form-select form-control mt-2"
                          value={no_mapping}
                            onChange={(e) => setNoMapping(e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="All">All </option>
                            <option value="ZONEWISE">ZONEWISE </option>
                            <option value="REGIONWISE">REGIONWISE </option>
                            <option value="UFCWISE">UFCWISE </option>
                            <option value="RMWISE">RMWISE </option>
                          </select>
                        </div>
                        <div />
                      </div>
                      <div className="d-flex">
                        <div className="col-md-4 d-flex justify-content-between "></div>
                        <div className="col-md-4"></div>
                        <div className="col-md-4 d-flex justify-content-around mt-5">
                          <div className="col-md-2 "></div>
                          <div className="col-md-2 ">
                            <p className="icon">
                              <AccExcelDownload />
                              |<AccPdfDownload />
                            </p>
                          </div>
                          <div className="col-md-2 ">
                            <button className="btn Button">
                              <b className="colorwhite" onClick={togglehide}>
                                Search
                              </b>
                            </button>
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
                        ) : (
                          hide && (
                            <div>
                              <SalesTransaction
                                transaction_account_report={transaction_account_report}
                                formatNumberToIndianFormat={formatNumberToIndianFormat}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionReport;
