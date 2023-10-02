// import React, { useMemo, useState } from "react";
// import Navbar from "../../Shared/Navbar";
// import SideBar from "../../Shared/SideBar/SideBar";
// import ExportToPDF from "../../Retail/AUM/ExportToPDF";
// import excel from "../../Assets/images/excel_icon.png";
// import { Link, useParams } from "react-router-dom";
// import { useUFCApi } from "../../Retail/RetailApi/Link_api";
// import UfcWiseRedemption from "./UfcWiseRedemption";
// import UfcWiseNetsales from "./UfcWiseNetsales";
// import { ExportExcelUfc } from "./ExportExcel";

// const UfcWise = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const { startDate, endDate, select_type } = useParams();
//   const formattedStartDate = startDate.split("-").reverse().join("/");
//   const formattedEndDate = endDate.split("-").reverse().join("/");

//   const queryParams = useMemo(() => {
//     return {
//       start_date: formattedStartDate,
//       end_date: formattedEndDate,
//       select_type: select_type,
//     };
//   }, [formattedStartDate, formattedEndDate, select_type]);

//   const queryParamsString = new URLSearchParams(queryParams).toString();
//   const { ufc, loading } = useUFCApi(queryParamsString);
//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   let totalEquity = 0;
//   let totalHybrid = 0;
//   let totalArbitrage = 0;
//   let totalPassive = 0;
//   let totalFixedIncome = 0;
//   let totalCash = 0;
//   let grandTotal = 0;

//   const formatNumberToIndianFormat = (number) => {
//     if (typeof number !== "number") {
//       return number;
//     }

//     const parts = number.toString().split(".");
//     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     return parts.join(".");
//   };

//   return (
//     <div className="new-component container-fluid">
//       <Navbar onToggle={toggleSidebar} />
//       <div className="d-flex">
//         <SideBar isOpen={sidebarOpen} />
//         <div
//           className={` ${sidebarOpen ? "dashboard-closed" : "dashboard-full"}`}
//         >
//           <div className="bg-white card m-4" style={{ borderRadius: "10px" }}>
//             <div className="col-md-12">
//               <div className="row mt-2 bg-white">
//                 <div className="head">
//                   <h4>
//                     <b className="black-color">All India UFC Wise</b>
//                   </h4>
//                   <h5>
//                     <b className="gray-color">(In Lakhs)</b>
//                   </h5>
//                 </div>
//                 <div
//                   className="col-md-12 d-flex justify-content-between"
//                   style={{ marginTop: "30px" }}
//                 >
//                   <Link
//                    to='/Transaction'
//                     className="btn"
//                     style={{
//                       backgroundColor: "#4C6072",
//                       color: "white",
//                       height: "fit-content",
//                     }}

//                   >
//                     back
//                   </Link>
//                   <p className="icon">
//                   <ExportExcelUfc/>
//                     |
//                     <ExportToPDF />
//                   </p>
//                 </div>
//               </div>
//               <table className="mt-3 table " id="ufc1">
//                 <thead style={{ backgroundColor: "#4C6072", color: "white" }}>
//                   <tr>
//                     <th scope="col">UFC code</th>
//                     <th scope="col">UFC</th>
//                     <th scope="col" className="text-end">
//                       Equity
//                     </th>
//                     <th scope="col" className="text-end">
//                       Hybrid
//                     </th>
//                     <th scope="col" className="text-end">
//                       Arbitrage
//                     </th>
//                     <th scope="col" className="text-end">
//                       Passive(ex-Debt)
//                     </th>
//                     <th scope="col" className="text-end">
//                       Fixed Income
//                     </th>
//                     <th scope="col" className="text-end">
//                       Cash
//                     </th>
//                     <th scope="col" className="text-end">
//                       Total
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody style={{ backgroundColor: "#DADADA" }}>
//                   {ufc.map((ufc, index) => {
//                     totalEquity += parseFloat(ufc.SEQUITY);
//                     totalHybrid += parseFloat(ufc.SHYBRID);
//                     totalArbitrage += parseFloat(ufc.SARBITRAGE);
//                     totalPassive += parseFloat(ufc.SPASSIVE);
//                     totalFixedIncome += parseFloat(ufc.SFIXED_INCOME);
//                     totalCash += parseFloat(ufc.SCASH);
//                     grandTotal += parseFloat(ufc.STOTAL);
//                     return (
//                       <tr key={index}>
//                         <td>{ufc.UFC_CODE}</td>
//                         <td>{ufc.UFC_NAME}</td>
//                         <td className="text-end">
//                           {formatNumberToIndianFormat(parseFloat(ufc.SEQUITY))}
//                         </td>
//                         <td className="text-end">
//                           {formatNumberToIndianFormat(parseFloat(ufc.SHYBRID))}
//                         </td>
//                         <td className="text-end">
//                           {formatNumberToIndianFormat(
//                             parseFloat(ufc.SARBITRAGE)
//                           )}
//                         </td>
//                         <td className="text-end">
//                           {formatNumberToIndianFormat(parseFloat(ufc.SPASSIVE))}
//                         </td>
//                         <td className="text-end">
//                           {formatNumberToIndianFormat(
//                             parseFloat(ufc.SFIXED_INCOME)
//                           )}
//                         </td>
//                         <td className="text-end">
//                           {formatNumberToIndianFormat(parseFloat(ufc.SCASH))}
//                         </td>
//                         <td className="text-end color-biege" id="total">
//                           {formatNumberToIndianFormat(parseFloat(ufc.STOTAL))}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                   <tr style={{ backgroundColor: "#4C6072", color: "white" }}>
//                     <td>TOTAL</td>
//                     <td></td>
//                     <td className="text-end">
//                       {formatNumberToIndianFormat(
//                         parseFloat(totalEquity.toFixed(2))
//                       )}
//                     </td>
//                     <td className="text-end">
//                       {formatNumberToIndianFormat(
//                         parseFloat(totalHybrid.toFixed(2))
//                       )}
//                     </td>
//                     <td className="text-end">
//                       {formatNumberToIndianFormat(
//                         parseFloat(totalArbitrage.toFixed(2))
//                       )}
//                     </td>
//                     <td className="text-end">
//                       {formatNumberToIndianFormat(
//                         parseFloat(totalPassive.toFixed(2))
//                       )}
//                     </td>
//                     <td className="text-end">
//                       {formatNumberToIndianFormat(
//                         parseFloat(totalFixedIncome.toFixed(2))
//                       )}
//                     </td>
//                     <td className="text-end">
//                       {formatNumberToIndianFormat(
//                         parseFloat(totalCash.toFixed(2))
//                       )}
//                     </td>
//                     <td className="text-end">
//                       {formatNumberToIndianFormat(
//                         parseFloat(grandTotal.toFixed(2))
//                       )}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <UfcWiseRedemption
//                 ufc={ufc}
//                 formatNumberToIndianFormat={formatNumberToIndianFormat}
//                 loading={loading}
//               />
//               <UfcWiseNetsales
//                 ufc={ufc}
//                 formatNumberToIndianFormat={formatNumberToIndianFormat}
//                 loading={loading}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UfcWise;
