import React, { useEffect, useState } from 'react'
import { API_SUMMARY_TRANSACTION } from '../../../Constant/apiConstant';

export const RegionApi = () => {
	const [regions, setRegion] = useState([]);
	useEffect(() => {
		const fetchRegionData = async () => {
			// const formattedStartDate = startDate.split("-").reverse().join("/");
			// const formattedEndDate = endDate.split("-").reverse().join("/");
			const queryParams = new URLSearchParams({
				employee_id: '1234',
				emprole: 'ADMIN',
				quarter: '202324Q2',
				start_date: '01/04/2023',
				end_date: '30/09/2023',
				select_type: 'NETSALES',
				scheme_code: 'nill',
				channel: 'RTL',
				zone: 'EAST',
				region: '',
				ufc: '',
				rm: 'nill',
				common_report: 'INT_ZONEWISE'
			});
			try {
				const response = await fetch(API_SUMMARY_TRANSACTION.DATA(queryParams));
				const data = await response.json();
				setRegion(data)
			} catch (error) {
				console.error("Error fetching  details", error);
			}

		};
		fetchRegionData();
	}, [])
	return { regions }
}

export const UfcApi = () => {
	const [ufc, setUfc] = useState([]);
	useEffect(() => {
		const fetchUfcData = async () => {
			// const formattedStartDate = startDate.split("-").reverse().join("/");
			// const formattedEndDate = endDate.split("-").reverse().join("/");
			const queryParams = new URLSearchParams({
				employee_id: '1234',
				emprole: 'ADMIN',
				quarter: '202324Q2',
				start_date: '01/04/2023',
				end_date: '30/09/2023',
				select_type: 'NETSALES',
				scheme_code: 'nill',
				channel: 'RTL',
				zone: '',
				region: 'BIHR',
				ufc: '',
				rm: 'nill',
				common_report: 'INT_REGIONWISE'
			});
			try {
				const response = await fetch(API_SUMMARY_TRANSACTION.DATA(queryParams));
				const data = await response.json();
				setUfc(data)
			} catch (error) {
				console.error("Error fetching  details", error);
			}

		};
		fetchUfcData();
	}, [])
	return { ufc }
}

export const RMApi = () => {
	const [rm, setRm] = useState([]);
	useEffect(() => {
		const fetchRMData = async () => {
			// const formattedStartDate = startDate.split("-").reverse().join("/");
			// const formattedEndDate = endDate.split("-").reverse().join("/");
			const queryParams = new URLSearchParams({
				employee_id: '1234',
				emprole: 'ADMIN',
				quarter: '202324Q2',
				start_date: '01/04/2023',
				end_date: '30/09/2023',
				select_type: 'NETSALES',
				scheme_code: 'nill',
				channel: 'RTL',
				zone: '',
				region: '',
				ufc: '203',
				rm: 'nill',
				common_report: 'INT_UFCWISE'
			});
			try {
				const response = await fetch(API_SUMMARY_TRANSACTION.DATA(queryParams));
				const data = await response.json();
				setRm(data)
			} catch (error) {
				console.error("Error fetching  details", error);
			}

		};
		fetchRMData();
	}, [])
	return { rm }
}


