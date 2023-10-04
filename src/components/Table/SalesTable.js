import React, { useState } from "react";
import "./Table-CSS/SalesTable.css";
import SubSalesTable from "./SubTable/SubSalesTable";
import Loader from "./Loader";

const SalesTable = ({
  transaction_summary_report,
  formatNumberToIndianFormat,
  startDate,
  endDate,
  select_type,
}) => {
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  let totalEquity = 0;
  let totalHybrid = 0;
  let totalArbitrage = 0;
  let totalPassive = 0;
  let totalFixedIncome = 0;
  let totalCash = 0;
  let grandTotal = 0;

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

  // const headerColumns = ["REGION", "ZONE", "UFC CODE", "RMCODE", "EMP NAME"];

  // const isRegionPresentInData = transaction_summary_report.some(
  //   (summary) => summary.REGION
  // );

  // const isZonePresentInData = transaction_summary_report.some(
  //   (summary) => summary.ZONE
  // );

  // const isUFCPresentInData = transaction_summary_report.some(
  //   (summary) => summary.UFC_CODE
  // );

  // const displayRmCodeColumn = transaction_summary_report.some(
  //   (summary) => summary.RMCODE
  // );
  // const displayEmpNameColumn = transaction_summary_report.some(
  //   (summary) => summary.EMP_NAME
  // );
  // let columnToDisplay = "REGION"; // Default column to display

  // if (isZonePresentInData) {
  //   columnToDisplay = "ZONE";
  // } else if (isUFCPresentInData) {
  //   columnToDisplay = "UFC_CODE";
  // } else if (displayRmCodeColumn && displayEmpNameColumn) {
  //   columnToDisplay = "RMCODE_EMP_NAME"; // Use a single column name for both RMCODE and EMP_NAME
  // }

  // if (!Array.isArray(transaction_summary_report)) {
  //   // Handle the case where transaction_summary_report is not an array
  //   return <p>No data available.</p>;
  // }

  return (
    <>
      <div className="">
        <div>
          <div>
            <div className="row mt-4 mr-4 ">
              <div className="col-md-3 d-flex">
                <h4>
                  <b>SALES</b>
                </h4>
                <h5>
                  <b className="gray-color">(In Lakhs)</b>
                </h5>
              </div>
              <div className="col-md-2 list-group">
                <p className="theader">
                  <button className=" btn textlink">
                    <b>All India Region Wise</b>
                  </button>
                </p>
              </div>
              <div className="col-md-2">
                <p className="theader">
                  <button className=" btn textlink">
                    <b>All India UFC Wise </b>
                  </button>
                </p>
              </div>
              <div className="col-md-2">
                <p className="theader">
                  <button className=" btn textlink">
                    <b>All India RM Wise </b>
                  </button>
                </p>
              </div>
              <div className="col-md-3" />
              <div className="col-md-12 p-3 ">
                <table className="table small border" id="table1">
                  <thead>
                    <tr className="bgcolorBlue text-white">
                      <th scope="col">ZONE</th>
                      {/* {displayEmpNameColumn && (
                        <>
                          <th scope="col">EMP_NAME</th>
                        </>
                      )} */}
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
                    {transaction_summary_report.map((summary, index) => {
                      // const hasZone = summary.hasOwnProperty("ZONE");
                      // const hasRegion = summary.hasOwnProperty("REGION");
                      // const hasUfcCode = summary.hasOwnProperty("UFC_CODE");
                      totalEquity += parseFloat(summary.SEQUITY);
                      totalHybrid += parseFloat(summary.SHYBRID);
                      totalArbitrage += parseFloat(summary.SARBITRAGE);
                      totalPassive += parseFloat(summary.SPASSIVE);
                      totalFixedIncome += parseFloat(summary.SFIXED_INCOME);
                      totalCash += parseFloat(summary.SCASH);
                      grandTotal += parseFloat(summary.STOTAL);

                      return (
                        <React.Fragment key={index}>
                          <tr>
                            <td>
                              <button
                                className="textlink"
                                onClick={() => handleButtonClick(index)}
                                disabled={isLoading}
                              >
                                <b className="sharp-font">
                                  {summary.ZONE}
                                  {/* {hasZone ? summary.ZONE : ""}
                                  {hasRegion ? summary.REGION : ""}
                                  {hasUfcCode ? summary.UFC_CODE : ""}
                                  {displayRmCodeColumn ? summary.RMCODE : ""} */}
                                </b>
                              </button>
                              {isLoading && (
                                <div className="text-center mt-4">
                                  <i className="fas fa-spinner fa-spin fa-2x loder"></i>{" "}
                                  <Loader className="loder" />
                                </div>
                              )}
                            </td>
                            {/* {displayEmpNameColumn && (
                              <td className="">{summary.EMP_NAME}</td>
                            )} */}
                            <td className="text-end">
                              {formatNumberToIndianFormat(
                                parseFloat(summary.SEQUITY)
                              )}
                            </td>
                            <td className="text-end">
                              {formatNumberToIndianFormat(
                                parseFloat(summary.SHYBRID)
                              )}
                            </td>
                            <td className="text-end">
                              {formatNumberToIndianFormat(
                                parseFloat(summary.SARBITRAGE)
                              )}
                            </td>
                            <td className="text-end">
                              {formatNumberToIndianFormat(
                                parseFloat(summary.SPASSIVE)
                              )}
                            </td>
                            <td className="text-end">
                              {formatNumberToIndianFormat(
                                parseFloat(summary.SFIXED_INCOME)
                              )}
                            </td>
                            <td className="text-end">
                              {formatNumberToIndianFormat(
                                parseFloat(summary.SCASH)
                              )}
                            </td>
                            <td className="text-end color-biege" id="total">
                              {formatNumberToIndianFormat(
                                parseFloat(summary.STOTAL)
                              )}
                            </td>
                          </tr>
                          {clickedIndex === index && (
                            <tr key={`subtable-${index}`}>
                              <td colSpan="8" className="p-0">
                                <SubSalesTable
                                  transaction_summary_report={
                                    transaction_summary_report
                                  }
                                  formatNumberToIndianFormat={
                                    formatNumberToIndianFormat
                                  }
                                  startDate={startDate}
                                  endDate={endDate}
                                  select_type={select_type}
                                  zone= {summary.ZONE}
                                />
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                    <tr className="bgcolorBlue text-white">
                      <td>TOTAL</td>
                      {/* {displayRmCodeColumn && (
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      )} */}

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesTable;
