import React from "react";
import { RMApi } from "../../../Retail/RetailApi/RegionApi";

const RmRedemptionTable = ({formatNumberToIndianFormat,select_type,startDate,endDate,ufc,transaction_summary_report}) => {
  const formattedStartDate = startDate.split("-").reverse().join("/");
  const formattedEndDate = endDate.split("-").reverse().join("/");
  const queryParams = new URLSearchParams({
    employee_id: '1234',
    emprole: 'ADMIN',
    quarter: '202324Q2',
    start_date: formattedStartDate,
    end_date: formattedEndDate,
    select_type: select_type,
    scheme_code: 'nill',
    channel: 'RTL',
    zone: '',
    region: '',
    ufc: ufc,
    rm: 'nill',
    common_report: 'INT_UFCWISE'
  });
  const {rm}= RMApi(queryParams);
  let dataToUse = [];

  if (rm && rm.length > 0) {
    dataToUse = rm;
  } else if (transaction_summary_report && transaction_summary_report.length > 0) {
    dataToUse = transaction_summary_report;
  }
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
          <thead
            style={{ backgroundColor: "rgb(58 94 147 / 98%)", color: "white" }}
          >
            <tr className="">
              <th scope="col">RM CODE</th>
              <th scope="col">EMPLOYEE NAME</th>
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
            {dataToUse.map((rm) => {
              totalEquity += parseFloat(rm.REQUITY);
              totalHybrid += parseFloat(rm.RHYBRID);
              totalArbitrage += parseFloat(rm.RARBITRAGE);
              totalPassive += parseFloat(rm.RPASSIVE);
              totalFixedIncome += parseFloat(rm.RFIXED_INCOME);
              totalCash += parseFloat(rm.RCASH);
              grandTotal += parseFloat(rm.RTOTAL);
              return (
                <tr style={{ backgroundColor: "#dee2e69c" }}>
                  <td>
                    <button className="textlink">
                      <b className="sharp-font">{rm.RMCODE}</b>
                    </button>
                  </td>
                  <td>{rm.EMP_NAME}</td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(rm.REQUITY))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(rm.RHYBRID))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(rm.RARBITRAGE))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(rm.RPASSIVE))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(rm.RFIXED_INCOME))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(rm.RCASH))}
                  </td>
                  <td className="text-end">
                    <b>{formatNumberToIndianFormat(parseFloat(rm.RTOTAL))}</b>
                  </td>
                </tr>
              );
            })}
            <tr
              style={{
                backgroundColor: "rgb(58 94 147 / 98%)",
                color: "white",
              }}
            >
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

export default RmRedemptionTable;
