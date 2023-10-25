import React, { useState } from "react";
import Navbar from "../../Shared/Navbar";
import SideBar from "../../Shared/SideBar/SideBar";
import { NfoApi } from "./NfoApi";
import "./NfoSales.css";
import excel from "../../Assets/images/excel_icon.png";
import LoaderSearch from "../../Table/LoaderSearch";
import { Box, LinearProgress, TablePagination } from "@mui/material";
import { ExportToExcel } from "../AUM/ExportToExcel";
import ExportToPDF from "../AUM/ExportToPDF";
import { read, utils } from "xlsx";
import { useDataContext } from "../../../Context/DataContext";

const NfoSalesTable = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [excelData, setExcelData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { emp_id } = useDataContext();

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
  const { nfo_details, loading, handleUpload, uploadProgress } = NfoApi();

  const handleExport = () => {
    ExportToExcel(nfo_details, "NFO Sales Details");
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleExcel = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target.result;
          const workbook = await read(data, { type: "array" });
          const sheetName = await workbook.SheetNames[0];
          const sheet = await workbook.Sheets[sheetName];
          const parsedData = await utils.sheet_to_json(sheet, { header: 1 });
          console.log("Parsed Excel Data:", parsedData);
          setExcelData(parsedData);
          handleUpload(parsedData);
        } catch (error) {
          console.error("Error reading the Excel file:", error);
        }
      };
      reader.readAsArrayBuffer(selectedFile);
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <div className="home-main">
      <Navbar onToggle={toggleSidebar} />
      <div className="d-flex">
        <SideBar isOpen={sidebarOpen} />
        <div
          className={`${sidebarOpen ? "dashboard-closed" : "dashboard-full"}`}
        >
          <div className="container">
            <div className="card-body bg-white mt-2">
              <div className="row">
                <div className="col-md-12 mt-3">
                  <h4>
                    <b>NFO SALES DETAILS</b>
                  </h4>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-4"></div>
                {emp_id === "0982" ||
                emp_id === "1325" ||
                emp_id === "4549" ||
                emp_id === "4548" ? (
                  <>
                    <div className="col-md-4">
                      <input
                        type="file"
                        className="form-control"
                        name="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="col-md-2 upload">
                      <button
                        className="btn BgcolorOrange "
                        onClick={handleExcel}
                      >
                        Upload
                      </button>
                    </div>
                    <div className="col-md-2"></div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="row text-end mt-5">
                <div className="col-md-2 tabs offset-10">
                  <p className="exportmodule">
                    <button onClick={handleExport} className="border-0">
                      <img src={excel} alt="excelicon" />
                    </button>
                    | <ExportToPDF />
                  </p>
                </div>
              </div>
              <div className="row  p-3">
                <div className="col-md-12  schrollbarNfo">
                  {loading ? (
                    <div className="text-center mt-4">
                      <i className="fas fa-spinner fa-spin fa-2x"></i>{" "}
                      <LoaderSearch />
                    </div>
                  ) : nfo_details.length === 0 ? (
                    <h3 className="text-center">
                      <b>No Data found</b>
                    </h3>
                  ) : (
                    <table className="table active  " id="nfoTable">
                      <thead className="nfoTable">
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
                        </tr>
                      </thead>
                      <tbody>
                        {nfo_details
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((nfo) => (
                            <tr>
                              <td>{nfo.TRANTYPE}</td>
                              <td>{nfo.INHOUSENUMBER}</td>
                              <td>{nfo.TYPE}</td>
                              <td className="plan">{nfo.PLAN}</td>
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
