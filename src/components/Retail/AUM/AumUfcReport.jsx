import React, { useMemo, useState } from "react";
import "./AumUfcReport.css";
import Navbar from "../../Shared/Navbar";
import SideBar from "../../Shared/SideBar/SideBar";
import { UfcApi, useUfc } from "../RetailApi/AUM_Api";
import ExportToPDF from "./ExportToPDF";
import excel from "../../Assets/images/excel_icon.png";
import { ExportToExcel } from "./ExportToExcel";
import { Link, useParams } from "react-router-dom";
import Loader from "../../Table/Loader";
import AumRmReport from "./AumRmReport";
import LoaderSearch from "../../Table/LoaderSearch";
const AumUfcReport = ({
  report_period,
  region_code,
  formatNumberToIndianFormat,
  aum_period
}) => {
  const queryParams = new URLSearchParams({
    empid: "1234",
    emprole: "ADMIN",
    quarter: "202324Q2",
    period_code: report_period,
    zone: "",
    region_code: region_code,
    ufc_code: "nill",
    rm_code: "nill",
    chn_code: "",
    common_report: "INT_REGIONWISE",
  });

  const { aumUfc, loading } =  UfcApi(queryParams);
  console.log(aumUfc,"data")
  let showdata = [];
  if (aumUfc && aumUfc.toString().length > 0) {
    showdata = aumUfc;
  } else if (aum_period && aum_period.toString().length > 0) {
    showdata = aum_period;
  }

  const [clickedIndex, setClickedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);


  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleExport = () => {
    ExportToExcel(aumUfc, "UFC report");
  };

  function calculateTotalAum() {
    let total = 0;
    showdata.forEach((item) => {
      total += parseFloat(item.TOTAL_AUM);
    });
    return total;
  }

  function calculateTotal(columnName) {
    let total = 0;
    showdata.forEach((item) => {
      total += parseFloat(item[columnName]);
    });
    return total;
  }

  const handleButtonClick = (index) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    if (index === clickedIndex) {
      setClickedIndex(-1);
    } else {
      setClickedIndex(index);
    }
  };

  return (
    <>
      <div className="" id="tablebox">
        <div className="d-flex col-md-12">
          <div className="card mt-2 " style={{ borderRadius: "10px" }}>
            <div className="">
              {loading ? (
                <div>
                  <LoaderSearch />
                </div>
              ) : (
                <div className=" " style={{ paddingLeft: "10px" }}>
                  <div
                    className=" d-flex"
                    // style={{ paddingLeft: "10px", paddingBottom: "10px" }}
                  >
                    {/* <div className="col-md-3 ">
                      <h4>
                        <b>{region_code}</b>
                      </h4>
                      <h5>
                        <b className="gray-color">(In Lakhs)</b>
                      </h5>
                    </div> */}
                    {/* <div className="col-md-2 list-group">
                      <p className="theader">
                        <b>All India Region Wise</b>
                      </p>
                    </div>
                    <div className="col-md-2">
                      <p className="theader">
                        <b>All India UFC Wise </b>
                      </p>
                    </div>
                    <div className="col-md-2">
                      <p className="theader">
                        <b>All India RM Wise </b>
                      </p>
                    </div> */}
                  </div>
                </div>
              )}
              {!loading && (
                <table
                  className="table table-bordered nested-table active"
                  id="table3"
                >
                  <thead
                    className="Bgcolor "
                    style={{ backgroundColor: "#4C6072", color: "white" }}
                  >
                    <tr className="mid">
                      <th rowSpan="2">Zone</th>
                      <th rowSpan="2">Region</th>
                      
                      <th rowSpan="2">UFC Code</th>
                      <th rowSpan="2">UFC</th>
                      
                      <th rowSpan="2">Employee Name</th>
                      <th rowSpan="2">Total AUM</th>
                      <th colSpan="6">AUM</th>
                    </tr>
                    <tr>
                      <th className="">Equity</th>
                      <th className="">Hybrid</th>
                      <th className="">Arbitrage</th>
                      <th className="">Passive(ex-Debt)</th>
                      <th className="">Fixed Income</th>
                      <th className="">Cash</th>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: "#8080805c" }}>
                    {showdata.map((item,index) => (
                       <React.Fragment>
                      <tr key={item.SrNo}>
                        <td className="">{item.ZONE}</td>
                        <td className="">{item.REGION_NAME}</td>
                       
                        
                      <button
                        className="textlink"
                        onClick={() => handleButtonClick(index)}
                        disabled={loading}
                      >
                        {item.UFC_CODE}
                      </button>
                      {isLoading && (
                        <div className="text-center mt-4">
                          <i className="fas fa-spinner fa-spin fa-2x loder"></i>{" "}
                          {/* <Loader className="loder" /> */}
                        </div>
                      )}
                        <td className="">{item.UFC_NAME}</td>
                       
                        <td className="">{item.EMP_NAME}</td>
                        <td className="">{item.TOTAL_AUM}</td>
                        <td className="">{item.EQUITY_AUM}</td>
                        <td className="">{item.HYBRID_AUM}</td>
                        <td className="">{item.ARBITRAGE_AUM}</td>
                        <td className="">{item.PASSIVE_AUM}</td>
                        <td className="">{item.FIXED_INCOME_AUM}</td>
                        <td className="">{item.CASH_AUM}</td>

                      </tr>  {clickedIndex === index && (
                    <tr key={`subtable-${index}`}>
                      <td colSpan="12" className="">
                        <AumRmReport
                          ufc_code= {item.UFC_CODE}
                          report_period={report_period}
                          formatNumberToIndianFormat={
                            formatNumberToIndianFormat
                          }
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
                  ))}
                    <tr style={{ backgroundColor: "#4C6072", color: "white" }}>
                      <td colSpan="5">Total</td>
                      <td className="">
                        {formatNumberToIndianFormat(
                          calculateTotalAum().toFixed(2)
                        )}
                      </td>
                      <td className="">
                        {formatNumberToIndianFormat(
                          calculateTotal("EQUITY_AUM").toFixed(2)
                        )}
                      </td>
                      <td className="">
                        {formatNumberToIndianFormat(
                          calculateTotal("HYBRID_AUM").toFixed(2)
                        )}
                      </td>
                      <td className="">
                        {formatNumberToIndianFormat(
                          calculateTotal("ARBITRAGE_AUM").toFixed(2)
                        )}
                      </td>
                      <td className="">
                        {formatNumberToIndianFormat(
                          calculateTotal("PASSIVE_AUM").toFixed(2)
                        )}
                      </td>
                      <td className="">
                        {formatNumberToIndianFormat(
                          calculateTotal("FIXED_INCOME_AUM").toFixed(2)
                        )}
                      </td>
                      <td className="">
                        {formatNumberToIndianFormat(
                          calculateTotal("CASH_AUM").toFixed(2)
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AumUfcReport;
