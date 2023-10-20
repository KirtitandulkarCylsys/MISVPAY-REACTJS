import React from 'react'
import "./FolioSecondTable.css"
const FolioSecondTable = ({sapmledata1}) => {
    


  return (

        <div>  <table
        className="table table-bordered active nested-table"
        id="table1"
        
      >
        <thead className="bgcolorBlue text-white mainhead"  style={{ backgroundColor: "#4C6072", color: "white" }}> 
          <tr className="mid">
            <th rowSpan="" className="headtable">
           Sr No
            </th>
            <th rowSpan="" className="headtable">
          Folio No
            </th>
            <th rowSpan="" className="headtable">
           Pin Code
            </th>
            <th rowSpan="" className="headtable">
           PAN No
            </th>
            <th rowSpan="" className="headtable">
           ARN Code
            </th>
            <th rowSpan="" className="headtable">
           Sub Broker
            </th>
            <th rowSpan="" className="headtable">
           Direct Rm Code
            </th> <th rowSpan="" className="headtable">
           Channel
            </th>
            <th rowSpan="" className="headtable">
           Scheme
            </th>
            <th rowSpan="" className="headtable">
           RM Code
            </th><th rowSpan="" className="headtable">
           Emp Name
           </th><th rowSpan="" className="headtable">
           UFC Code
           </th><th rowSpan="" className="headtable">
           UFC Name
           </th>
           <th rowSpan="" className="headtable">
          Region
           </th><th rowSpan="" className="headtable">
           Zone
           </th><th rowSpan="" className="headtable">
           AAum
           </th><th rowSpan="" className="headtable">
           PAN Type
           </th>
           <th rowSpan="" className="headtable">
           PIN Category
           </th>
          </tr>
          
        </thead>
        <tbody style={{ backgroundColor: "#DADADA" }}>
          {sapmledata1.map((item, index) => (
            <tr>
        <td className="">
        {(item.SrNo)}
      </td>
      <td className="">
        {(item.FolioNo)}
      </td>
      <td className="">
        {(item.PinCode)}
      </td>
      <td className="">
        {(item.PanNo)}
      </td>
      <td className="">
        {(item.ARNCode)}
      </td>
      <td className="">
        {(item.SubBroker)}
      </td>
      <td className="">
        {(item.DirectRMCode)}
      </td><td className="">
        {(item.Channel)}
      </td><td className="">
        {(item.Scheme)}
      </td><td className="">
        {(item.RMCode)}
      </td>
      <td className="">
        {(item.EmployeeName)}
      </td>
      <td className="">
        {(item.Ufc)}
      </td>
      <td className="">
        {(item.UfcName)}
      </td>
      <td className="">
        {(item.Region)}
      </td>
      <td className="">
        {(item.Zone)}
      </td>
      <td className="">
        {(item.AAUM)}
      </td>
      <td className="">
        {(item.PanType)}
      </td>
      <td className="">
        {(item.PinCategory)}
      </td>
   
     </tr>
     ))}
     
   </tbody>
 </table>
 </div>
  )
}

export default FolioSecondTable