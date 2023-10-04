import React, { useState, useMemo } from "react";
import "./SubTable-CSS/SubRedemptionTable.css";
import TableRowWithCollapseNetSales from "./UFC/TableRowWithCollapseNetSales";
import Loader from "../Loader";
import { RegionApi } from "../../Retail/RetailApi/RegionApi";

const SubNetSalesTable = ({formatNumberToIndianFormat}) => {
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const {regions}= RegionApi();
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
    <div className="new-component container-fluid p-0">
      <div className="row mt-2 bg-white">
        <div className="head">
          <h4>
            <b className="black-color"> Data</b>
          </h4>
          <h5>
            <b className="gray-color">(In Lakhs)</b>
          </h5>
        </div>
      </div>
      <table
        className="mt-3 table nested-table"
        style={{
          backgroundColor: "white",
          border: "2px solid",
          borderColor: "#EE8B3A",
          borderBottomColor: "white",
        }}
      >
        <thead>
          <tr className="colorwhite BgcolorOrange">
            <th scope="col">REGION  CODE</th>
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
        <tbody style={{ backgroundColor: "#DDD" }}>
          {regions.map((summary, index) => {
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
                      <b>{summary.REGION}</b>
                    </button>
                    {isLoading && (
                      <div className="text-center mt-4">
                        <i className="fas fa-spinner fa-spin fa-2x loder"></i>{" "}
                        <Loader className="loder" />
                      </div>
                    )}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(summary.NEQUITY))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(summary.NHYBRID))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(summary.NARBITRAGE))}
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
                      {clickedIndex === index && (
                        <TableRowWithCollapseNetSales
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
          <tr className="colorwhite BgcolorOrange">
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
              {formatNumberToIndianFormat(parseFloat(totalPassive.toFixed(2)))}
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
  );
};

export default SubNetSalesTable;
