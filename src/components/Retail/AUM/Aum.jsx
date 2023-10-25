import React, { useState,useEffect } from "react";
import { Link} from "react-router-dom";
import "./Aum.css";
import LoaderSearch from "../../Table/LoaderSearch";
import { usePeriodApi } from "../RetailApi/AUM_Api";
import AumRegionReport from "./AumRegionReport";
import Loader from "../../Table/Loader";
import { useDataContext } from "../../../Context/DataContext";

const Aum = () => {
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  // const queryParams = new URLSearchParams({
  //   empid: "1234",
  //   emprole: "ADMIN",
  //   quarter: "202324Q2",
  //   period_code: report_period,
  //   zone: "",
  //   region_code: "BIHR",
  //   ufc_code: "nill",
  //   rm_code: "nill",
  //   chn_code: "",
  //   common_report: 'REGIONWISE'
  // });
  const { aum_period } = usePeriodApi();
  const {report_period, formatNumberToIndianFormat, loading}= useDataContext();


  function calculateTotal(columnName) {
    let total = 0;
    aum_period.forEach((item) => {
      total += parseFloat(item[columnName]);
    });
    return total;
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

  // const [items, setItems] = useState([...Array(100).keys()].map((i) => i + 1));
  // const {currentPage, setCurrentPage,entriesPerPage, setEntriesPerPage}= useDataContext();

  // const totalPages = Math.ceil(items.length / entriesPerPage);
  // const indexOfLastItem = currentPage * entriesPerPage;
  // const indexOfFirstItem = indexOfLastItem - entriesPerPage;
  // const currentItems = aum_period.slice(indexOfFirstItem, indexOfLastItem);

  // const handleEntriesChange = (e) => {
  //   setEntriesPerPage(parseInt(e.target.value));
  //   setCurrentPage(1);
  // };

  // const handlePrev = () => {
  //   setCurrentPage(currentPage - 1);
  // };

  // const handleNext = () => {
  //   setCurrentPage(currentPage + 1);
  // };

  // useEffect(() => {
  //   if (currentPage > totalPages) {
  //     setCurrentPage(totalPages);
  //   }
  // }, [currentPage, totalPages]);

  return (
    <>
      <div className="">
        {loading ? (
          <div>
            <LoaderSearch />
          </div>
        ) : (
          <div className=" col-md-12 d-flex" style={{ paddingLeft: "" }}>
            <div
              className=""
              style={{ paddingLeft: "", paddingBottom: "10px" }}
            >
              <div className="col-md-6 ">
                <h4>
                  <b>SALES  (In Lakhs)</b>
                </h4>
                <h5>
                  
                </h5>
              </div>
            </div>

            <div className="col-md-2 list-group mt-5">
          <p className="theader">
            <Link
              className="btn textlink"
              to={`/AllIndiaAumRegionWise/${report_period}`}
            >
              <b>All India Region Wise</b>
            </Link>
          </p>
        </div>
            
        <div className="col-md-2 mt-5">
          <p className="theader">
            <Link className=" btn textlink"   to={`/AllIndiaAumUfcWise/${report_period}`}>
              <b>All India UFC Wise </b>
            </Link>
          </p>
        </div>

        <div className="col-md-2 mt-5">
          <p className="theader">
            <Link className=" btn textlink"
             to={`/AllIndiaAumRMWise/${report_period}`} >
              <b>All India RM Wise </b>
            </Link>
          </p>
        </div>

          </div>
        )}
{/*        
       <label htmlFor="entries">Show entries: </label>
      <select id="entries" onChange={handleEntriesChange}>
        {[5, 10, 50].map((entry) => (
          <option key={entry} value={entry}>
            {entry}
          </option>
        ))}
      </select>
       */}

       
       
        {!loading && (
          <table className="table table-bordered active" id="table1">
            <thead className="Aum-Head">
              <tr className="mid">
                <th rowSpan="2" style={{ lineHeight: "4" }}>
                  Zone
                </th>
                <th rowSpan="2" style={{ lineHeight: "4" }}>
                  Total AUM
                </th>
                <th colSpan="6">AUM</th>
              </tr>
              <tr>
                <th className="">Equity</th>
                <th className="">Hybrid</th>
                <th className="">Arbitrage</th>
                <th className="">Passive</th>
                <th className="">Fixed Income</th>
                <th className="">Cash</th>
              </tr>
            </thead>
            <tbody>
              {aum_period.map((item, index) => (
                <React.Fragment key={index}>
                  <tr key={item.ZONE}>
                    <td>
                      <button
                        className="textlink"
                        onClick={() => handleButtonClick(index)}
                        disabled={loading}
                      >
                        {item.ZONE}
                      </button>
                      {isLoading && (
                        <div className="text-center mt-4">
                          <i className="fas fa-spinner fa-spin fa-2x loder"></i>{" "}
                          <Loader className="loder" />
                        </div>
                      )}
                    </td>
                    <td className="">
                      {formatNumberToIndianFormat(parseFloat(item.TOTAL_AUM))}
                    </td>
                    <td className="">
                      {formatNumberToIndianFormat(parseFloat(item.EQUITY_AUM))}
                    </td>
                    <td className="">
                      {formatNumberToIndianFormat(parseFloat(item.HYBRID_AUM))}
                    </td>
                    <td className="">
                      {formatNumberToIndianFormat(
                        parseFloat(item.ARBITRAGE_AUM)
                      )}
                    </td>
                    <td className="">
                      {formatNumberToIndianFormat(parseFloat(item.PASSIVE_AUM))}
                    </td>
                    <td className="">
                      {formatNumberToIndianFormat(
                        parseFloat(item.FIXED_INCOME_AUM)
                      )}
                    </td>
                    <td className="">
                      {formatNumberToIndianFormat(parseFloat(item.CASH_AUM))}
                    </td>
                  </tr>
                  {clickedIndex === index && (
                    <tr key={`-${index}`}>
                      <td colSpan="8" className="p-0">
                        <AumRegionReport
                          report_period={report_period}
                          zone={item.ZONE}
                          formatNumberToIndianFormat={
                            formatNumberToIndianFormat
                          }
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              <tr className="Aum-Head">
                <td>Total</td>
                <td className="">
                  {formatNumberToIndianFormat(
                    calculateTotal("TOTAL_AUM").toFixed(2)
                  )}
                </td>
                <td className="">
                  {formatNumberToIndianFormat(
                    calculateTotal("EQUITY_AUM").toFixed(2)
                  )}
                </td>
                <td className="">
                  {formatNumberToIndianFormat(
                    calculateTotal("HYBRID_AUM").toFixed(2)
                  )}
                </td>
                <td className="">
                  {formatNumberToIndianFormat(
                    calculateTotal("ARBITRAGE_AUM").toFixed(2)
                  )}
                </td>
                <td className="">
                  {formatNumberToIndianFormat(
                    calculateTotal("PASSIVE_AUM").toFixed(2)
                  )}
                </td>
                <td className="">
                  {formatNumberToIndianFormat(
                    calculateTotal("FIXED_INCOME_AUM").toFixed(2)
                  )}
                </td>
                <td className="">
                  {formatNumberToIndianFormat(
                    calculateTotal("CASH_AUM").toFixed(2)
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        )}
         {/* <div>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div> */}
      </div>
    </>
  );
};

export default Aum;
