const FolioFirstTableGS = ({ folio_Report, loading }) => {
    const itemsPerPage = 10;
  
    const [currentPage, setCurrentPage] = useState(0);
  
    const pageCount = Math.ceil(folio_Report.length / itemsPerPage);
  
    const startIndex = currentPage * itemsPerPage;
  
    const endIndex = Math.min(startIndex + itemsPerPage, folio_Report.length);
  
    const displayedItems = folio_Report.slice(startIndex, endIndex);
  
    const handlePageClick = (selected) => {
      setCurrentPage(selected.selected);
    };
  
    const [clickedIndex, setClickedIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleButtonClick = (index) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      if (index === clickedIndex) {
        setClickedIndex(-1);
      } else {
        setClickedIndex(index);
      }
    };
  
    return (
      <div className="new-component">
        <div className="bg-white card m-4">
          <div className="col-l-12 ">
            <div className="rounded-lg p-3"></div>
  
            <button
              className="border-0 w-100 text-left bg-transparent "
              type="button"
            >
              <h5 className="headline">
                <b>TRANSACTION TABLE1</b>
              </h5>
            </button>
  
            <div className="bg-white m-4" style={{ borderRadius: "10px" }}>
              <div className="col-md-12">
                <div className="row mt-2 bg-white"></div>
  
                <div className="table-responsive custom-scroll">
                  <table
                    className="mt-3 table table-bordered"
                    id="table1"
                    style={{ backgroundColor: "white" }}
                  >
                    <thead className="bgcolorBlue text-white mainhead">
                      <tr className="mid">
                        <th rowSpan="" className="headtable">
                          Rank
                        </th>
                        <th rowSpan="" className="headtable">
                          Role
                        </th>
                        <th rowSpan="" className="headtable">
                          RM Code
                        </th>
                        <th rowSpan="" className="headtable">
                          Employee Name
                        </th>
                        <th rowSpan="" className="headtable">
                          Channel
                        </th>
                        <th rowSpan="" className="headtable">
                          UFC Code
                        </th>{" "}
                        <th rowSpan="" className="headtable">
                          UFC Name
                        </th>{" "}
                        <th rowSpan="" className="headtable">
                          Region
                        </th>{" "}
                        <th rowSpan="" className="headtable">
                          Region Name
                        </th>{" "}
                        <th rowSpan="" className="headtable">
                          Zone
                        </th>
                        <th rowSpan="" className="headtable">
                          Account No
                        </th>
                        <th rowSpan="" className="headtable">
                          Folio Name
                        </th>
                        <th rowSpan="" className="headtable">
                          PAN
                        </th>
                        <th rowSpan="" className="headtable">
                          Equity
                        </th>
                        <th rowSpan="" className="headtable">
                          Hybrid
                        </th>
                        <th rowSpan="" className="headtable">
                          Solution
                        </th>
                        <th rowSpan="" className="headtable">
                          INdex/ETFS
                        </th>
                        <th rowSpan="" className="headtable">
                          Debt(OE)
                        </th>
                        <th rowSpan="" className="headtable">
                          Debt(CE)
                        </th>
                        <th rowSpan="" className="headtable">
                          Liquid
                        </th>
                        <th rowSpan="" className="headtable">
                          Total
                        </th>
                        <th rowSpan="" className="headtable">
                          Total Folio
                        </th>
                        <th rowSpan="" className="headtable">
                          Total PAN
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "#DADADA" }}>
                      {displayedItems.map((item, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td className="">{item.RANK}</td>
                            <td className="">{item.EMP_ROLE}</td>
  
                            <td className="">{item.RMCODE}</td>
  
                            <td className="">{item.RMNAME}</td>
  
                            <td className="">{item.SCHANNEL}</td>
                            <td className="">{item.UFC_CODE}</td>
  
                            <td className="">{item.UFCNAME}</td>
                            <td className="">{item.REGION}</td>
                            <td className="">{item.REGIONNAME}</td>
                            <td className="">{item.ZONE}</td>
                            <td className="">
                              <td>
                                <button
                                  className="textlink"
                                  onClick={() => handleButtonClick(index)}
                                  disabled={loading}
                                >
                                  {item.ACNO}
                                </button>
                                {isLoading && (
                                  <div className="text-center mt-4">
                                    <i className="fas fa-spinner fa-spin fa-2x loder"></i>{" "}
                                    <Loader className="loder" />
                                  </div>
                                )}
                              </td>
                            </td>
                            <td className="">{item.NAME}</td>
                            <td className="">{item.PAN_NO}</td>
                            <td className="">{item.EQ_AUM}</td>
                            <td className="">{item.HYB_AUM}</td>
                            <td className="">{item.SOL_AUM}</td>
                            <td className="">{item.IND_ETF_AUM}</td>
                            <td className="">{item.DEBT_OE_AUM}</td>
                            <td className="">{item.DEBT_CE_AUM}</td>
                            <td className="">{item.LQ_AUM}</td>
                            <td className="">{item.AUM}</td>
                            <td className="">{item.TOTAL_FOLIO_AUM}</td>
                            <td className="">{item.TOTAL_PAN_AUM}</td>
                          </tr>
                          {clickedIndex === index && (
                            <tr key={`-${index}`}>
                              <td colSpan="23" className="p-0">
                                <FolioSecondTable />
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
  
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default FolioFirstTableGS