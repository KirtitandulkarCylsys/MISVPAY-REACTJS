import React from 'react';
import Login from './components/Auth/Login';
import Home from './components/Dashboard/Home';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Retail_Transaction from "../src/components/Retail/Retail_Transaction"
import Table from "../src/components/Table/SalesTable"
import Search from "./components/Retail/AUM/Search"
import UfcWise from './components/Table/All-Wise-Table/UfcWise';
import RmWise from './components/Table/All-Wise-Table/RmWise';
import AumRegionReport from './components/Retail/AUM/AumRegionReport';
import AumUfcReport from './components/Retail/AUM/AumUfcReport';
import RegionWiseSales from './components/Table/All-Wise-Table/RegionWiseSales';
import TransactionReport from './components/Retail/Report_Transaction';
import Manage_user from './components/UserModule/Manage_user';
import Employee_details from './components/UserModule/Employee_details';

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
        <Route path='/RegionWiseSales/:startDate/:endDate/:select_type' element={<RegionWiseSales/>}/>
        <Route path='/UfcWise/:startDate/:endDate/:select_type' element={<UfcWise/>}/>
        <Route path='/RmWise/:startDate/:endDate/:select_type' element={<RmWise/>}/>
        <Route path='/AumRegionReport/:zone/:report_period' element={<AumRegionReport/>}/>
        <Route path="/AumUfcReport/:zone/:report_period/:region_code" element={<AumUfcReport />} />
        <Route path='TransactionReport' element={<TransactionReport/>}/>
        <Route path='/manageuser' element={<Manage_user/>}/>
        <Route path='/employeedetails' element={<Employee_details/>}/>
      </Routes>
    </BrowserRouter>         
    </div>
  );
}

export default App;
