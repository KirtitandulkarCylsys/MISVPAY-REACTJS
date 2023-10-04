import React, { useMemo } from "react";
import { RMApi } from "../../../Retail/RetailApi/RegionApi";


const TableRowWithNetSales = ({formatNumberToIndianFormat}) => {
  const {rm}= RMApi();
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
              <th scope="col">UFC Code</th>

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
            {rm.map((rm) => {
              totalEquity += parseFloat(rm.NEQUITY);
              totalHybrid += parseFloat(rm.NHYBRID);
              totalArbitrage += parseFloat(rm.NARBITRAGE);
              totalPassive += parseFloat(rm.NPASSIVE);
              totalFixedIncome += parseFloat(rm.NFIXED_INCOME);
              totalCash += parseFloat(rm.NCASH);
              grandTotal += parseFloat(rm.NTOTAL);
              return (
                <tr style={{ backgroundColor: "#dee2e69c" }}>
                  <td>
                    <button className="textlink">
                      <b className="sharp-font">{rm.UFC_CODE}</b>
                    </button>
                  </td>

                  <td>
                    <button className="textlink">
                      <b className="sharp-font">{rm.RMCODE}</b>
                    </button>
                  </td>
                  <td>{rm.EMP_NAME}</td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(rm.NEQUITY))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(rm.NHYBRID))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(rm.NARBITRAGE))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(rm.NPASSIVE))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(rm.NFIXED_INCOME))}
                  </td>
                  <td className="text-end">
                    {formatNumberToIndianFormat(parseFloat(rm.NCASH))}
                  </td>
                  <td className="text-end">
                    <b>{formatNumberToIndianFormat(parseFloat(rm.NTOTAL))}</b>
                  </td>
                </tr>
              );
            })}
            <tr style={{ backgroundColor: "rgb(58 94 147 / 98%)", color: "white" }}>
              <td>TOTAL</td>
              <td></td>
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

export default TableRowWithNetSales;
