import React from "react";
import icon from "../Assets/images/edit-icon.png";
import { Link } from "react-router-dom";
const Manage_user_table = ({ getData }) => {

  return (
    <>
      <div className="col-md-12">
        <table className="table small border" id="table1">
          <thead>
            <tr className="bgcolorBlue text-white ">
              <th
                scope="col" className=" text-center"
              >
                Emp Id
              </th>
              <th
                scope="col" className=" text-center"
              >
                Emp Name
              </th>
              <th
                scope="col" className=" text-center"
              >
                Channel Code
              </th>
              <th
                scope="col" className=" text-center"
              >
                Emp Role
              </th>
              <th
                scope="col" className=" text-center"
              >
                Region
              </th>
              <th
                scope="col" className=" text-center"
              >
                Location
              </th>
              <th
                scope="col" className=" text-center"
              >
                Start Date
              </th>
              <th
                scope="col" className=" text-center"
              >
                End Date
              </th>
              <th
                scope="col" className=" text-center"
              >
                HR Start Date
              </th>
              <th
                scope="col" className=" text-center"
              >
                HR End Date
              </th>
              <th
                scope="col" className=" text-center"
              >
                Status
              </th>
              <th
                scope="col" className=" text-center"
              >
                Petty Cash
              </th>
              <th
                scope="col" className=" text-center"
              >
                Functional Role
              </th>
              <th
                scope="col" className=" text-center"
              >
                View
              </th>
            </tr>
          </thead>
          <tbody>
            {getData.map((item) =>
              <tr className="text-center">
                <td className="p-0">{item.EMP_ID}</td>
                <td className="p-0">{item.EMP_NAME}</td>
                <td className="p-0">{item.CHANNEL_CODE}</td>
                <td className="p-0">{item.EMP_ROLE}</td>
                <td className="p-0">{item.REGION_CODE}</td>
                <td className="p-0">{item.LOCATION}</td>
                <td className="p-0">{item.START_DATE}</td>
                <td className="p-0">{item.END_DATE}</td>
                <td className="p-0">{item.ACCESS_FROM}</td>
                <td className="p-0">{item.ACCESS_UPTO}</td>
                <td className="p-0">{item.STATUS}</td>
                <td className="p-0">{item.DV_FLAG}</td>
                <td className="p-0">{item.FUNC_ROLE}</td>
                <td><Link to={`/employeeupdate/${item.EMP_ID}/${item.CHANNEL_CODE}/${item.EMP_ROLE}/${item.LOCATION}/${item.START_DATE}/${item.STATUS}`}>
                  {item.STATUS == "Y" ? (<img src={icon} width="18px" height="18px" />) : ""}</Link></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
export default Manage_user_table;
