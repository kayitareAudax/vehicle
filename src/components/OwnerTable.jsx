import React, { useState,useEffect } from 'react';
import axios from 'axios';
import TableComponent from './TableComponent';
import API_URL from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AwesomeCard from './AwesomeCard';

const OwnerTable = () => {
  const [modelName, setModelName] = useState('');
  const [price, setPrice] = useState('');
  const [owner, setOwner] = useState('');
  const [manufactureYear, setManufactureYear] = useState('');
  const [manufactureCompany, setManufactureCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

return(
  <div className='flex flex-row flex-wrap'>
            <AwesomeCard nationalId={12004212312312} names={"Kayitare Audax"} address={"Kigali Rwanda"} telephone={"+250790047212"}/>
            <AwesomeCard nationalId={12004212312312} names={"Kayitare Audax"} address={"Kigali Rwanda"} telephone={"+250790047212"}/>
            <AwesomeCard nationalId={12004212312312} names={"Kayitare Audax"} address={"Kigali Rwanda"} telephone={"+250790047212"}/>
            <AwesomeCard nationalId={12004212312312} names={"Kayitare Audax"} address={"Kigali Rwanda"} telephone={"+250790047212"}/>
            <AwesomeCard nationalId={12004212312312} names={"Kayitare Audax"} address={"Kigali Rwanda"} telephone={"+250790047212"}/>

  </div>
)
}
export default OwnerTable;
