import React, { useState } from "react";
import "./SubTable-CSS/SubRedemptionTable.css";
import Loader from "../Loader";
import { RegionApi } from "../../Retail/RetailApi/RegionApi";
import UfcRedemptionTable from "./UFC/UfcRedemptionTable";
import { useMemo } from "react";
import Api from "../../Retail/RetailApi/Api";

const RegionRedemptionTable = ({formatNumberToIndianFormat,select_type,startDate,endDate,zone,transaction_summary_report}) => {
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const formattedStartDate = startDate.split("-").reverse().join("/");
  const formattedEndDate = endDate.split("-").reverse().join("/");
  const {emproles,channel,}= Api();
  const queryParams = useMemo(() => {
    return new URLSearchParams({
      employee_id: '1234',
      emprole: emproles,
      quarter: '202324Q2',
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      select_type: select_type,
      scheme_code: 'nill',
      channel: channel,
      zone: zone,
      region: '',
      ufc: '',
      rm: 'nill',
      common_report: 'INT_ZONEWISE'
    });
  }, [formattedStartDate, formattedEndDate, select_type, zone,emproles,channel]);

  const {regions} = RegionApi(queryParams);

  let dataToUse = [];

  if (regions && regions.length > 0) {
    dataToUse = regions;
  } else if (transaction_summary_report && transaction_summary_report.length > 0) {
    dataToUse = transaction_summary_report;
  }
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
            <b className="black-color">{zone} REDEMPTION DATA</b>
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
            <th scope="col">REGION CODE</th>
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
          {dataToUse.map((summary, index) => {
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
                      <b className="sharp-font">{summary.REGION}</b>
                    </button>
                    {isLoading && (
                      <div className="text-center mt-4">
                        <i className="fas fa-spinner fa-spin fa-2x loder"></i>{" "}
                        <Loader className="loder" />
                      </div>
                    )}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(summary.REQUITY))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(summary.RHYBRID))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(summary.RARBITRAGE))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(summary.RPASSIVE))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(
                      parseFloat(summary.RFIXED_INCOME)
                    )}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(summary.RCASH))}
                  </td>
                  <td className="text-end" id="total">
                    {formatNumberToIndianFormat(parseFloat(summary.RTOTAL))}
                  </td>
                </tr>
                {clickedIndex === index && (
                  <tr key={`subtable-${index}`}>
                    <td colSpan="8" className="p-0">
                      {clickedIndex === index && (
                        <UfcRedemptionTable
                          formatNumberToIndianFormat={
                            formatNumberToIndianFormat
                          }
                          startDate={startDate}
                          endDate = {endDate}
                          select_type= {select_type}
                          region= {summary.REGION}
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

export default RegionRedemptionTable;
