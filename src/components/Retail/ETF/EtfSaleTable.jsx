import React from 'react'

const EtfSaleTable = ({etf_Sale,
    formatNumberToIndianFormat,
    startDate,
    endDate,}) => {

const sapmledata=[{
    Zone:"East",
    EmployeId:"1",
    Ufc:"203",
   Regioncode: "2023",
   RegionName:"ppppp",
   Channel:"RTL",
   TransactionDate:"20/2/2023",
   InvestorName:"pppp",
   Equity:"21221",
   InvestorAmount:"2000",
   Total:"200000"
},{Zone:"East",
EmployeId:"2",
    Ufc:"203",
Regioncode: "2023",
RegionName:"ppppp",
Channel:"RTL",
TransactionDate:"20/2/2023",
InvestorName:"pppp",
Equity:"21221",
InvestorAmount:"2000",
Total:"200000"},{Zone:"West",
EmployeId:"3",
    Ufc:"4410",
Regioncode: "2023",
RegionName:"BIHR",
Channel:"RTL",
TransactionDate:"20/2/2023",
InvestorName:"pppp",
Equity:"21221",
InvestorAmount:"2000",
Total:"200000"}

]

console.log(etf_Sale,"table")

  return (
    <div>  <table
    className="table table-bordered active nested-table"
    id="table1"
  >
    <thead className="bgcolorBlue text-white mainhead">
      <tr className="mid">
        <th rowSpan="" className="headtable">
          Zone
        </th>
        <th rowSpan="" className="headtable">
          EmployeId
        </th>
       
        <th rowSpan="" className="headtable">
          Ufc
        </th>
        
        <th rowSpan="" className="headtable">
          Region Name
        </th>
        <th rowSpan="" className="headtable">
          RM Name
        </th>
        <th rowSpan="" className="headtable">
          Channel
        </th> <th rowSpan="" className="headtable">
          Transaction Date
        </th> <th rowSpan="" className="headtable">
          Investor Name
        </th> <th rowSpan="" className="headtable">
          Equity
        </th> <th rowSpan="" className="headtable">
          Investment Amount
        </th>
       
      </tr>
      
    </thead>
    <tbody style={{ backgroundColor: "#DADADA" }}>
      {etf_Sale.map((item, index) => (
        <tr>
    <td className="">
    {(item.ZONE)}
  </td>
  <td className="">
  {(item.EMP_ID)}
</td>

<td className="">
    {(item.UFC_CODE)}
  </td>
  
  <td className="">
    {(item.REGION_CODE)}
  </td>
  
  <td className="">
    {(item.RM_NAME)}
  </td>
  <td className="">
  {(item.CHANNEL_CODE)}
</td>

<td className="">
    {(item.TXNDATE)}
  </td>
  <td className="">
  {(item.INVESTOR_NAME)}
</td>
<td className="">
    {(item.ETF)}
  </td>
  <td className="">
  {(item.INVST_AMT)}
</td>

  
  </tr>
      ))}
      
    </tbody>
  </table></div>
  )
}

export default EtfSaleTable