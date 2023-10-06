import React, { useState } from "react";
import "./Table-CSS/SalesTable.css";
import SubSalesTable from "./SubTable/SubSalesTable";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";

const SalesTable = ({
  transaction_summary_report,
  formatNumberToIndianFormat,
  startDate,
  endDate,
  select_type,
}) => {
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
                  <Link className="btn textlink" to ={`/RegionWiseSales/${select_type}`}>
                    <b>All India Region Wise</b>
                  </Link>
                </p>
              </div>
              <div className="col-md-2">
                <p className="theader">
                <Link className="btn textlink" to ={`/UfcWise/${select_type}`}>
                    <b>All India UFC Wise </b>
                  </Link>
                </p>
              </div>
              <div className="col-md-2">
                <p className="theader">
                  <Link className=" btn textlink" to={`/RmWise/${select_type}`}>
                    <b>All India RM Wise </b>
                  </Link>
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
                                <b className="sharp-font">{summary.ZONE}</b>
                              </button>
                              {isLoading && (
                                <div className="text-center mt-4">
                                  <i className="fas fa-spinner fa-spin fa-2x loder"></i>{" "}
                                  <Loader className="loder" />
                                </div>
                              )}
                            </td>
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
                                  zone={summary.ZONE}
                                />
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                    <tr className="bgcolorBlue text-white">
                      <td>TOTAL</td>
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
