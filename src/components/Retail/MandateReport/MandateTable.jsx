import React, { useState } from "react";
import "./MandateTable.css";
import SubMandateTable from "./SubMandateTable";
import Loader from "../../Table/Loader";
// import { Link } from "react-router-dom";
import { useDataContext } from "../../../Context/DataContext";

const MandateTable = () => {
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  // const [totalPages, setTotalPages] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [counter, setCounter] = useState(1);
  const {
    // zonetablecurrentPage,
    // zontablepageSize,
    // setZonetablepageSize,
    // setZonetablecurrentPage,
    // fetchmandatereport,
    mandate_report,
    formatNumberToIndianFormat,
    rolwiseStype,
  } = useDataContext();

  // useEffect(() => {
  //   console.log(counter, "zonetablecurrentPage");
  //   console.log(zontablepageSize, "zontablepageSize");
  //   if (counter > 1) {
  //     fetchmandatereport(zontablepageSize, counter.toString());
  //   }
  // }, [counter]);

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

  // const itemsperPage =
  //   zontablepageSize === ""
  //     ? mandate_report.length
  //     : parseInt(zontablepageSize);
  // useEffect(() => {
  //   setZonetablecurrentPage("");
  //   setTotalPages(Math.ceil(mandate_report.length / itemsperPage));
  // }, [zontablepageSize]);
  // useEffect(() => {
  //   currentPage === 0
  //     ? setZonetablecurrentPage("")
  //     : setZonetablecurrentPage(currentPage.toString());
  //   console.log(currentPage, "currentPage");
  // }, [currentPage]);

  const calculateTotal = (columnName) => {
    let total = 0;
    if (mandate_report && Array.isArray(mandate_report)) {
      mandate_report.forEach((item) => {
        total += parseFloat(item[columnName]);
      });
    }
    return total;
  };

  // const handlePageClick = (selectedPage) => {
  //   setCurrentPage(selectedPage.selected)
  //   setZonetablecurrentPage(currentPage.toString());
  //   console.log(selectedPage.selected,'selectedPage.selected');
  // };

  // const handlePageSizeChange = (e) => {
  //   console.log(e.target.value, "pagesize");
  //   setZonetablecurrentPage(zonetablecurrentPage.toString())
  //   setZonetablepageSize(e.target.value);
  //   fetchmandatereport(e.target.value,counter.toString());
  // };

  return (
    <>
      <div className="container-fluid">
        <div className="">
          <div>
            <div>
              <div className="row mt-6 mr-4 ">
                <div className="col-md-6 d-flex">
                  <h4>
                    <b>Transaction Mandate Report</b>
                  </h4>
                  <h5>
                    <b className="gray-color">(In Lakhs)</b>
                  </h5>
                </div>
                <div className="col-md-3" />
                <div className="col-md-12">
                  <table className="table table-bordered " id="table1">
                    <thead className="bgcolorBlue text-white mainhead">
                      <tr className="mid">
                        <th
                          rowSpan="2"
                          className="headtable"
                          //   onClick={() => handleHeaderClick("ZONE")}
                        >
                          ZONE
                        </th>
                        <th
                          rowSpan="2"
                          className="headtable"
                          //   onClick={() => handleHeaderClick("TYPE")}
                        >
                          Transaction Type
                        </th>
                        <th colSpan="8">SIP A/C</th>
                      </tr>
                      <tr>
                        <th
                          className="forright"
                          //   onClick={() => handleHeaderClick("SEQUITY")}
                        >
                          Equity
                        </th>
                        <th
                          className="forright"
                          //   onClick={() => handleHeaderClick("SHYBRID")}
                        >
                          Hybrid
                        </th>
                        <th
                          className="forright"
                          //   onClick={() => handleHeaderClick("SARBITRAGE")}
                        >
                          Arbitrage
                        </th>
                        <th
                          className="forright"
                          //   onClick={() => handleHeaderClick("SPASSIVE")}
                        >
                          Passive(ex-Debt)
                        </th>
                        <th
                          className="forright"
                          //   onClick={() => handleHeaderClick("SFIXED_INCOME")}
                        >
                          Fixed Income
                        </th>
                        <th
                          className="forright"
                          //   onClick={() => handleHeaderClick("SCASH")}
                        >
                          {" "}
                          Cash{" "}
                        </th>
                        <th className="forright">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mandate_report?.map((mandate, index) => {
                        return (
                          <React.Fragment key={index}>
                            <tr>
                              <td>
                                <button
                                  className="textlink"
                                  onClick={() => handleButtonClick(index)}
                                  disabled={isLoading}
                                >
                                  <b className="sharp-font"> {mandate.ZONE}</b>
                                </button>
                                {isLoading && (
                                  <div className="text-center mt-4">
                                    <i className="fas fa-spinner fa-spin fa-2x loder"></i>{" "}
                                    <Loader className="loder" />
                                  </div>
                                )}
                              </td>
                              <td className="text-end">{rolwiseStype}</td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(mandate.SEQUITY)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(mandate.SHYBRID)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(mandate.SARBITRAGE)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(mandate.SPASSIVE)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(mandate.SFIXED_INCOME)
                                )}
                              </td>
                              <td className="text-end">
                                {formatNumberToIndianFormat(
                                  parseFloat(mandate.SCASH)
                                )}
                              </td>
                              <td className="text-end color-biege" id="total">
                                {formatNumberToIndianFormat(
                                  parseFloat(mandate.STOTAL)
                                )}
                              </td>
                            </tr>
                            {clickedIndex === index && (
                              <tr key={`subtable-${index}`}>
                                <td colSpan="22" className="p-0">
                                  <SubMandateTable zone={mandate.ZONE} />
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                      <tr className="zoneTable">
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
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MandateTable;
