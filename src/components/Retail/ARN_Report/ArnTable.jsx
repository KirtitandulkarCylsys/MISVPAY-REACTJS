import React from "react";
import { useDataContext } from "../../../Context/DataContext";
import Loader from "../../Table/Loader";
import { useState } from "react";
import { TablePagination } from "@mui/material";

const ArnTable = () => {
  const { arn, formatNumberToIndianFormat, loading } = useDataContext();
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleButtonClick = (index) => {
    if (index === clickedIndex) {
      setClickedIndex(-1);
    } else {
      setClickedIndex(index);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const calculateTotal = (columnName) => {
    let total = 0;
    if (arn && Array.isArray(arn)) {
      arn.forEach((item) => {
        total += parseFloat(item[columnName]);
      });
    }
    return total;
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 schrollbarArn">
          <table className="table small border">
            <thead>
              <tr className=" ArnTable border-1 ">
                <th
                  rowSpan="2"
                  className="border-1  text-center"
                  style={{ lineHeight: "4" }}
                >
                  ARN Code
                </th>
                <th
                  rowSpan="2"
                  className="border-1  text-center"
                  style={{ lineHeight: "4" }}
                >
                  ARN Name
                </th>

                <th
                  rowSpan="2"
                  className="border-1  text-center"
                  style={{ lineHeight: "4" }}
                >
                  UFC Code
                </th>

                <th
                  rowSpan="2"
                  className="border-1  text-center"
                  style={{ lineHeight: "4" }}
                >
                  Channel
                </th>

                <th colspan="7" className="border-1 text-center ">
                  Sales
                </th>
                <th colspan="7" className="border-1 text-center">
                  Redemption
                </th>
                <th colspan="7" className="text-center">
                  NetSales
                </th>
              </tr>
              <tr className="ArnTable border-1 ">
                <th className="forright ">Equity</th>
                <th className="forright">Hybrid</th>
                <th className="forright">Arbitrage</th>
                <th className="forright">Passive</th>
                <th className="forright">Fixed Income</th>
                <th className="forright">Cash</th>
                <th className="forright border-end">Total</th>
                <th className="forright">Equity</th>
                <th className="forright">Hybrid</th>
                <th className="forright">Arbitrage</th>
                <th className="forright">Passive</th>
                <th className="forright">Fixed Income</th>
                <th className="forright">Cash</th>
                <th className="forright border-end">Total</th>
                <th className="forright">Equity</th>
                <th className="forright">Hybrid</th>
                <th className="forright">Arbitrage</th>
                <th className="forright">Passive</th>
                <th className="forright">Fixed Income</th>
                <th className="forright">Cash</th>
                <th className="forright border-end">Total</th>
              </tr>
            </thead>
            <tbody>
              {arn
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((arn, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>
                          <button
                            className="textlink"
                            onClick={() => handleButtonClick(index)}
                          >
                            <b className="sharp-font"> {arn.ARN}</b>
                          </button>
                          {loading && (
                            <div className="text-center mt-4">
                              <i className="fas fa-spinner fa-spin fa-2x loder"></i>{" "}
                              <Loader className="loder" />
                            </div>
                          )}
                        </td>
                        <td>{arn.ARN_NAME}</td>
                        <td>{arn.UFC_CODE}</td>
                        <td>{arn.CHANNEL}</td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(parseFloat(arn.SEQUITY))}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(parseFloat(arn.SHYBRID))}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(arn.SARBITRAGE)
                          )}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(parseFloat(arn.SPASSIVE))}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(arn.SFIXED_INCOME)
                          )}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(parseFloat(arn.SCASH))}
                        </td>
                        <td className="text-end color-biege" id="total">
                          {formatNumberToIndianFormat(parseFloat(arn.STOTAL))}
                        </td>

                        {/* redemption data */}
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(arn.REQUITY).toFixed(2)
                          )}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(arn.RHYBRID).toFixed(2)
                          )}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(arn.RARBITRAGE).toFixed(2)
                          )}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(arn.RPASSIVE).toFixed(2)
                          )}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(arn.RFIXED_INCOME).toFixed(2)
                          )}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(arn.RCASH).toFixed(2)
                          )}
                        </td>
                        <td className="text-end" id="total">
                          {formatNumberToIndianFormat(
                            parseFloat(arn.RTOTAL).toFixed(2)
                          )}
                        </td>

                        {/* netsales data */}
                        <td className="text-end">
                          {formatNumberToIndianFormat(parseFloat(arn.NEQUITY))}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(parseFloat(arn.NHYBRID))}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(arn.NARBITRAGE)
                          )}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(parseFloat(arn.NPASSIVE))}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(
                            parseFloat(arn.NFIXED_INCOME)
                          )}
                        </td>
                        <td className="text-end">
                          {formatNumberToIndianFormat(parseFloat(arn.NCASH))}
                        </td>
                        <td className="text-end" id="total">
                          {formatNumberToIndianFormat(parseFloat(arn.NTOTAL))}
                        </td>
                      </tr>
                      {clickedIndex === index && (
                        <tr key={`subtable-${index}`}>
                          <td colSpan="22" className="p-0"></td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              <tr className="ArnTable">
                <td>TOTAL</td>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("SEQUITY").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("SHYBRID").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("SARBITRAGE").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("SPASSIVE").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("SFIXED_INCOME").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("SCASH").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("STOTAL").toFixed(2))
                  )}
                </td>
                {/* REDEMPTION TOTAL */}
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("REQUITY").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("RHYBRID").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("RARBITRAGE").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("RPASSIVE").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("RFIXED_INCOME").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("RCASH").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("RTOTAL").toFixed(2))
                  )}
                </td>
                {/* NETSALES TOTAL */}
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("NEQUITY").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("NHYBRID").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("NARBITRAGE").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("NPASSIVE").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("NFIXED_INCOME").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("NCASH").toFixed(2))
                  )}
                </td>
                <td className="text-end">
                  {formatNumberToIndianFormat(
                    parseFloat(calculateTotal("NTOTAL").toFixed(2))
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <TablePagination
        count={arn.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ArnTable;
