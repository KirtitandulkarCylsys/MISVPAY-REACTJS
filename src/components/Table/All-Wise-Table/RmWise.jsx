import React, { useMemo, useState } from "react";
import Navbar from "../../Shared/Navbar";
import SideBar from "../../Shared/SideBar/SideBar";
import { Link } from "react-router-dom";
import { ExportPdfRegion } from "./ExportPdfRegion";
import { ExportExcelRM } from "./ExportExcel";
import { AllRmwise } from "../../Retail/RetailApi/RegionApi";
import TablePagination from "@mui/material/TablePagination";
import "./RmPagination.css";
import LoaderSearch from "../LoaderSearch";
import { useDataContext } from "../../../Context/DataContext";
const RmWise = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    start_Date,
    end_Date,
    rolwiseselectype,
    emproles,
    channel,
    formatNumberToIndianFormat,
    emp_id,
    QUARTERData,
  } = useDataContext();

  const formattedStartDate = start_Date?.split("-").reverse().join("/");
  const formattedEndDate = end_Date?.split("-").reverse().join("/");
  const quarter = QUARTERData.replace("-", "").replace("-", "");
  const queryParams = useMemo(() => {
    return new URLSearchParams({
      employee_id: emp_id,
      emprole: emproles,
      quarter: quarter,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      select_type: rolwiseselectype,
      scheme_code: "nill",
      channel: channel,
      zone: "",
      region: "",
      ufc: "",
      rm: "nill",
      common_report: "ALL_RMWISE",
    });
  }, [
    emp_id,
    rolwiseselectype,
    emproles,
    formattedStartDate,
    formattedEndDate,
    channel,
    quarter,
  ]);
  const { rmwise, loading } = AllRmwise(queryParams);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
    if (rmwise && Array.isArray(rmwise)) {
      rmwise.forEach((item) => {
        total += parseFloat(item[columnName]);
      });
    }
    return total;
  };
  return (
    <div className="new-component container-fluid">
      <Navbar onToggle={toggleSidebar} />
      <div className="d-flex">
        <SideBar isOpen={sidebarOpen} />
        <div
          className={` ${sidebarOpen ? "dashboard-closed" : "dashboard-full"}`}
        >
          <div className="bg-white card m-4" style={{ borderRadius: "10px" }}>
            <div className="col-md-12">
              <div className="row mt-2 bg-white">
                <div className="head">
                  <h4>
                    <b className="black-color">All India RM Wise</b>
                  </h4>
                  <h5>
                    <b className="gray-color">(In Lakhs)</b>
                  </h5>
                </div>
                <div
                  className="col-md-12 d-flex justify-content-between "
                  style={{ marginTop: "30px" }}
                >
                  <Link
                    to="/Transaction"
                    className="btn"
                    style={{
                      backgroundColor: "rgb(58 94 147 / 98%)",
                      color: "white",
                      height: "fit-content",
                    }}
                  >
                    back
                  </Link>
                  <p className="icon">
                    <ExportExcelRM />
                    |
                    <ExportPdfRegion />
                  </p>
                </div>
              </div>
              {loading ? (
                <div className="text-center mt-4">
                  <i className="fas fa-spinner fa-spin fa-2x"></i>{" "}
                  <LoaderSearch />
                </div>
              ) : (
                <div className="scrollbarRegion">
                  <table className="mt-3 table nested-table">
                    <thead
                      style={{
                        backgroundColor: "rgb(58 94 147 / 98%)",
                        color: "white",
                      }}
                    >
                      <tr className="">
                        <th
                          scope="col"
                          rowSpan="2"
                          className="border-end border-1 text-center"
                          style={{ lineHeight: "4" }}
                        >
                          RM Code
                        </th>
                        <th
                          scope="col"
                          rowSpan="2"
                          className="border-end border-1 text-center"
                        >
                          EMPLOYEE NAME
                        </th>
                        <th colspan="7" className="border-1 text-center ">
                          Sales
                        </th>
                        <th colspan="7" className="border-1 text-center ">
                          Redemption
                        </th>
                        <th colspan="7" className="border-1 text-center ">
                          NetSales
                        </th>
                      </tr>
                      <tr>
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
                      {rmwise
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((rm) => {
                          return (
                            <tr style={{ backgroundColor: "#dee2e69c" }}>
                              <td>
                                <button className="textlink">
                                  <b className="sharp-font">{rm.RMCODE}</b>
                                </button>
                              </td>
                              <td>{rm.EMP_NAME}</td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.SEQUITY)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.SHYBRID)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.SARBITRAGE)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.SPASSIVE)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.SFIXED_INCOME)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.SCASH)
                                )}
                              </td>
                              <td className="text-end">
                                <b>
                                  {formatNumberToIndianFormat(
                                    parseFloat(rm.STOTAL)
                                  )}
                                </b>
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.REQUITY)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.RHYBRID)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.RARBITRAGE)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.RPASSIVE)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.RFIXED_INCOME)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.RCASH)
                                )}
                              </td>
                              <td className="text-end">
                                <b>
                                  {formatNumberToIndianFormat(
                                    parseFloat(rm.RTOTAL)
                                  )}
                                </b>
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.NEQUITY)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.NHYBRID)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.NARBITRAGE)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.NPASSIVE)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.NFIXED_INCOME)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(rm.NCASH)
                                )}
                              </td>
                              <td className="text-end">
                                <b>
                                  {formatNumberToIndianFormat(
                                    parseFloat(rm.NTOTAL)
                                  )}
                                </b>
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
                            parseFloat(
                              calculateTotal("SFIXED_INCOME").toFixed(2)
                            )
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
                            parseFloat(
                              calculateTotal("RFIXED_INCOME").toFixed(2)
                            )
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
                            parseFloat(
                              calculateTotal("NFIXED_INCOME").toFixed(2)
                            )
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
              )}
              <div className="rmpagination-container">
                <TablePagination
                  count={rmwise.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RmWise;
