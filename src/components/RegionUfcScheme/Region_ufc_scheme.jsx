import React, { useState } from "react";
import SideBar from "../Shared/SideBar/SideBar";
import Navbar from "../Shared/Navbar";
import "./Region.css";

const Region_ufc_scheme = () => {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Navbar onToggle={toggleSidebar} />
            <div className="d-flex">
                <SideBar isOpen={sidebarOpen} />
                <div
                    className={` ${sidebarOpen ? "dashboard-closed" : "dashboard-full"
                        }`}
                >
                   
                    <div className="container-fluid pt-3 home-main">
                        <div className="card" style={{ borderRadius: "10px 10px 10px 10px " }}>
                            <div>
                                <h4 className="p-3 a1">Regionwise Sales Redemption Scheme</h4>
                            </div>
                            <div>
                                <table class="table">
                                
                                    <tbody>
                                        <tr className="border-white">
                                            <td className="text-end"><b>Start Date</b></td>
                                            <td> <input type="date" className="form-control" /></td>
                                            <td className="text-end"><b>End Date</b></td>
                                            <td > <input type="date" className="form-control " /></td>
                                        </tr>
                                        <tr className="border-white">
                                            <td className="text-end"><b>Asset Class</b></td>
                                            <td> <select className="form-select">
                                                <option>Select</option>
                                            </select></td>
                                        </tr>
                                        <tr className="border-white">
                                            <td className="text-end"><b>Channel</b></td>
                                            <td> <select className="form-select" value="RTL">
                                                <option value="RTL">RTL</option>
                                            </select></td>
                                        </tr>
                                        <tr className="border-white">
                                            <td className="text-end"><b>Zone</b></td>
                                            <td> <select className="form-select">
                                                <option>Select</option>
                                            </select></td>
                                        </tr>
                                        <tr className="border-white">
                                            <td className="text-end"><b>Region</b></td>
                                            <td> <select className="form-select">
                                                <option>Select</option>
                                            </select></td>
                                        </tr>
                                        <tr className="border-white">
                                            <td className="text-end"><b>Location/UFC</b></td>
                                            <td> <select className="form-select">
                                                <option>Select</option>
                                            </select></td>
                                        </tr>
                                        <tr className="border-white">
                                            <td className="text-end"><b>RM Name</b></td>
                                            <td> <select className="form-select">
                                                <option>Select</option>
                                            </select></td>
                                        </tr>
                                        </tbody>
                                </table>
                                <div className="col-md-12 d-flex justify-content-center mb-4">
                                    <div className="col-md-5"></div>
                                    <div className="col-md-1">
                                        <button type="btn" className="btn1"><b>Search</b></button>
                                    </div>
                                    <div className="col-md-1">
                                        <button type="btn" className="btn1"><b>Export</b></button>
                                    </div>
                                    <div className="col-md-5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Region_ufc_scheme;
