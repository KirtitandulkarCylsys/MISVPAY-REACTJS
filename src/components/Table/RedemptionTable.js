import React, { useState } from "react";
import "./Table-CSS/RedemptionTable.css";
import SubRedemptionTable from "./SubTable/SubRedemptionTable";
import Loader from "./Loader";

const RedemptionTable = ({
  transaction_summary_report,
  formatNumberToIndianFormat,
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

  const headerColumns = ["REGION", "ZONE", "UFC CODE", "RMCODE", "EMP NAME"];

  const isRegionPresentInData = transaction_summary_report.some(
    (summary) => summary.REGION
  );

  const isZonePresentInData = transaction_summary_report.some(
    (summary) => summary.ZONE
  );

  const isUFCPresentInData = transaction_summary_report.some(
    (summary) => summary.UFC_CODE
  );

  const displayRmCodeColumn = transaction_summary_report.some(
    (summary) => summary.RMCODE
  );
  const displayEmpNameColumn = transaction_summary_report.some(
    (summary) => summary.EMP_NAME
  );
  let columnToDisplay = "REGION"; // Default column to display

  if (isZonePresentInData) {
    columnToDisplay = "ZONE";
  } else if (isUFCPresentInData) {
    columnToDisplay = "UFC_CODE";
  } else if (displayRmCodeColumn && displayEmpNameColumn) {
    columnToDisplay = "RMCODE_EMP_NAME"; // Use a single column name for both RMCODE and EMP_NAME
  }

  if (!Array.isArray(transaction_summary_report)) {
    // Handle the case where transaction_summary_report is not an array
    return <p>No data available.</p>;
  }

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
              <th key={columnToDisplay} scope="col">
                {columnToDisplay === "RMCODE_EMP_NAME"
                  ? "RMCODE"
                  : columnToDisplay}
              </th>
              {displayEmpNameColumn && (
                <>
                  <th scope="col">EMP_NAME</th>
                </>
              )}
              <th
                scope="col"
                className="text-end"
              >
                Equity
              </th>
              <th
                scope="col"
                className="text-end"
              >
                Hybrid
              </th>
              <th
                scope="col"
                className="text-end"

              >
                Arbitrage
              </th>
              <th
                scope="col"
                className="text-end"
              >
                Passive(ex-Debt)
              </th>
              <th
                scope="col"
                className="text-end"
              >
                Fixed Income
              </th>
              <th
                scope="col"
                className="text-end"
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
              const hasZone = summary.hasOwnProperty("ZONE");
              const hasRegion = summary.hasOwnProperty("REGION");
              const hasUfcCode = summary.hasOwnProperty("UFC_CODE");
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
                        <b className="sharp-font"> {hasZone ? summary.ZONE : ""}
                          {hasRegion ? summary.REGION : ""}
                          {hasUfcCode ? summary.UFC_CODE : ""}
                          {displayRmCodeColumn ? summary.RMCODE : ""}</b>
                      </button>
                      {isLoading && <Loader />}
                    </td>
                    {displayEmpNameColumn && (

                      <td className="">{summary.EMP_NAME}</td>
                    )}
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
              {displayRmCodeColumn && (
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
              )}

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
  );
};
export default RedemptionTable;
