import React, { useState } from "react";
import SideBar from "../Shared/SideBar/SideBar";
import Navbar from "../Shared/Navbar";
import datetime from "../Assets/images/Vector (Stroke).png";
import "./NotificationForm.css"

const NotificationEdit= ({ addNotification }) => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const toggleSidebar = () => { setSidebarOpen(!sidebarOpen); };
	const [formData, setFormData] = useState({
		id: "", // Generate a new ID
		description: "",
		validFrom: "",
		validUpto: "",
		lastUpdateDate: "",
		lastUpdatedBy: "",
		status: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addNotification(formData);
		setFormData({
			id: "",
			description: "",
			validFrom: "",
			validUpto: "",
			lastUpdateDate: "",
			lastUpdatedBy: "",
			status: "",
		});
	};


	return (
		<div className="container-fluid p-0 home-main ">
			<Navbar onToggle={toggleSidebar} />
			<div className="d-flex">
				<SideBar isOpen={sidebarOpen} />
				<div
					className={` ${sidebarOpen ? "dashboard-closed" : "dashboard-full"
						}`}
				>
					<div className="bg-white card m-4">
						<div className="col-l-12  ">
							<div className=" rounded-lg p-3"></div>
							<button
								className="border-0 w-100 text-left bg-transparent "
								type="button"
							>
								<h5 className="headline">
									<b>EDIT NOTIFICATION</b>
								</h5>
							</button>
							<div className="col-lg-12 d-flex justify-content-around mt-5 ">
								<div className="form-group col-md-2">
									<label className="form-lables" style={{ marginRight: "5px" }} >
										<b>NOTIFICATION</b>
									</label>
									<input type="text" className="form-control mt-2" placeholder="Enter Notification" />
								</div>
								<div className="form-group col-md-2">
									<label className="form-lables" style={{ marginRight: "5px" }} >
										<b>VALID FROM</b>
									</label>
									<input type="date" className="form-control mt-2" />
								</div>
								<div className="form-group col-md-2">
									<label className="form-lables">
										<b>VALID UPTO</b>
									</label>
									<input type="date" className="form-control mt-2" />
								</div>
								<div className="form-group col-md-2">
									<label className="form-lables">
										<b>LAST UPDATE DATE</b>
									</label>
									<input type="date" className="form-control mt-2" />
								</div>
								<div className="form-group col-md-2 m-md-0 mt-3">
									<label className="form-lables">
										<b>LAST UPDATED BY</b>
									</label>
									<input type="text" className="form-control mt-2" placeholder="Enter Name" />
								</div>
								<div />
							</div>
							<div>
							<div className="col-lg-12 d-flex justify-content-around mt-5">
									<div className="col-md-2 form-group" >
										<label className="form-lables"  >
											<b>STATUS (Y/N)</b>
										</label>
										<input type="text" className="form-control mt-2" placeholder="Enter Y/N" />
									</div>
									<div className="col-md-7"></div>
									<div className=" col-md-2 m-2">
										<button className="btn BgcolorOrange mb-5 mt-5">
											<b>EDIT</b>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	);
};

export default NotificationEdit;
