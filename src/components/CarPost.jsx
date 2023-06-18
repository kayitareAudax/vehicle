import React, { useState,useEffect } from 'react';
import axios from 'axios';
import TableComponent from './TableComponent';
import API_URL from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CarPost = () => {
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

  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData=async()=>{
    const res=await axios.get("/vehicle",config);
    const {data}=res;
    console.log(data);
    if(data.success){
      setData(data.data);
    }
    toast(data.message,{position:'top-right',closeOnClick:true,hideProgressBar:false});
    setData(data.data)
  }

  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/vehicle/${itemId}`);
      setData(data.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    setSelectedItem(null);
  };

  const handleSave = async (updatedItem) => {
    try {
      // Make an API request to save/update the item's data
      const response = await axios.put(`${API_URL}/vehicle/${updatedItem.id}`, updatedItem);
      const updatedData = data.map((item) => (item.id === updatedItem.id ? response.data : item));
      setData(updatedData);
      handleModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleCarAdded = (newCar) => {
    setData([newCar, ...data]);
    handlePopupClose();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!modelName || !price || !owner || !manufactureYear || !manufactureCompany) {
      toast.error('Please provide all the required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/vehicle`, {
        manufactureCompany,
        manufactureYear,
        price,
        modelName,
        owner,
      },config);

      if (response.data.success) {
        toast.success('Car registered successfully');
        setModelName('');
        setPrice('');
        setOwner('');
        setManufactureYear('');
        setManufactureCompany('');
      } else {
        toast.error('Car registration failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    }

    setLoading(false);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm font-semibold">
          History of vehicle Owners
        </p>
        <button
          className="bg-mainColor text-white py-2 px-6 rounded text-sm"
          onClick={handlePopupOpen}
        >
          New Car
        </button>
      </div>
      <div className="container mx-auto mt-2">
        <TableComponent trs={['Model Name','Price','Owner','Manufacture Year','Manufacture Company','Actions']} data={data}/>
        {/* {renderPagination()} */}
      </div>
      </div>
  );
};

export default CarPost;
