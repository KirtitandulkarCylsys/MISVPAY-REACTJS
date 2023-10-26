import React, { useState } from "react";
import SideBar from "../Shared/SideBar/SideBar";
import Navbar from "../Shared/Navbar";
import "./NotificationForm.css";
import { NotificationApi } from "./NotificationAPI/NotificationAPI";

function NotificationForm({ headers }) {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const {
		notification_desc,
		valid_from,
		valid_upto,
		last_updated_by,
		status,
		loading,
		setNotificationDesc,
		setValidFrom,
		setValidUpto,
		setLastUpdatedBy,
		setStatus,
		fetchNotificationMaster,
	} = NotificationApi({ headers });

	const [notifications, setNotifications] = useState([]); // State to store entered notifications

	const addNotification = () => {
		// Add the current notification data to the notifications array
		const newNotification = {
			notification_desc,
			valid_from,
			valid_upto,
			last_updated_by,
			status,
		};
		setNotifications([...notifications, newNotification]);

		// Clear the form inputs after adding to the table
		setNotificationDesc("");
		setValidFrom("");
		setValidUpto("");
		setLastUpdatedBy("");
		setStatus("");
	};

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className="container-fluid p-0 home-main">
			<Navbar onToggle={toggleSidebar} />
			<div className="d-flex">
				<SideBar isOpen={sidebarOpen} />
				<div className={` ${sidebarOpen ? "dashboard-closed" : "dashboard-full"}`}>
					<div className="bg-white card m-4">
						<div className="col-l-12">
							<div className="rounded-lg p-3"></div>
							<button
								className="border-0 w-100 text-left bg-transparent"
								type="button"
							>
								<h5 className="headline">
									<b>ADD NOTIFICATION</b>
								</h5>
							</button>
							<div className="col-lg-12 d-flex justify-content-around mt-5">
								<div className="form-group col-md-2">
									<label className="form-lables" style={{ marginRight: "5px" }}>
										<b>NOTIFICATION</b>
									</label>
									<input
										type="text"
										className="form-control mt-2"
										placeholder="Enter Notification"
										value={notification_desc}
										onChange={(e) => setNotificationDesc(e.target.value)}
									/>
								</div>
								<div className="form-group col-md-2">
									<label className="form-lables" style={{ marginRight: "5px" }}>
										<b>VALID FROM</b>
									</label>
									<input
										type="date"
										className="form-control mt-2"
										value={valid_from}
										onChange={(e) => setValidFrom(e.target.value)}
									/>
								</div>
								<div className="form-group col-md-2">
									<label className="form-lables">
										<b>VALID UPTO</b>
									</label>
									<input
										type="date"
										className="form-control mt-2"
										value={valid_upto}
										onChange={(e) => setValidUpto(e.target.value)}
									/>
								</div>
								<div className="form-group col-md-2 m-md-0 mt-3">
									<label className="form-lables">
										<b>LAST UPDATED BY</b>
									</label>
									<input
										type="text"
										className="form-control mt-2"
										placeholder="Enter Name"
										value={last_updated_by}
										onChange={(e) => setLastUpdatedBy(e.target.value)}
									/>
								</div>
								<div />
								<div className="form-group col-md-2 m-md-0 mt-3">
									<label className="form-lables">
										<b>STATUS (Y/N)</b>
									</label>
									<input
										type="text"
										className="form-control mt-2"
										placeholder="Enter Y/N"
										value={status}
										onChange={(e) => setStatus(e.target.value)}
									/>
								</div>
								<div />
							</div>
							<div>
								<div className="col-lg-12 d-flex justify-content-around mt-5">
									<div className="col-md-7"></div>
									<div className=" col-md-2 m-2">
										<button
											className="btn Button"
											style={{ backgroundColor: " #EE8B3A", color: "white" }}
											onClick={addNotification}
											disabled={loading}
										>
											{loading ? "Loading..." : "Submit"}
										</button>
									</div>
								</div>
								<div className="mt-5">
									<h5>Entered Notifications</h5>
									<table className="table">
										<thead>
											<tr>
												<th>Notification</th>
												<th>Valid From</th>
												<th>Valid Upto</th>
												<th>Last Updated By</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>
											{notifications.map((notification, index) => (
												<tr key={index}>
													<td>{notification.notification_desc}</td>
													<td>{notification.valid_from}</td>
													<td>{notification.valid_upto}</td>
													<td>{notification.last_updated_by}</td>
													<td>{notification.status}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NotificationForm;
