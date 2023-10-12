import React, { useMemo, useState } from "react";
import "./AumRegionReport.css";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../Shared/SideBar/SideBar";
import Navbar from "../../Shared/Navbar";
import { useAUMApi, usePeriodApi } from "../RetailApi/AUM_Api";
import excel from "../../Assets/images/excel_icon.png";
import { ExportToExcel } from "./ExportToExcel";
import { ExcelToExport } from "../ExcelToExport";

import LoaderSearch from "../../Table/SubTable/LoaderSearch";
import AumUfcReport from "./AumUfcReport";
import Loader from "../../Table/Loader";

const AumRegionReport = ({
  report_period,
  zone,
  formatNumberToIndianFormat,aum_period
}) => {
  
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  let queryParams = new URLSearchParams({
    empid: "1234",
    emprole: "ADMIN",
    quarter: "202324Q2",
    period_code: report_period,
    zone: zone,
    region_code: "",
    ufc_code: "nill",
    rm_code: "nill",
    chn_code: "",
    common_report: 'INT_ZONEWISE'
  });

  const { aum_regions,loading } = useAUMApi(queryParams);
  let showdata = [];
  if (aum_regions && aum_regions.toString().length > 0) {
    showdata = aum_regions;
  } else if (aum_period && aum_period.toString().length > 0) {
    showdata = aum_period;
  }
  
  

  function calculateTotalAum() {
    let total = 0;
    if (showdata && Array.isArray(showdata)) {
      showdata.forEach((item) => {
        total += parseFloat(item.TOTAL_AUM);
      });
    }
    return total;
  }
  
  function calculateTotal(columnName) {
    let total = 0;
    if (showdata && Array.isArray(showdata)) {
      showdata.forEach((item) => {
        total += parseFloat(item[columnName]);
      });
    }
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
    <div>
      <div className="container">
        <div className="row mt-2 ">
          <div className="head">
            <h4>
              <b className="black-color"> {zone}</b>
            </h4>
            <h5>
              <b className="gray-color">(In Lakhs)</b>
            </h5>
          </div>

          <table
            className="table table-bordered active nested-table"
            id="table1"
          >
            <thead className="bgcolorBlue text-white mainhead">
              <tr className="mid">
                <th rowSpan="2" className="headtable">
                  Zone
                </th>
                <th rowSpan="2" className="headtable">
                  Region code
                </th>
                <th rowSpan="2" className="headtable">
                  Region Name
                </th>
                <th rowSpan="2" className="headtable">
                  Total AUM
                </th>
                <th colSpan="6">AUM</th>
              </tr>
              <tr>
                <th className="">Equity</th>
                <th className="">Hybrid</th>
                <th className="">Arbitrage</th>
                <th className="">Passive</th>
                <th className="">Fixed Income</th>
                <th className="">Cash</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "#DADADA" }}>
              {showdata.map((item, index) => (
                <React.Fragment>
                  <tr key={item.SrNo}>
                    <td>{item.ZONE}</td>
                    <td>
                      <button
                        className="textlink"
                        onClick={() => handleButtonClick(index)}
                        disabled={loading}
                      >
                        {item.REGION_CODE}
                      </button>
                      {isLoading && (
                        <div className="text-center mt-4">
                          <i className="fas fa-spinner fa-spin fa-2x loder"></i>{" "}
                          <Loader className="loder" />
                        </div>
                      )}
                    </td>
                    <td>{item.REGION_NAME}</td>
                    <td className="">
                      {formatNumberToIndianFormat(parseFloat(item.TOTAL_AUM))}
                    </td>
                    <td className="">
                      {formatNumberToIndianFormat(parseFloat(item.EQUITY_AUM))}
                    </td>
                    <td className="">
                      {formatNumberToIndianFormat(parseFloat(item.HYBRID_AUM))}
                    </td>
                    <td className="">
                      {formatNumberToIndianFormat(
                        parseFloat(item.ARBITRAGE_AUM)
                      )}
                    </td>
                    <td className="">
                      {formatNumberToIndianFormat(parseFloat(item.PASSIVE_AUM))}
                    </td>
                    <td className="">
                      {formatNumberToIndianFormat(
                        parseFloat(item.FIXED_INCOME_AUM)
                      )}
                    </td>
                    <td className="">
                      {formatNumberToIndianFormat(parseFloat(item.CASH_AUM))}
                    </td>
                  </tr>
                  {clickedIndex === index && (
                    <tr key={`subtable-${index}`}>
                      <td colSpan="10" className="">
                        <AumUfcReport
                          region_code= {item.REGION_CODE}
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
              <tr className="totalhead" >
                <td colSpan="3">Total</td>
                <td className="totalhead" >
                  {formatNumberToIndianFormat(calculateTotalAum().toFixed(2))}
                </td>
                <td className="totalhead">
                  {formatNumberToIndianFormat(
                    calculateTotal("EQUITY_AUM").toFixed(2)
                  )}
                </td>
                <td className="totalhead">
                  {formatNumberToIndianFormat(
                    calculateTotal("HYBRID_AUM").toFixed(2)
                  )}
                </td>
                <td className="totalhead">
                  {formatNumberToIndianFormat(
                    calculateTotal("ARBITRAGE_AUM").toFixed(2)
                  )}
                </td>
                <td className="totalhead">
                  {formatNumberToIndianFormat(
                    calculateTotal("PASSIVE_AUM").toFixed(2)
                  )}
                </td>
                <td className="totalhead">
                  {formatNumberToIndianFormat(
                    calculateTotal("FIXED_INCOME_AUM").toFixed(2)
                  )}
                </td>
                <td className="totalhead">
                  {formatNumberToIndianFormat(
                    calculateTotal("CASH_AUM").toFixed(2)
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AumRegionReport;
