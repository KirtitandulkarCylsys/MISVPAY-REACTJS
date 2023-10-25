import { React, useState } from 'react'
import { RMApi } from '../RetailApi/AUM_Api';
import LoaderSearch from '../../Table/LoaderSearch';
import { useDataContext } from '../../../Context/DataContext';

const AumRmReport = ({
  aum_period, ufc_code
}) => {
  const {
    emproles, channel, QUARTERData, emp_id, report_period,formatNumberToIndianFormat
  } = useDataContext();
  const quarter = QUARTERData.replace("-", "").replace("-", "");
  const queryParams = new URLSearchParams({
    empid: emp_id,
    emprole: emproles,
    quarter: quarter,
    period_code: report_period,
    zone: "",
    region_code: "",
    ufc_code: ufc_code,
    rm_code: emp_id,
    chn_code: channel,
    common_report: "INT_UFCWISE",
  });

  const { aumRM, loading } = RMApi(queryParams);
  console.log(aumRM, "data")
  let showdata = [];
  if (aumRM && aumRM.toString().length > 0) {
    showdata = aumRM;
  } else if (aum_period && aum_period.toString().length > 0) {
    showdata = aum_period;
  }



  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };



  function calculateTotalAum() {
    let total = 0;
    showdata.forEach((item) => {
      total += parseFloat(item.TOTAL_AUM);
    });
    return total;
  }

  function calculateTotal(columnName) {
    let total = 0;
    showdata.forEach((item) => {
      total += parseFloat(item[columnName]);
    });
    return total;
  }

  return (
    <>
      <div className="" id="tablebox">
        <div className="d-flex col-md-12">
          <div className="card mt-2 " style={{ borderRadius: "10px" }}>
            <div className="">
              {loading ? (
                <div>
                  <LoaderSearch />
                </div>
              ) : (
                <div className=" " style={{ paddingLeft: "10px" }}>
                  <div
                    className=" d-flex"
                  // style={{ paddingLeft: "10px", paddingBottom: "10px" }}
                  >
                    {/* <div className="col-md-3 ">
                          <h4>
                            <b>{region_code}</b>
                          </h4>
                          <h5>
                            <b className="gray-color">(In Lakhs)</b>
                          </h5>
                        </div> */}
                    {/* <div className="col-md-2 list-group">
                          <p className="theader">
                            <b>All India Region Wise</b>
                          </p>
                        </div>
                        <div className="col-md-2">
                          <p className="theader">
                            <b>All India UFC Wise </b>
                          </p>
                        </div>
                        <div className="col-md-2">
                          <p className="theader">
                            <b>All India RM Wise </b>
                          </p>
                        </div> */}
                  </div>
                </div>
              )}
              {!loading && (
                <table
                  className="table table-bordered nested-table active"
                  id="table3"
                >
                  <thead
                    className="Bgcolor "
                    style={{ backgroundColor: "rgb(58 94 147 / 98%)", color: "white" }}
                  >
                    <tr className="mid">
                      <th rowSpan="3">Zone</th>
                      <th rowSpan="3">Region</th>

                      <th rowSpan="3">UFC Code</th>
                      <th rowSpan="3">UFC</th>
                      <th rowSpan="2">RMCODE</th>
                      <th rowSpan="3">Employee Name</th>
                      <th rowSpan="3">Total AUM</th>
                      <th colSpan="7">AUM</th>
                    </tr>
                    <tr>
                      <th className="">Equity</th>
                      <th className="">Hybrid</th>
                      <th className="">Arbitrage</th>
                      <th className="">Passive(ex-Debt)</th>
                      <th className="">Fixed Income</th>
                      <th className="">Cash</th>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: "#8080805c" }}>
                    {showdata.map((item) => (
                      <tr key={item.SrNo}>
                        <td className="">{item.ZONE}</td>
                        <td className="">{item.REGION_NAME}</td>

                        <td className="">{item.UFC_CODE}</td>
                        <td className="">{item.UFC_NAME}</td>
                        <td className="">{item.RMCODE}</td>
                        <td className="">{item.EMP_NAME}</td>
                        <td className="">{item.TOTAL_AUM}</td>
                        <td className="">{item.EQUITY_AUM}</td>
                        <td className="">{item.HYBRID_AUM}</td>
                        <td className="">{item.ARBITRAGE_AUM}</td>
                        <td className="">{item.PASSIVE_AUM}</td>
                        <td className="">{item.FIXED_INCOME_AUM}</td>
                        <td className="">{item.CASH_AUM}</td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: "rgb(58 94 147 / 98%)", color: "white" }}>
                      <td colSpan="6">Total</td>
                      <td className="">
                        {formatNumberToIndianFormat(
                          calculateTotalAum().toFixed(2)
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AumRmReport