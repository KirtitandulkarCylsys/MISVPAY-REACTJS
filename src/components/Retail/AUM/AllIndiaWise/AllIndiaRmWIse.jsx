import {React, useState} from 'react'
import { useAllRM } from '../../RetailApi/AUM_Api';
import Navbar from '../../../Shared/Navbar';
import SideBar from '../../../Shared/SideBar/SideBar';
import { useParams } from 'react-router-dom';
import { ExcelToExport } from '../../ExcelToExport';
import ExportToPdf from '../../ExportToPdf';
import { ExportToExcel } from '../ExportToExcel';
import ExportToPDF from '../ExportToPDF';
import LoaderSearch from '../../../Table/LoaderSearch';

const AllIndiaRmWIse = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [clickedIndex, setClickedIndex] = useState(-1);
    const [sidebarOpen, setSidebarOpen] = useState(true);
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
      common_report: "All_RMWISE",
    });
  
    const {aum_AllAumRM,loading} = useAllRM(queryParams);

    const formatNumberToIndianFormat = (number) => {
        if (typeof number !== "number") {
          return number;
        }
    
        const parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      };
      const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };

      function calculateTotalAum() {
        let total = 0;
        aum_AllAumRM.forEach((item) => {
          total += parseFloat(item.TOTAL_AUM);
        });
        return total;
      }
    
      function calculateTotal(columnName) {
        let total = 0;
        aum_AllAumRM.forEach((item) => {
          total += parseFloat(item[columnName]);
        });
        return total;
      }
    
  return (
    <div className="container-fluid p-0 home-main">
    <Navbar onToggle={toggleSidebar} />
        <div className="d-flex">
          <SideBar isOpen={sidebarOpen} />
          <div
            className={` ${
              sidebarOpen ? "dashboard-closed" : "dashboard-full"
            }`}
          >
    <div>  <div className="" id="tablebox">
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
          <div class="col-md-6 col-12 mb-3">
                          <div className="icon">
                            {/* <button onClick={handleExport} className="border-0">
                          <img src={excel} alt="excelicon" />
                        </button> */}
                            <ExportToExcel />
                            | <ExportToPDF />
                          </div>
                        </div>
          {!loading && (
            <table
              className="table table-bordered nested-table active"
              id="table1"
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
                  <th rowSpan="2">RMCODE</th>
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
                {aum_AllAumRM.map((item) => (
                  <tr key={item.SrNo}>
                    <td className="">{item.ZONE}</td>
                    <td className="">{item.REGION_NAME}</td>
                    <td className="">{item.UFC_CODE}</td>
                    <td className="">{item.UFC_NAME}</td>
                    <td className="">{item.RMCODE}</td>
                        <td className="">{item.EMP_NAME}</td>
                    <td className="">{item.TOTAL_AUM}</td>
                    <td className="">{item.EQUITY_AUM}</td>
                    <td className="">{item.HYBRID_AUM}</td>
                    <td className="">{item.ARBITRAGE_AUM}</td>
                    <td className="">{item.PASSIVE_AUM}</td>
                    <td className="">{item.FIXED_INCOME_AUM}</td>
                    <td className="">{item.CASH_AUM}</td>
                  </tr>
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
    </div>
    </div>
  </div></div>
  )
}

export default AllIndiaRmWIse