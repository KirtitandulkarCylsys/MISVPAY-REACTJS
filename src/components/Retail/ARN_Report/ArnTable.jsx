import React from 'react'

const ArnTable = () => {
	return (
		<div className='container-fluid'>
			<div className="row">
				<div className="col-md-12 schrollbarArn">
					<table className="table small border">
						<thead>
							<tr className=" ArnTable border-1 ">
								<th
									rowSpan="2"
									className="border-1  text-center"
									style={{ lineHeight: "4" }}
								>
									ARN Code
								</th>
								<th
									rowSpan="2"
									className="border-1  text-center"
									style={{ lineHeight: "4" }}
								>
									ARN Name
								</th>

								<th
									rowSpan="2"
									className="border-1  text-center"
									style={{ lineHeight: "4" }}
								>
									UFC Code
								</th>

								<th
									rowSpan="2"
									className="border-1  text-center"
									style={{ lineHeight: "4" }}
								>
									Channel
								</th>

								<th colspan="7" className="border-1 text-center ">
									Sales
								</th>
								<th colspan="7" className="border-1 text-center">
									Redemption
								</th>
								<th colspan="7" className="text-center">
									NetSales
								</th>
							</tr>
							<tr className="ArnTable border-1 ">
								<th className="forright ">Equity</th>
								<th className="forright">Hybrid</th>
								<th className="forright">Arbitrage</th>
								<th className="forright">Passive</th>
								<th className="forright">Fixed Income</th>
								<th className="forright">Cash</th>
								<th className="forright border-end">Total</th>
								<th className="forright">Equity</th>
								<th className="forright">Hybrid</th>
								<th className="forright">Arbitrage</th>
								<th className="forright">Passive</th>
								<th className="forright">Fixed Income</th>
								<th className="forright">Cash</th>
								<th className="forright border-end">Total</th>
								<th className="forright">Equity</th>
								<th className="forright">Hybrid</th>
								<th className="forright">Arbitrage</th>
								<th className="forright">Passive</th>
								<th className="forright">Fixed Income</th>
								<th className="forright">Cash</th>
								<th className="forright border-end">Total</th>
							</tr>
						</thead>
						<tbody>
							{/* <tr className="zoneTable">
                      <td>TOTAL</td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("SEQUITY").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("SHYBRID").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("SARBITRAGE").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("SPASSIVE").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("SFIXED_INCOME").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("SCASH").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("STOTAL").toFixed(2))
                        )}
                      </td> */}
							{/* REDEMPTION TOTAL */}
							{/* <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("REQUITY").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("RHYBRID").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("RARBITRAGE").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("RPASSIVE").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("RFIXED_INCOME").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("RCASH").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("RTOTAL").toFixed(2))
                        )}
                      </td> */}
							{/* NETSALES TOTAL */}
							{/* <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("NEQUITY").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("NHYBRID").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("NARBITRAGE").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("NPASSIVE").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("NFIXED_INCOME").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("NCASH").toFixed(2))
                        )}
                      </td>
                      <td className="text-end">
                        {formatNumberToIndianFormat(
                          parseFloat(calculateTotal("NTOTAL").toFixed(2))
                        )}
                      </td>
                    </tr> */}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default ArnTable
