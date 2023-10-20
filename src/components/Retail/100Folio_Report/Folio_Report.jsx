import React from 'react'
import { AumDropdownApi } from '../RetailApi/AUM_Api';
import { useState } from 'react';
import Navbar from '../../Shared/Navbar';
import SideBar from '../../Shared/SideBar/SideBar';
import { ToastContainer, toast } from 'react-toastify';
import LoaderSearch from '../../Table/SubTable/LoaderSearch';
import { ExportToExcel } from '../AUM/ExportToExcel';
import ExportToPDF from '../AUM/ExportToPDF';
import FolioFirstTable from './FolioFirstTable';

const Folio_Report = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [hide, setHide] = useState(false);
const [report_period, setReportPeriod,] =useState()
    const { aum_dropdown } = AumDropdownApi();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };


      const SearchOnClick = async (e) => {
        try {
          if (!report_period) {
            toast.error("Please select a period before searching.");
            return;
          }
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
    
          // await fetchData();
    
          setHide(true);
        } catch (error) {
          setHide(false);
        }
      };

const empid=""

  return (
    
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="container-fluid p-0 home-main">
        <Navbar onToggle={toggleSidebar} />
        <div className="d-flex">
          <SideBar isOpen={sidebarOpen} />
          <div
            className={` ${
              sidebarOpen ? "dashboard-closed" : "dashboard-full"
            }`}
          >
            <div className="bg-white card m-4 brr">
              <div className="col-md-12">
                <div className="headline pt-4 pl">
                  <b>100 FOLIO REPORT</b>
                </div>
                <div className="d-flex justify-content-center mb-5 mt-5">
                  <div className="col-md-12 d-flex justify-content-evenly">
                    <div className="col-md-3">
                      <label className="pll">
                        <b>Select Type</b>
                      </label>
                      <select
                        className="form-select m-2 w-50"
                        value={report_period}
                        onChange={(e) => {
                          setReportPeriod(e.target.value);
                        }}
                      >
                        <option value="">Select an option</option>
                        {aum_dropdown.map((aum) => (
                          <option value={aum.PERIOD_CODE} key={aum.PERIOD_CODE}>
                            {aum.PERIOD_DESC}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="pll">
                        {" "}
                        <b>Select Period</b>
                      </label>
                      <select
                        className="form-select m-2 w-50"
                        value={report_period}
                        onChange={(e) => {
                          setReportPeriod(e.target.value);
                        }}
                      >
                        <option value="">Select an option</option>
                        {aum_dropdown.map((aum) => (
                          <option value={aum.PERIOD_CODE} key={aum.PERIOD_CODE}>
                            {aum.PERIOD_DESC}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="pll">
                        {" "}
                        <b>Channel</b>
                      </label>
                      <select
                        className="form-select m-2 w-50"
                        value={report_period}
                        onChange={(e) => {
                          setReportPeriod(e.target.value);
                        }}
                      >
                        <option value="">Select an option</option>
                        {aum_dropdown.map((aum) => (
                          <option value={aum.PERIOD_CODE} key={aum.PERIOD_CODE}>
                            {aum.PERIOD_DESC}
                          </option>
                        ))}
                      </select>
                    </div>
                   
                  </div>
                </div>
                <div className="col-md-12 d-flex justify-content-evenly mb-5 mt-5">
                    <div className="col-md-3">
                      <label className="pll">
                        <b>Employe Role</b>
                      </label>
                      <select
                        className="form-select m-2 w-50"
                        value={report_period}
                        onChange={(e) => {
                          setReportPeriod(e.target.value);
                        }}
                      >
                        <option value="">Select an option</option>
                        {aum_dropdown.map((aum) => (
                          <option value={aum.PERIOD_CODE} key={aum.PERIOD_CODE}>
                            {aum.PERIOD_DESC}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="pll">
                        {" "}
                        <b>Zone</b>
                      </label>
                      <select
                        className="form-select m-2 w-50"
                        value={report_period}
                        onChange={(e) => {
                          setReportPeriod(e.target.value);
                        }}
                      >
                        <option value="">Select an option</option>
                        {aum_dropdown.map((aum) => (
                          <option value={aum.PERIOD_CODE} key={aum.PERIOD_CODE}>
                            {aum.PERIOD_DESC}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="pll">
                        {" "}
                        <b>Region</b>
                      </label>
                      <select
                        className="form-select m-2 w-50"
                        value={report_period}
                        onChange={(e) => {
                          setReportPeriod(e.target.value);
                        }}
                      >
                        <option value="">Select an option</option>
                        {aum_dropdown.map((aum) => (
                          <option value={aum.PERIOD_CODE} key={aum.PERIOD_CODE}>
                            {aum.PERIOD_DESC}
                          </option>
                        ))}
                      </select>
                    </div>
                   
                  </div>
                  <div className="col-md-12 d-flex mb-5 mt-5" style={{marginLeft:"68px"}}>
                    <div className="col-md-3">
                      <label className="pll">
                        <b>Location /UFC</b>
                      </label>
                      <select
                        className="form-select m-2 w-50"
                        value={report_period}
                        onChange={(e) => {
                          setReportPeriod(e.target.value);
                        }}
                      >
                        <option value="">Select an option</option>
                        {aum_dropdown.map((aum) => (
                          <option value={aum.PERIOD_CODE} key={aum.PERIOD_CODE}>
                            {aum.PERIOD_DESC}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3" style={{marginLeft:"70px"}}>
                      <label className="pll">
                        {" "}
                        <b> RM Name</b>
                      </label>
                      <select
                        className="form-select m-2 w-50"
                        value={report_period}
                        onChange={(e) => {
                          setReportPeriod(e.target.value);
                        }}
                      >
                        <option value="">Select an option</option>
                        {aum_dropdown.map((aum) => (
                          <option value={aum.PERIOD_CODE} key={aum.PERIOD_CODE}>
                            {aum.PERIOD_DESC}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4 d-flex">
                    <div class="col-md-2  mb-3" style={{marginLeft:"64px"}}>
                          <button
                            className="BgcolorOrange btn mrp"
                            onClick={SearchOnClick}
                            disabled={isLoading}
                          >
                            Search
                          </button>
                          {isLoading && (
                            <div className="text-center mt-4">
                              <i className="fas fa-spinner fa-spin fa-2x"></i>{" "}
                              <LoaderSearch />
                            </div>
                          )}
                        </div>
                        <div class="col-md-2 col-12 mb-3">
                          <div className="icon">
                        
                            {hide && (
                                <>
                            <ExportToExcel />
                            | <ExportToPDF />
                            </>
)}
                          </div>
                        </div>
                    </div>
                   
                  </div>
              
              </div>
              {hide && (
  <>
    <FolioFirstTable></FolioFirstTable>
     
  </>
)}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Folio_Report