import React from 'react';
import Login from './components/Auth/Login';
import Home from './components/Dashboard/Home';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Retail_Transaction from "../src/components/Retail/Retail_Transaction"
import Table from "../src/components/Table/ZoneTable.jsx"
import Search from "./components/Retail/AUM/Search"
import UfcWise from './components/Table/All-Wise-Table/UfcWise';
import RmWise from './components/Table/All-Wise-Table/RmWise';
import AumRegionReport from './components/Retail/AUM/AumRegionReport';
import AumUfcReport from './components/Retail/AUM/AumUfcReport';
import RegionWiseSales from './components/Table/All-Wise-Table/RegionWiseSales';
import TransactionReport from './components/Retail/Report_Transaction';
import NfoSalesTable from './components/Retail/NFO_Sales/NfoSalesTable';
import AllIndiaRegionwWise from './components/Retail/AUM/AllIndiaWise/AllIndiaRegionwWise';
import AllIndiaUfcWise from './components/Retail/AUM/AllIndiaWise/AllIndiaUfcWise';
import AllIndiaRmWIse from './components/Retail/AUM/AllIndiaWise/AllIndiaRmWIse';
import EtfSale from './components/Retail/ETF/EtfSale';
import EtfSaleTable from './components/Retail/ETF/EtfSaleTable';
import ArnReport from './components/Retail/ARN_Report/ArnReport';
import Manage_user from './components/UserModule/Manage_user';
import Employee_details from './components/UserModule/Employee_details';
import Employee_update from './components/UserModule/Employee_update';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Transaction' element={<Retail_Transaction/>}/>
        <Route path='/Table' element={<Table/>}/>
        <Route path='/Aum' element={<Search/>}/>
        <Route path='/RegionWiseSales' element={<RegionWiseSales/>}/>
        <Route path='/UfcWise' element={<UfcWise/>}/>
        <Route path='/RmWise' element={<RmWise/>}/>
        <Route path='/AumRegionReport' element={<AumRegionReport/>}/>
        <Route path="/AumUfcReport" element={<AumUfcReport />} />
        <Route path='TransactionReport' element={<TransactionReport/>}/>
        <Route path='/nfosales' element={<NfoSalesTable/>}/>
        <Route path='/AllIndiaAumRegionWise/:report_period' element={<AllIndiaRegionwWise/>}/>
        <Route path='/AllIndiaAumUfcWise/:report_period' element={<AllIndiaUfcWise/>}/>
        <Route path='/AllIndiaAumRMWise/:report_period' element={<AllIndiaRmWIse/>}/>
        <Route path="/EtfSale" element={<EtfSale />} />
        <Route path="/arnreport" element={<ArnReport />} />
        <Route path='/manageuser' element={<Manage_user/>}/>
        <Route path='/employeedetails' element={<Employee_details/>}/>
        <Route path='/employeeupdate/:EMP_ID/:CHANNEL_CODE/:EMP_ROLE/:LOCATION/:START_DATE/:STATUS' element={<Employee_update/>}/>
        
      </Routes>
    </BrowserRouter>         
    </div>
  );
}

export default App;
