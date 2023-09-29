import React, { useMemo, useState } from "react";
import UfcApi from "../Api/UfcApi";
import TableRowWithNetSales from "../RMWISE/TableRowWithNetSales";
import Loader from "../../Loader";

const TableRowWithCollapseNetSales = ({
  pzone,
  startDate,
  endDate,
  select_type,
  region_name,
  formatNumberToIndianFormat,
}) => {
  const queryParams = useMemo(() => {
    const formattedStartDate = startDate.split("-").reverse().join("/");
    const formattedEndDate = endDate.split("-").reverse().join("/");

    return new URLSearchParams({
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      asset_class: 1,
      select_type: select_type,
      employee_code: 2941,
      p_zone: pzone,
      region_name: region_name,
    });
  }, [startDate, endDate, region_name, select_type, pzone]);
  const transaction_summary_report_ufc = UfcApi(queryParams);

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
            {transaction_summary_report_ufc.map((ufc, index) => {
              totalEquity += parseFloat(ufc.NEQUITY);
              totalHybrid += parseFloat(ufc.NHYBRID);
              totalArbitrage += parseFloat(ufc.NARBITRAGE);
              totalPassive += parseFloat(ufc.NPASSIVE);
              totalFixedIncome += parseFloat(ufc.NFIXED_INCOME);
              totalCash += parseFloat(ufc.NCASH);
              grandTotal += parseFloat(ufc.NTOTAL);
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
                      {formatNumberToIndianFormat(parseFloat(ufc.NEQUITY))}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(parseFloat(ufc.NHYBRID))}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(parseFloat(ufc.NARBITRAGE))}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(parseFloat(ufc.NPASSIVE))}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(
                        parseFloat(ufc.NFIXED_INCOME)
                      )}
                    </td>
                    <td className="text-end">
                      {formatNumberToIndianFormat(parseFloat(ufc.NCASH))}
                    </td>
                    <td
                      className="text-end"
                      style={{ backgroundColor: "#8080805c" }}
                    >
                      <b>
                        {formatNumberToIndianFormat(parseFloat(ufc.NTOTAL))}
                      </b>
                    </td>
                  </tr>
                  {clickedIndex === index && (
                    <tr key={`subtable-${index}`}>
                      <td colSpan="9" className="p-0">
                        {clickedIndex === index && (
                          <TableRowWithNetSales
                            startDate={startDate}
                            endDate={endDate}
                            select_type={select_type}
                            pzone={pzone}
                            region_name={region_name}
                            ufc_code={ufc.UFC_CODE}
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

export default TableRowWithCollapseNetSales;
