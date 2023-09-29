import React, { useState } from "react";
import "./Table-CSS/RedemptionTable.css";
import SubRedemptionTable from "./SubTable/SubRedemptionTable";
import Loader from "./Loader";

const RedemptionTable = ({
  transaction_summary_report,
  startDate,
  endDate,
  select_type,
  assetClass,
  formatNumberToIndianFormat,
}) => {
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [sortOrder, setSortOrder] = useState({ column: null, order: "asc" });
  const [isLoading, setIsLoading] = useState(false);

  const handleHeaderClick = (column) => {
    const order =
      sortOrder.column === column && sortOrder.order === "asc" ? "desc" : "asc";
    setSortOrder({ column, order });
  };

  let totalEquity = 0;
  let totalHybrid = 0;
  let totalArbitrage = 0;
  let totalPassive = 0;
  let totalFixedIncome = 0;
  let totalCash = 0;
  let grandTotal = 0;

  const sortedData = [...transaction_summary_report].sort((a, b) => {
    const columnA = a[sortOrder.column] || "";
    const columnB = b[sortOrder.column] || "";
    if (sortOrder.order === "asc") {
      if (sortOrder.column === "ZONE") {
        return columnA.localeCompare(columnB);
      } else if (
        sortOrder.column === "REQUITY" ||
        sortOrder.column === "RHYBRID" ||
        sortOrder.column === "RARBITRAGE" ||
        sortOrder.column === "RPASSIVE" ||
        sortOrder.column === "RFIXED_INCOME" ||
        sortOrder.column === "RCASH"
      ) {
        return parseFloat(columnA) - parseFloat(columnB);
      }
    } else if (sortOrder.order === "desc") {
      if (sortOrder.column === "ZONE") {
        return columnB.localeCompare(columnA);
      } else if (
        sortOrder.column === "REQUITY" ||
        sortOrder.column === "RHYBRID" ||
        sortOrder.column === "RARBITRAGE" ||
        sortOrder.column === "RPASSIVE" ||
        sortOrder.column === "RFIXED_INCOME" ||
        sortOrder.column === "RCASH"
      ) {
        return parseFloat(columnB) - parseFloat(columnA);
      }
    }
  });

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
      <div className="head">
        <h4>
          <b>REDEMPTION</b>
        </h4>
        <h5>
          <b className="gray-color">(In Lakhs)</b>
        </h5>
      </div>
      <div className="col-md-3" />
      <div className="col-md-12 p-2">
        <table className="mt-3 table small border" id="table2">
          <thead>
            <tr className="bgcolorBlue text-white">
              <th scope="col" onClick={() => handleHeaderClick("ZONE")}>
                ZONE
              </th>
              <th
                scope="col"
                className="text-end"
                onClick={() => handleHeaderClick("REQUITY")}
              >
                Equity
              </th>
              <th
                scope="col"
                className="text-end"
                onClick={() => handleHeaderClick("RHYBRID")}
              >
                Hybrid
              </th>
              <th
                scope="col"
                className="text-end"
                onClick={() => handleHeaderClick("RARBITRAGE")}
              >
                Arbitrage
              </th>
              <th
                scope="col"
                className="text-end"
                onClick={() => handleHeaderClick("RPASSIVE")}
              >
                Passive(ex-Debt)
              </th>
              <th
                scope="col"
                className="text-end"
                onClick={() => handleHeaderClick("RFIXED_INCOME")}
              >
                Fixed Income
              </th>
              <th
                scope="col"
                className="text-end"
                onClick={() => handleHeaderClick("RCASH")}
              >
                {" "}
                Cash{" "}
              </th>
              <th scope="col" className="text-end">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((summary, index) => {
              // Update the column-wise totals
              totalEquity += parseFloat(summary.REQUITY);
              totalHybrid += parseFloat(summary.RHYBRID);
              totalArbitrage += parseFloat(summary.RARBITRAGE);
              totalPassive += parseFloat(summary.RPASSIVE);
              totalFixedIncome += parseFloat(summary.RFIXED_INCOME);
              totalCash += parseFloat(summary.RCASH);
              grandTotal += parseFloat(summary.RTOTAL);

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
                      {isLoading && <Loader />}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(summary.REQUITY).toFixed(2)
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(summary.RHYBRID).toFixed(2)
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(summary.RARBITRAGE).toFixed(2)
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(summary.RPASSIVE).toFixed(2)
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(summary.RFIXED_INCOME).toFixed(2)
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(summary.RCASH).toFixed(2)
                      )}
                    </td>
                    <td className="text-end" id="total">
                      {formatNumberToIndianFormat(
                        parseFloat(summary.RTOTAL).toFixed(2)
                      )}
                    </td>
                  </tr>
                  {clickedIndex === index && (
                    <tr key={`subtable-${index}`}>
                      <td colSpan="8" className="p-0">
                        <SubRedemptionTable
                          pzone={summary.ZONE}
                          startDate={startDate}
                          endDate={endDate}
                          assetClass={assetClass}
                          select_type={select_type}
                          formatNumberToIndianFormat={
                            formatNumberToIndianFormat
                          }
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
    </div>
  );
};
export default RedemptionTable;
