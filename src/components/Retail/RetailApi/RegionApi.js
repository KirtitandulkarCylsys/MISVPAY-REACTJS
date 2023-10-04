import React, { useEffect, useState } from 'react'
import { API_SUMMARY_TRANSACTION } from '../../../Constant/apiConstant';

export const RegionApi = (queryParams) => {
	const [regions, setRegion] = useState([]);
	useEffect(() => {
		const fetchRegionData = async () => {
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

export const UfcApi = (queryParams) => {
	const [ufc, setUfc] = useState([]);
	useEffect(() => {
		const fetchUfcData = async () => {
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

export const RMApi = (queryParams) => {
	const [rm, setRm] = useState([]);
	useEffect(() => {
		const fetchRMData = async () => {
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


