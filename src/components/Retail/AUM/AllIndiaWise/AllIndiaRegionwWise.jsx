import {React, useState} from "react";
import { useAllRegion } from "../../RetailApi/AUM_Api";
import Loader from "../../../Table/Loader";
import { useParams } from "react-router-dom";
import Navbar from "../../../Shared/Navbar";
import SideBar from "../../../Shared/SideBar/SideBar";
import { ExcelToExport } from "../../ExcelToExport";
import ExportToPdf from "../../ExportToPdf";

const AllIndiaRegionwWise = ( ) => {
  const {report_period}= useParams();
  const queryParams = new URLSearchParams({
    empid: "1234",
    emprole: "ADMIN",
    quarter: "202324Q2",
    period_code: report_period,
    zone: "",
    region: "",
    ufc: "",
    rm: "nill",
    common_report: "ALL_REGIONWISE",
  });
var showdata
  const { aum_AllAumRegion, loading } = useAllRegion(queryParams);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  function calculateTotalAum() {
    let total = 0;
    if (aum_AllAumRegion && Array.isArray(aum_AllAumRegion)) {
      aum_AllAumRegion.forEach((item) => {
        total += parseFloat(item.TOTAL_AUM);
      });
    }
    return total;
  }
  
  function calculateTotal(columnName) {
    let total = 0;
    if (aum_AllAumRegion && Array.isArray(aum_AllAumRegion)) {
      aum_AllAumRegion.forEach((item) => {
        total += parseFloat(item[columnName]);
      });
    }
    return total;
  }
const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
const formatNumberToIndianFormat = (number) => {
    if (typeof number !== "number") {
      return number;
    }

    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };
  
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
     
    <div className="container-fluid p-0 home-main">
    <Navbar onToggle={toggleSidebar} />
        <div className="d-flex">
          <SideBar isOpen={sidebarOpen} />
          <div
            className={` ${
              sidebarOpen ? "dashboard-closed" : "dashboard-full"
            }`}
          >
      <div className="container">
        <div className="row mt-2 ">
          <div className="head">
            <h4>
              <b className="black-color">All India Regionwise</b>
            </h4>
            <h5>
              <b className="gray-color">(In Lakhs)</b>
            </h5>
          </div>
          <div class="col-md-6 col-12 mb-3">
                          <div className="icon">
                            {/* <button onClick={handleExport} className="border-0">
                          <img src={excel} alt="excelicon" />
                        </button> */}
                            <ExcelToExport />
                            | <ExportToPdf />
                          </div>
                        </div>
          <table
            className="table table-bordered active nested-table"
            id="table2"
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
              {aum_AllAumRegion.map((item, index) => (
                  <tr key={item.SrNo}>
                    <td>{item.ZONE}</td>
                    <td>
                      <button
                        className="textlink"
                        // onClick={() => handleButtonClick(index)}
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
              ))}
              <tr className="totalhead">
                <td colSpan="3">Total</td>
                <td className="totalheaad">
                  {formatNumberToIndianFormat(calculateTotalAum().toFixed(2))}
                </td>
                <td className="totalheaad">
                  {formatNumberToIndianFormat(
                    calculateTotal("EQUITY_AUM").toFixed(2)
                  )}
                </td>
                <td className="totalheaad">
                  {formatNumberToIndianFormat(
                    calculateTotal("HYBRID_AUM").toFixed(2)
                  )}
                </td>
                <td className="totalheaad">
                  {formatNumberToIndianFormat(
                    calculateTotal("ARBITRAGE_AUM").toFixed(2)
                  )}
                </td>
                <td className="totalheaad">
                  {formatNumberToIndianFormat(
                    calculateTotal("PASSIVE_AUM").toFixed(2)
                  )}
                </td>
                <td className="totalheaad">
                  {formatNumberToIndianFormat(
                    calculateTotal("FIXED_INCOME_AUM").toFixed(2)
                  )}
                </td>
                <td className="totalheaad">
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
    </div>
    </div>
    </>
  );
};

export default AllIndiaRegionwWise;
