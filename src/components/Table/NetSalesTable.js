import React, { useState } from "react";
import SubNetSalesTable from "./SubTable/SubNetSalesTable";
import Loader from "./Loader";

const NetSalesTable = ({
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

  let totalEquity = 0;
  let totalHybrid = 0;
  let totalArbitrage = 0;
  let totalPassive = 0;
  let totalFixedIncome = 0;
  let totalCash = 0;
  let grandTotal = 0;

  const handleHeaderClick = (column) => {
    const order =
      sortOrder.column === column && sortOrder.order === "asc" ? "desc" : "asc";
    setSortOrder({ column, order });
  };

  const sortedData = [...transaction_summary_report].sort((a, b) => {
    const columnA = a[sortOrder.column] || "";
    const columnB = b[sortOrder.column] || "";
    if (sortOrder.order === "asc") {
      if (sortOrder.column === "ZONE") {
        return columnA.localeCompare(columnB);
      } else if (
        sortOrder.column === "NEQUITY" ||
        sortOrder.column === "NHYBRID" ||
        sortOrder.column === "NARBITRAGE" ||
        sortOrder.column === "NPASSIVE" ||
        sortOrder.column === "NFIXED_INCOME" ||
        sortOrder.column === "NCASH"
      ) {
        return parseFloat(columnA) - parseFloat(columnB);
      }
    } else if (sortOrder.order === "desc") {
      if (sortOrder.column === "ZONE") {
        return columnB.localeCompare(columnA);
      } else if (
        sortOrder.column === "NEQUITY" ||
        sortOrder.column === "NHYBRID" ||
        sortOrder.column === "NARBITRAGE" ||
        sortOrder.column === "NPASSIVE" ||
        sortOrder.column === "NFIXED_INCOME" ||
        sortOrder.column === "NCASH"
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
    <div className="new-component">
      <div className="head">
        <h4>
          <b>NET SALES</b>
        </h4>
        <h5>
          <b className="gray-color">(In Lakhs)</b>
        </h5>
      </div>
      <div className="col-md-3" />
      <div className="col-md-12 p-2">
        <table className="mt-3 table small border" id="table3">
          <thead>
            <tr className="bgcolorBlue text-white">
              <th scope="col" onClick={() => handleHeaderClick("ZONE")}>
                ZONE
              </th>
              <th
                scope="col"
                className="text-end"
                onClick={() => handleHeaderClick("NEQUITY")}
              >
                Equity
              </th>
              <th
                scope="col"
                className="text-end"
                onClick={() => handleHeaderClick("NHYBRID")}
              >
                Hybrid
              </th>
              <th
                scope="col"
                className="text-end"
                onClick={() => handleHeaderClick("NARBITRAGE")}
              >
                Arbitrage
              </th>
              <th
                scope="col"
                className="text-end"
                onClick={() => handleHeaderClick("NPASSIVE")}
              >
                Passive(ex-Debt)
              </th>
              <th
                scope="col"
                className="text-end"
                onClick={() => handleHeaderClick("NFIXED_INCOME")}
              >
                Fixed Income
              </th>
              <th
                scope="col"
                className="text-end"
                onClick={() => handleHeaderClick("NCASH")}
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
            {transaction_summary_report.map((summary, index) => {
              totalEquity += parseFloat(summary.NEQUITY);
              totalHybrid += parseFloat(summary.NHYBRID);
              totalArbitrage += parseFloat(summary.NARBITRAGE);
              totalPassive += parseFloat(summary.NPASSIVE);
              totalFixedIncome += parseFloat(summary.NFIXED_INCOME);
              totalCash += parseFloat(summary.NCASH);
              grandTotal += parseFloat(summary.NTOTAL);
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
                      {formatNumberToIndianFormat(parseFloat(summary.NEQUITY))}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(parseFloat(summary.NHYBRID))}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(summary.NARBITRAGE)
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(parseFloat(summary.NPASSIVE))}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(summary.NFIXED_INCOME)
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(parseFloat(summary.NCASH))}
                    </td>
                    <td className="text-end" id="total">
                      {formatNumberToIndianFormat(parseFloat(summary.NTOTAL))}
                    </td>
                  </tr>
                  {clickedIndex === index && (
                    <tr key={`subtable-${index}`}>
                      <td colSpan="8" className="p-0">
                        <SubNetSalesTable
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
export default NetSalesTable;
