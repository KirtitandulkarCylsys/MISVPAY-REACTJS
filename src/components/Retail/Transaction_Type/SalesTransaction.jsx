import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./SalesTransaction.css";

const SalesTransaction = ({ transaction_account_report }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const displayedItems = transaction_account_report.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
console.log(transaction_account_report, "data")


  return (
    <div className="new-component">
      <div className="bg-white card m-4">
        <div className="col-l-12 ">
          <div className="rounded-lg p-3"></div>
          <button
            className="border-0 w-100 text-left bg-transparent "
            type="button"
          >
            <h5 className="headline">
              <b>SALES TRANSACTION</b>
            </h5>
          </button>
          <div className="bg-white m-4" style={{ borderRadius: "10px" }}>
            <div className="col-md-12">
              <div className="row mt-2 bg-white"></div>
              <div className="table-responsive custom-scroll">
                <table className="mt-3 table table-bordered" id="table1" style={{ backgroundColor: "white", }} >
                  <thead>
                    <tr className="colorwhite BgcolorOrange">
                      <th scope="col" className="d-none d-sm-table-cell">
                        Sr.No
                      </th>
                      <th scope="col" className="text-end">
                        RM Code
                      </th>
                      <th scope="col" className="text-end">
                        Batch Closed Date
                      </th>
                      <th scope="col" className="text-end">
                        ARN
                      </th>
                      <th scope="col" className="text-end">
                        TRDT
                      </th>
                      <th scope="col" className="text-end">
                        SubBroker
                      </th>
                      <th scope="col" className="text-end">
                        UFC
                      </th>
                      <th scope="col" className="text-end">
                        Region
                      </th>
                      <th scope="col" className="text-end">
                        Shared Channel
                      </th>
                      <th scope="col" className="text-end">
                        Scheme
                      </th>
                      <th scope="col" className="text-end">
                        A/C NO
                      </th>
                      <th scope="col" className="text-end">
                        Investor
                      </th>
                      <th scope="col" className="text-end">
                        PIN Code
                      </th>
                      <th scope="col" className="text-end">
                        Switch Flag
                      </th>
                      <th scope="col" className="text-end">
                        Sale/Div Amount
                      </th>
                      <th scope="col" className="text-end">
                        Sale Channel Share
                      </th>
                      <th scope="col" className="text-end">
                        SIP Gross Sales
                      </th>
                      <th scope="col" className="text-end">
                        Redemption Amount
                      </th>
                      <th scope="col" className="text-end">
                        Redemption Channel Share
                      </th>
                      <th scope="col" className="text-end">
                        Trans RM
                      </th>
                      <th scope="col" className="text-end">
                        Transaction Type
                      </th>
                      <th scope="col" className="text-end">
                        Scheme Plan
                      </th>
                      <th scope="col" className="text-end">
                        KARVY point of Acceptance
                      </th>
                      <th scope="col" className="text-end">
                        RIA Code
                      </th>
                      <th scope="col" className="text-end">
                        EUIN Code
                      </th>
                      <th scope="col" className="text-end">
                        Reference No
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction_account_report.map((AccountApi, index) => (
                      <tr key={index}>
                        <td className="d-none d-sm-table-cell">{startIndex + index + 1}</td>
                        <td className="text-end">{AccountApi.RMCODE}</td>
                        <td className="text-end">{AccountApi.BATCHCLOSEDT}</td>
                        <td className="text-end">{AccountApi.ARN}</td>
                        <td className="text-end">{AccountApi.TRDT}</td>
                        <td className="text-end">{AccountApi.SUBBROKER}</td>
                        <td className="text-end">{AccountApi.UFC_NAME}</td>
                        <td className="text-end">{AccountApi.REGION_CODE}</td>
                        <td className="text-end">{AccountApi.SCHANNEL}</td>
                        <td className="text-end">{AccountApi.SCHEME}</td>
                        <td className="text-end">{AccountApi.ACNO}</td>
                        <td className="text-end">{AccountApi.UFC_NAME}</td>
                        <td className="text-end">{AccountApi.PINCODE}</td>
                        <td className="text-end">{AccountApi.SWITCH_FLAG}</td>
                        <td className="text-end">{AccountApi.SALEAMT}</td>
                        <td className="text-end">{AccountApi.SCHANNELSHARE}</td>
                        <td className="text-end">{AccountApi.sipGrossSales}</td>
                        <td className="text-end">{AccountApi.REPURAMT}</td>
                        <td className="text-end"> {AccountApi.RNEWAMT} </td>
                        <td className="text-end">{AccountApi.TRMCODE}</td>
                        <td className="text-end">{AccountApi.TRTYPE}</td>
                        <td className="text-end">{AccountApi.schemePlan}</td>
                        <td className="text-end"> {AccountApi.KARVY_LOC} </td>
                        <td className="text-end">{AccountApi.RIACODE}</td>
                        <td className="text-end">{AccountApi.EUIN}</td>
                        <td className="text-end">{AccountApi.REFNO}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(
            transaction_account_report.length / itemsPerPage
          )}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default SalesTransaction;
