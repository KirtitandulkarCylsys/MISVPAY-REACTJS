import React, { useMemo, useState } from "react";
import Navbar from "../../Shared/Navbar";
import SideBar from "../../Shared/SideBar/SideBar";
import ExportToPDF from "../../Retail/AUM/ExportToPDF";
import excel from "../../Assets/images/excel_icon.png";
import { useRMApi } from "../../Retail/RetailApi/Link_api";
import { Link, useParams } from "react-router-dom";
import RmWiseNetsales from "./RmWiseNetsales";
import RmWiseRedemption from "./RmWiseRedemption";
import { ExportPdfRegion } from "./ExportPdfRegion";
import { ExportExcelRM } from "./ExportExcel";

const RmWise = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { startDate, endDate, select_type } = useParams();
  const formattedStartDate = startDate.split("-").reverse().join("/");
  const formattedEndDate = endDate.split("-").reverse().join("/");
  const queryParams = useMemo(() => {
    return {
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      select_type: select_type,
    };
  }, [formattedStartDate, formattedEndDate, select_type]);

  const queryParamsString = new URLSearchParams(queryParams).toString();
  const { rm, loading } = useRMApi(queryParamsString);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  let totalEquity = 0;
  let totalHybrid = 0;
  let totalArbitrage = 0;
  let totalPassive = 0;
  let totalFixedIncome = 0;
  let totalCash = 0;
  let grandTotal = 0;

  const formatNumberToIndianFormat = (number) => {
    if (typeof number !== "number") {
      return number;
    }

    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  return (
    <div className="new-component container-fluid">
      <Navbar onToggle={toggleSidebar} />
      <div className="d-flex">
        <SideBar isOpen={sidebarOpen} />
        <div
          className={` ${sidebarOpen ? "dashboard-closed" : "dashboard-full"}`}
        >
          <div className="bg-white card m-4" style={{ borderRadius: "10px" }}>
            <div className="col-md-12">
              <div className="row mt-2 bg-white">
                <div className="head">
                  <h4>
                    <b className="black-color">All India RM Wise</b>
                  </h4>
                  <h5>
                    <b className="gray-color">(In Lakhs)</b>
                  </h5>
                </div>
                <div
                  className="col-md-12 d-flex justify-content-between "
                  style={{ marginTop: "30px" }}
                >
                  <Link
                    to="/Transaction"
                    className="btn"
                    style={{
                      backgroundColor: "rgb(58 94 147 / 98%)",
                      color: "white",
                      height: "fit-content",
                    }}
                  >
                    back
                  </Link>
                  <p className="icon">
                  <ExportExcelRM/>
                    |
                    <ExportPdfRegion />
                  </p>
                </div>
              </div>
              <table className="mt-3 table active" id="rm1" style={{ fontSize: 14 }}>
                <thead
                  style={{
                    backgroundColor: "rgb(58 94 147 / 98%)",
                    color: "white",
                  }}
                >
                  <tr>
                    <th scope="col">UFC Code</th>
                    <th scope="col">UFC NAME</th>
                    <th scope="col">RM CODE</th>
                    <th scope="col">RM NAME</th>
                    <th scope="col">FUNCROLE</th>
                    <th scope="col" className="text-end">
                      Equity
                    </th>
                    <th scope="col" className="text-end">
                      Hybrid
                    </th>
                    <th scope="col" className="text-end">
                      Arbitrage
                    </th>
                    <th scope="col" className="text-end">
                      Passive(ex-Debt)
                    </th>
                    <th scope="col" className="text-end">
                      Fixed Income
                    </th>
                    <th scope="col" className="text-end">
                      Cash
                    </th>
                    <th scope="col" className="text-end">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rm.map((rm, index) => {
                    totalEquity += parseFloat(rm.SEQUITY);
                    totalHybrid += parseFloat(rm.SHYBRID);
                    totalArbitrage += parseFloat(rm.SARBITRAGE);
                    totalPassive += parseFloat(rm.SPASSIVE);
                    totalFixedIncome += parseFloat(rm.SFIXED_INCOME);
                    totalCash += parseFloat(rm.SCASH);
                    grandTotal += parseFloat(rm.STOTAL);
                    return (
                      <tr key={index}>
                        <td>{rm.UFC_CODE}</td>
                        <td>{rm.UFC_NAME}</td>
                        <td>{rm.RMCODE}</td>
                        <td>{rm.RMNAME}</td>
                        <td>{rm.FUNCROLE}</td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(rm.REQUITY).toFixed(2)
                          )}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(rm.RHYBRID).toFixed(2)
                          )}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(rm.RARBITRAGE).toFixed(2)
                          )}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(rm.RPASSIVE).toFixed(2)
                          )}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(rm.RFIXED_INCOME).toFixed(2)
                          )}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(rm.RCASH).toFixed(2)
                          )}
                        </td>
                        <td className="text-end" id="total">
                          {formatNumberToIndianFormat(
                            parseFloat(rm.RTOTAL).toFixed(2)
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  <tr
                    style={{
                      backgroundColor: "rgb(58 94 147 / 98%)",
                      color: "white",
                    }}
                  >
                    <td>TOTAL</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(totalEquity.toFixed(2))
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(totalHybrid.toFixed(2))
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(totalArbitrage.toFixed(2))
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(totalPassive.toFixed(2))
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(totalFixedIncome.toFixed(2))
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(totalCash.toFixed(2))
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(grandTotal.toFixed(2))
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <RmWiseNetsales
                formatNumberToIndianFormat={formatNumberToIndianFormat}
                rm={rm}
                loading={loading}
              />
              <RmWiseRedemption
                formatNumberToIndianFormat={formatNumberToIndianFormat}
                rm={rm}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RmWise;
