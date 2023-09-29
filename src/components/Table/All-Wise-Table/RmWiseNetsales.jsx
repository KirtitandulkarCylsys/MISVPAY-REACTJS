import React from "react";
import Loader from "../Loader";

const RmWiseNetsales = ({ formatNumberToIndianFormat, rm, loading }) => {
  let totalEquity = 0;
  let totalHybrid = 0;
  let totalArbitrage = 0;
  let totalPassive = 0;
  let totalFixedIncome = 0;
  let totalCash = 0;
  let grandTotal = 0;

  return (
    <div>
      <div className="head">
        <h4>
          <b>NETSALES</b>
        </h4>
        <h5>
          <b className="gray-color">(In Lakhs)</b>
        </h5>
      </div>
      <div className="col-md-3" />
      <div className="col-md-12">
        {loading ? (
          <Loader />
        ) : rm.length === 0 ? (
          <p>No data available.</p>
        ) : (
          <table className="mt-3 table active " id="rm2" style={{ fontSize: 14 }}>
            <thead
              style={{
                backgroundColor: "rgb(58 94 147 / 98%)",
                color: "white",
              }}
            >
              <tr>
                <th scope="col">UFC Code</th>
                <th scope="col">UFC NAME</th>
                <th scope="col">RM CODE</th>
                <th scope="col">RM NAME</th>
                <th scope="col">FUNCROLE</th>
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
              {rm.map((rm, index) => {
                totalEquity += parseFloat(rm.NEQUITY);
                totalHybrid += parseFloat(rm.NHYBRID);
                totalArbitrage += parseFloat(rm.NARBITRAGE);
                totalPassive += parseFloat(rm.NPASSIVE);
                totalFixedIncome += parseFloat(rm.NFIXED_INCOME);
                totalCash += parseFloat(rm.NCASH);
                grandTotal += parseFloat(rm.NTOTAL);
                return (
                  <tr key={index}>
                    <td>{rm.UFC_CODE}</td>
                    <td>{rm.UFC_NAME}</td>
                    <td>{rm.RMCODE}</td>
                    <td>{rm.RMNAME}</td>
                    <td>{rm.FUNCROLE}</td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(rm.NEQUITY).toFixed(2)
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(rm.NHYBRID).toFixed(2)
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(rm.NARBITRAGE).toFixed(2)
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(rm.NPASSIVE).toFixed(2)
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(rm.NFIXED_INCOME).toFixed(2)
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(rm.NCASH).toFixed(2)
                      )}
                    </td>
                    <td className="text-end" id="total">
                      {formatNumberToIndianFormat(
                        parseFloat(rm.NTOTAL).toFixed(2)
                      )}
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
                <td></td>
                <td></td>
                <td></td>
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
                  {formatNumberToIndianFormat(parseFloat(totalCash.toFixed(2)))}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(grandTotal.toFixed(2))
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RmWiseNetsales;
