import React, { useState, useMemo } from "react";
import Navbar from "../../Shared/Navbar";
import SideBar from "../../Shared/SideBar/SideBar";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { ExportExcelRegion } from "./ExportExcel";
import { ExportPdfRegion } from "./ExportPdfRegion";
import { AllRegionwise } from "../../Retail/RetailApi/RegionApi";
import { useDataContext } from "../../../Context/DataContext";
import {TablePagination} from "@mui/material";

const RegionWiseSales = () => {
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

  const formattedStartDate = start_Date.split("-").reverse().join("/");
  const formattedEndDate = end_Date.split("-").reverse().join("/");
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
      common_report: "ALL_REGIONWISE",
    });
  }, [
    quarter,
    emp_id,
    rolwiseselectype,
    emproles,
    formattedStartDate,
    formattedEndDate,
    channel,
  ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { regionwise, loading } = AllRegionwise(queryParams);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const calculateTotal = (columnName) => {
    let total = 0;
    if (regionwise && Array.isArray(regionwise)) {
      regionwise.forEach((item) => {
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
                    <b className="black-color">All India Region Wise</b>
                  </h4>
                  <h5>
                    <b className="gray-color">(In Lakhs)</b>
                  </h5>
                </div>
                <div
                  className="col-md-12 d-flex justify-content-lg-between "
                  style={{ marginTop: "30px" }}
                >
                  <Link
                    to="/Transaction"
                    className=" btn colorwhite BgcolorOrange"
                    style={{ height: "fit-content" }}
                  >
                    back
                  </Link>

                  <p className="icon">
                    <ExportExcelRegion />
                    |
                    <ExportPdfRegion />
                  </p>
                </div>
              </div>
              {loading ? (
                <Loader />
              ) : regionwise.length === 0 ? (
                <p>No data available.</p>
              ) : (
                <div className="scrollbarRegion">
                  <table
                    className="mt-3 table active "
                    style={{
                      backgroundColor: "white",
                      border: "2px solid",
                      borderColor: "#EE8B3A",
                      borderBottomColor: "white",
                    }}
                    id="region1"
                  >
                    <thead>
                      <tr className="colorwhite BgcolorOrange">
                        <th
                          rowSpan="2"
                          className="border-1 border-end text-center"
                          style={{ lineHeight: "4" }}
                        >
                          Region
                        </th>
                        <th
                          colspan="7"
                          className="border-1 border-end text-center "
                        >
                          Sales
                        </th>
                        <th
                          colspan="7"
                          className="border-1 border-end text-center "
                        >
                          Redemption
                        </th>
                        <th colspan="7" className="text-center">
                          NetSales
                        </th>
                      </tr>
                      <tr className="colorwhite BgcolorOrange">
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
                    <tbody style={{ backgroundColor: "#DADADA" }}>
                      {regionwise
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((region, index) => {
                          return (
                            <tr key={index}>
                              <td>{region.REGION}</td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.SEQUITY)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.SHYBRID)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.SARBITRAGE)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.SPASSIVE)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.SFIXED_INCOME)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.SCASH)
                                )}
                              </td>
                              <td className="text-end color-biege" id="total">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.STOTAL)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.REQUITY)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.RHYBRID)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.RARBITRAGE)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.RPASSIVE)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.RFIXED_INCOME)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.RCASH)
                                )}
                              </td>
                              <td className="text-end" id="total">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.RTOTAL)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.NEQUITY)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.NHYBRID)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.NARBITRAGE)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.NPASSIVE)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.NFIXED_INCOME)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.NCASH)
                                )}
                              </td>
                              <td className="text-end" id="total">
                                {formatNumberToIndianFormat(
                                  parseFloat(region.NTOTAL)
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      <tr className="colorwhite BgcolorOrange">
                        <td>TOTAL</td>
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
            </div>
            <TablePagination
              count={regionwise.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionWiseSales;
