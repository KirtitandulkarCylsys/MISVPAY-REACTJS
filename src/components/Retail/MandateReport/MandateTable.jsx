import React, { useState } from "react";
import "./MandateTable.css";
import SubMandateTable from "./SubMandateTable";
import Loader from "../../Table/Loader";
import { Link } from "react-router-dom";

const MandateTable = ({
//   transaction_summary_report,
//   startDate,
//   endDate,
//   select_type,
//   assetClass,
//   formatNumberToIndianFormat,
}) => {
//   const [clickedIndex, setClickedIndex] = useState(-1);
//   const [sortOrder, setSortOrder] = useState({ column: null, order: "asc" });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleHeaderClick = (column) => {
//     const order =
//       sortOrder.column === column && sortOrder.order === "asc" ? "desc" : "asc";
//     setSortOrder({ column, order });
//   };

//   const sortedData = [...transaction_summary_report].sort((a, b) => {
//     const columnA = a[sortOrder.column] || "";
//     const columnB = b[sortOrder.column] || "";
//     if (sortOrder.order === "asc") {
//       if (sortOrder.column === "ZONE") {
//         return columnA.localeCompare(columnB);
//       } else if (
//         sortOrder.column === "SEQUITY" ||
//         sortOrder.column === "SHYBRID" ||
//         sortOrder.column === "SARBITRAGE" ||
//         sortOrder.column === "SPASSIVE" ||
//         sortOrder.column === "SFIXED_INCOME" ||
//         sortOrder.column === "SCASH"
//       ) {
//         return parseFloat(columnA) - parseFloat(columnB);
//       }
//     } else if (sortOrder.order === "desc") {
//       if (sortOrder.column === "ZONE") {
//         return columnB.localeCompare(columnA);
//       } else if (
//         sortOrder.column === "SEQUITY" ||
//         sortOrder.column === "SHYBRID" ||
//         sortOrder.column === "SARBITRAGE" ||
//         sortOrder.column === "SPASSIVE" ||
//         sortOrder.column === "SFIXED_INCOME" ||
//         sortOrder.column === "SCASH"
//       ) {
//         return parseFloat(columnB) - parseFloat(columnA);
//       }
//     }
//   });

//   const handleButtonClick = (index) => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);
//     if (index === clickedIndex) {
//       setClickedIndex(-1);
//     } else {
//       setClickedIndex(index);
//     }
//   };

  return (
    <>
      <div className="container-fluid">
        <div className="">
          <div>
            <div>
              <div className="row mt-6 mr-4 ">
                <div className="col-md-6 d-flex">
                  <h4>
                    <b>Transaction Mandate Report</b>
                  </h4>
                  <h5>
                    <b className="gray-color">(In Lakhs)</b>
                  </h5>
                </div>
                <div className="col-md-3" />
                <div className="col-md-12">
                  <table className="table table-bordered " id="table1">
                    <thead className="bgcolorBlue text-white mainhead">
                      <tr className="mid">
                        <th rowSpan="2"
                           className="headtable"
                        //   onClick={() => handleHeaderClick("ZONE")}
                        >
                          ZONE
                        </th>
                        <th rowSpan="2"
                           className="headtable"
                        //   onClick={() => handleHeaderClick("TYPE")}
                        >
                          Transaction Type
                        </th>
                        <th colSpan="8">SIP A/C</th>
                        </tr>
                        <tr>
                        <th
                          
                          className="forright"
                        //   onClick={() => handleHeaderClick("SEQUITY")}
                        >
                          Equity
                        </th>
                        <th
                          
                          className="forright"
                        //   onClick={() => handleHeaderClick("SHYBRID")}
                        >
                          Hybrid
                        </th>
                        <th
                          
                          className="forright"
                        //   onClick={() => handleHeaderClick("SARBITRAGE")}
                        >
                          Arbitrage
                        </th>
                        <th
                          
                          className="forright"
                        //   onClick={() => handleHeaderClick("SPASSIVE")}
                        >
                          Passive(ex-Debt)
                        </th>
                        <th
                          
                          className="forright"
                        //   onClick={() => handleHeaderClick("SFIXED_INCOME")}
                        >
                          Fixed Income
                        </th>
                        <th
                          
                          className="forright"
                        //   onClick={() => handleHeaderClick("SCASH")}
                        >
                          {" "}
                          Cash{" "}
                        </th>
                        <th  className="forright">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {sortedData.map((summary, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td>
                              <button
                                className="textlink"
                                onClick={() => handleButtonClick(index)}
                                disabled={isLoading}
                              >
                                <b className="sharp-font">{summary.ZONE}</b>
                              </button>
                              {isLoading && (
                                <div className="text-center mt-4">
                                  <i className="fas fa-spinner fa-spin fa-2x loder"></i>{" "}
                                  <Loader className="loder" />
                                </div>
                              )}
                            </td>
                            <td className="forright">
                              {formatNumberToIndianFormat(
                                parseFloat(summary.SEQUITY)
                              )}
                            </td>
                            <td className="forright">
                              {formatNumberToIndianFormat(
                                parseFloat(summary.SHYBRID)
                              )}
                            </td>
                            <td className="forright">
                              {formatNumberToIndianFormat(
                                parseFloat(summary.SARBITRAGE)
                              )}
                            </td>
                            <td className="forright">
                              {formatNumberToIndianFormat(
                                parseFloat(summary.SPASSIVE)
                              )}
                            </td>
                            <td className="forright">
                              {formatNumberToIndianFormat(
                                parseFloat(summary.SFIXED_INCOME)
                              )}
                            </td>
                            <td className="forright">
                              {formatNumberToIndianFormat(
                                parseFloat(summary.SCASH)
                              )}
                            </td>
                            <td className="forright color-biege" id="total">
                              {formatNumberToIndianFormat(
                                parseFloat(summary.STOTAL)
                              )}
                            </td>
                          </tr> */}
                          {/* {clickedIndex === index && (
                            <tr key={`subtable-${index}`}>
                          <td colSpan="8" className="p-0"> */}
                                 {/* <SubMandateTable
                                    // {/* pzone={summary.ZONE} */}
                                    {/* startDate={startDate} */}
                                    {/* endDate={endDate} */}
                                    {/* assetClass={assetClass} */}
                                    {/* select_type={select_type} */}
                                    {/* formatNumberToIndianFormat={ */}
                                      {/* // formatNumberToIndianFormat */}
                                    {/* //  } */}
                                {/* />  */}
                              {/* </td> */}
                            {/* </tr> */}
                          {/* )}  */}
                         {/* </React.Fragment>  */}
                      {/* ))}   */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MandateTable;
