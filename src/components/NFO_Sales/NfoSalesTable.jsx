import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import SideBar from "../Shared/SideBar/SideBar";
import { NfoApi } from "./NfoApi";
import "./NfoSales.css";
import excel from "../Assets/images/excel_icon.png";
import pdf from "../Assets/images/pdf_icon.png";
import LoaderSearch from "../Table/LoaderSearch";
import TablePagination from '@mui/material/TablePagination';
import { ExportToExcel } from "../Retail/AUM/ExportToExcel";
import ExportToPDF from "../Retail/AUM/ExportToPDF";

const NfoSalesTable = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
  const { nfo_details, loading,handleUpload,setFile } = NfoApi();

  const handleExport = () => {
    ExportToExcel(nfo_details, "NFO Sales Details");
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  return (
    <div className="home-main">
      <Navbar onToggle={toggleSidebar} />
      <div className="d-flex">
        <SideBar isOpen={sidebarOpen} />
        <div
          className={`${sidebarOpen ? "dashboard-closed" : "dashboard-full"}`}
        >
          <div className="container-fluid">
            <div className="card-body bg-white mt-2">
              <div className="row">
                <div className="col-md-12 mt-3">
                  <h4>
                    <b>NFO SALES DETAILS</b>
                  </h4>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-12 d-flex">
                  <div className="col-md-4"></div>
                  <div className="col-md-4 mx-2">
                  <input type="file" className="form-control" name="file" accept=".xlsx, .xls" onChange={handleFileChange} />

                  </div>
                  <div className="col-md-2 t">
                    <button className="btn BgcolorOrange" onClick={handleUpload}>Upload</button>
                  </div>
                  <div className="col-md-2">
                    <p className="exportmodule">
                    <button onClick={handleExport} className="border-0">
                    <img src={excel} alt="excelicon" />
                  </button>
                      |<ExportToPDF />
                    </p>
                  </div>
                </div>
              </div>
              <div className="row  p-3 mt-5">
                <div className="col-md-12  schrollbarNfo">
                  {loading ? (
                    <div className="text-center mt-4">
                      <i className="fas fa-spinner fa-spin fa-2x"></i>{" "}
                      <LoaderSearch />
                    </div>
                  ) : (
                    <table className="table " id="nfoTable">
                      <thead className="bgcolorBlue text-white">
                        <tr>
                          <th>TRNTYPE</th>
                          <th>INHOUSE NUMBER</th>
                          <th>TYPE</th>
                          <th>PLAN</th>
                          <th>PLAN DESCRIPTION</th>
                          <th>FROM SCHEME</th>
                          <th>FROM PLAN</th>
                          <th>FROM PLANDESC</th>
                          <th>AMC CODE</th>
                          <th>SCHDESC</th>
                          <th>FOLIO NUMBER</th>
                          <th>INVESTOR NAME</th>
                          <th>AMOUNT</th>
                          <th>AMTINCR</th>
                          <th>ARN NO</th>
                          <th>ARN NAME</th>
                          <th>UFC CODE</th>
                          <th>UFC NAME</th>
                          <th>REGION</th>
                          <th>ZONE</th>
                          <th>CHANNEL NAME</th>
                          <th>MOD CHANNEL</th>
                          <th>SCHEME CODE</th>
                          <th>BRANCH CODE</th>
                          <th>PIN</th>
                          <th>T30B30FLAG</th>
                          <th>PLATFORM</th>
                          <th>TRXN DATE</th>
                          <th>SCHEME DESCRIPTION</th>
                          <th>MAPRM CODE</th>
                          <th>RIA CODE</th>
                          <th>ARN_RIA</th>
                          <th>PLATFORM2</th>
                          <th>MOBILE NUMBER</th>
                          <th>EMAIL ID</th>
                          <th>TYPE 2</th>
                          <th>REGION CODE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {nfo_details.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((nfo) => (
                          <tr>
                            <td>{nfo.TRANTYPE}</td>
                            <td>{nfo.INHOUSENUMBER}</td>
                            <td>{nfo.TYPE}</td>
                            <td>{nfo.PLAN}</td>
                            <td>{nfo.PLANDESCRIPTION}</td>
                            <td>{nfo.FROMSCHEME}</td>
                            <td>{nfo.FROMPLAN}</td>
                            <td>{nfo.FROMPLANDESC}</td>
                            <td>{nfo.AMCCODE}</td>
                            <td>{nfo.SCHDESC}</td>
                            <td>{nfo.FOLIONUMBER}</td>
                            <td>{nfo.INVESTORNAME}</td>
                            <td>{nfo.AMOUNT}</td>
                            <td>{nfo.AMTINCR}</td>
                            <td>{nfo.ARNNO}</td>
                            <td>{nfo.ARNNAME}</td>
                            <td>{nfo.UFCCODE}</td>
                            <td>{nfo.UFCNAME}</td>
                            <td>{nfo.REGION}</td>
                            <td>{nfo.ZONE}</td>
                            <td>{nfo.CHANNELNAME}</td>
                            <td>{nfo.MODCHANNEL}</td>
                            <td>{nfo.SCHEMECODE}</td>
                            <td>{nfo.BRANCHCODE}</td>
                            <td>{nfo.PIN}</td>
                            <td>{nfo.T30B30FLAG}</td>
                            <td>{nfo.PLATFORM}</td>
                            <td>{nfo.TRXNDATE}</td>
                            <td>{nfo.SCHEMEDESCRIPTION}</td>
                            <td>{nfo.MAPRMCODE}</td>
                            <td>{nfo.RIACODE}</td>
                            <td>{nfo.ARN_RIA}</td>
                            <td>{nfo.PLATFORM2}</td>
                            <td>{nfo.MOBILENUMBER}</td>
                            <td>{nfo.EMAILID}</td>
                            <td>{nfo.TYPE2}</td>
                            <td>{nfo.REGION_CODE}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}                 
                </div>
                <TablePagination
                    count={nfo_details.length} 
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

export default NfoSalesTable;
