import React, { useState } from "react";
import "./Table-CSS/RedemptionTable.css";
import Loader from "./Loader";
import RegionRedemptionTable from "./SubTable/RegionRedemptionTable";

const RedemptionTable = ({
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
              <th scope="col">ZONE</th>
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
                        <b className="sharp-font">
                          { summary.ZONE }
                        </b>
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
                        <RegionRedemptionTable
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
