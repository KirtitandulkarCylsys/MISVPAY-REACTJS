import React, { useState } from "react";

import TableRowWithSales from "../RMWISE/TableRowWithSales";
import Loader from "../../Loader";

const TableRowWithCollapse = ({transaction_summary_report,formatNumberToIndianFormat}) => {
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
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

  let totalEquity = 0;
  let totalHybrid = 0;
  let totalArbitrage = 0;
  let totalPassive = 0;
  let totalFixedIncome = 0;
  let totalCash = 0;
  let grandTotal = 0;

  return (
    <>
      <div className="new-component container-fluid ">
        <table className="mt-3 table nested-table">
          <thead style={{ backgroundColor: "#4C6072", color: "white" }}>
            <tr className="">
              <th scope="col">UFC code</th>
              <th scope="col">UFC</th>
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
                Cash{" "}
              </th>
              <th scope="col" className="text-end">
                Total
              </th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "#8080805c" }}>
            {transaction_summary_report.map((ufc, index) => {
              totalEquity += parseFloat(ufc.SEQUITY);
              totalHybrid += parseFloat(ufc.SHYBRID);
              totalArbitrage += parseFloat(ufc.SARBITRAGE);
              totalPassive += parseFloat(ufc.SPASSIVE);
              totalFixedIncome += parseFloat(ufc.SFIXED_INCOME);
              totalCash += parseFloat(ufc.SCASH);
              grandTotal += parseFloat(ufc.STOTAL);

              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>
                      <button
                        className="textlink"
                        onClick={() => handleButtonClick(index)}
                        disabled={isLoading}
                      >
                        <b className="sharp-font">{ufc.UFC_CODE}</b>
                      </button>
                      {isLoading && (
                        <div className="text-center mt-4">
                          <i className="fas fa-spinner fa-spin fa-2x loder"></i>{" "}
                          <Loader className="loder" />
                        </div>
                      )}
                    </td>
                    <td>{ufc.UFC_NAME}</td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(parseFloat(ufc.SEQUITY))}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(parseFloat(ufc.SHYBRID))}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(parseFloat(ufc.SARBITRAGE))}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(parseFloat(ufc.SPASSIVE))}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(ufc.SFIXED_INCOME)
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(parseFloat(ufc.SCASH))}
                    </td>
                    <td
                      className="text-end"
                      style={{ backgroundColor: "#8080805c" }}
                    >
                      <b>
                        {formatNumberToIndianFormat(parseFloat(ufc.STOTAL))}
                      </b>
                    </td>
                  </tr>
                  {clickedIndex === index && (
                    <tr key={`subtable-${index}`}>
                      <td colSpan="9" className="p-0">
                        {clickedIndex === index && (
                          <TableRowWithSales
transaction_summary_report={transaction_summary_report}
                            formatNumberToIndianFormat={
                              formatNumberToIndianFormat
                            }
                          />
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
            <tr style={{ backgroundColor: "#4C6072", color: "white" }}>
              <td>TOTAL</td>
              <td></td>
              <td className="text-end">
                {formatNumberToIndianFormat(parseFloat(totalEquity.toFixed(2)))}
              </td>
              <td className="text-end">
                {formatNumberToIndianFormat(parseFloat(totalHybrid.toFixed(2)))}
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
                {formatNumberToIndianFormat(parseFloat(totalCash.toFixed(2)))}
              </td>
              <td className="text-end">
                {formatNumberToIndianFormat(parseFloat(grandTotal.toFixed(2)))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableRowWithCollapse;
