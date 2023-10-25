import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./SalesTransaction.css";

const SalesTransaction = ({ transaction_account_report }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(transaction_account_report.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, transaction_account_report.length);

  const displayedItems = transaction_account_report.slice(startIndex, endIndex);

  const handlePageClick = (selected) => {
    setCurrentPage(selected.selected);
  };

 
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
              <b>TRANSACTION TABLE 1</b>
            </h5>
          </button>
          <div className="bg-white m-4" style={{ borderRadius: "10px" }}>
            <div className="col-md-12">
              <div className="row mt-2 bg-white"></div>
              <div className="table-responsive custom-scroll">
                <table className="mt-3 table table-bordered" id="table1" style={{ backgroundColor: "white", }} >
                  <thead className="colorwhite BgcolorOrange">
                    <tr >
                      <th scope="col" className="d-none d-sm-table-cell" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        Sr.No
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        RM Code
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        Batch Closed Date
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        ARN
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        TRDT
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        SubBroker
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        UFC
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        Region
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        Shared Channel
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        Scheme
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        A/C NO
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        Investor
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        PIN Code
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        Switch Flag
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        Sale/Div Amount
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        Sale Channel Share
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        Redemption Amount
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        Redemption Channel Share
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        Trans RM
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        Transaction Type
                      </th>
                      
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        KARVY point of Acceptance
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        RIA Code
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        EUIN Code
                      </th>
                      <th scope="col" className="text-end" style={{ backgroundColor: " #EE8B3A", color:"white" }}>
                        Reference No
                      </th>
                    </tr>     
                  </thead>
                  <tbody style={{backgroundColor:"lightgray"}}>
                  {displayedItems.map((AccountApi, index) => (
              <tr key={index}>
                <td>{startIndex + index + 1}</td>
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
                        <td className="text-end">{AccountApi.REPURAMT}</td>
                        <td className="text-end"> {AccountApi.RNEWAMT} </td>
                        <td className="text-end">{AccountApi.TRMCODE}</td>
                        <td className="text-end">{AccountApi.TRTYPE}</td>
                        <td className="text-end"> {AccountApi.KARVY_LOC} </td>
                        <td className="text-end">{AccountApi.RIACODE}</td>
                        <td className="text-end">{AccountApi.EUIN}</td>
                        <td className="text-end">{AccountApi.REFNO}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTransaction;
