import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../utils/api';
import TableComponent from './TableComponent';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import AwesomeCard from './AwesomeCard';

function Vehicles() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,setItemsPerPage] = useState(2);
  const [totalPages,setTotalPages]=useState()
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [chasis,setChasis]=useState("");
  const [plateNumber,setPlateNumber]=useState("");
  const [manufactureCompany,setManufactureCompany]=useState("");
  const [manufactureYear,setManufactureYear]=useState("");
  const [price,setPrice]=useState(0);
  const [modelName,setModelName]=useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      return navigate("/login")
    }
  },[])
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = async (itemId) => {
    console.log(itemId);
    try {
      const resp=await axios.delete(`/vehicle/${itemId}`,config);
      console.log(resp.data);
      setData(data.filter((item) => item._id !== itemId));
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

  const handleCarAdded = async() => {
    const body={chasis,modelName,manufactureCompany,price,manufactureYear,plateNumber};
    const resp=await axios.post("/vehicle/",body,config);
    if(!resp.data.success){
      toast(resp.data.message,{
        position:'top-right',
        closeOnClick:true,
        hideProgressBar:false
      })
    }
    else{
      console.log(resp.data.data);
      setData([...data,resp.data.data ]);
      handlePopupClose();
    }
    
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(`/vehicle?page=1&limit=${itemsPerPage}`, config);
      const { data } = res;
      if (data.success) {
        setData(data.data);
        setTotalPages(data.totalPages); // Set the total number of pages
      } else {
        toast(data.message, { position: 'top-right', closeOnClick: true, hideProgressBar: false });
      }
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const handlePageChange = async (pageNumber) => {
    try {
      const res = await axios.get(`/vehicle?page=${pageNumber}&limit=${itemsPerPage}`, config);
      const { data } = res;
      if (data.success) {
        setData(data.data);
        setCurrentPage(pageNumber);
      } else {
        toast(data.message, { position: 'top-right', closeOnClick: true, hideProgressBar: false });
      }
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const renderPagination = () => {
    return (
      <div className="flex justify-center my-4 text-sm">
        {currentPage > 1 && (
          <button
            className="px-3 py-1 bg-[#092468] text-white rounded"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>
        )}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={`rounded px-3 py-1 ${currentPage === page ? 'bg-[#092468] text-white' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            className="rounded px-3 py-1 bg-[#092468] text-white"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    );
  };


  
  
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm font-semibold mb-2 sm:mb-0">
          History of Registered cars and their owners
        </p>
        <button
          className="bg-[#092468] text-white py-2 px-6 rounded text-sm"
          onClick={handlePopupOpen}
        >
          New Car
        </button>
      </div>
      <div className="container mx-auto mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table header */}
            <thead>
              <tr className="bg-[#EDEEF3] h-12">
                <th className="text-[#092468] px-4 py-2 text-start">Model Name</th>
                <th className="text-[#092468] px-4 py-2 text-start">Price</th>
                <th className="text-[#092468] px-4 py-2 text-start">Owner</th>
                <th className="text-[#092468] px-4 py-2 text-start">Manufacture Year</th>
                <th className="text-[#092468] px-4 py-2 text-start">Manufacture Company</th>
                <th className="text-[#092468] px-4 py-2 text-start">Actions</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {data.map((item) => (
                <tr className="bg-[#434343] bg-opacity-[3%] border border-gray-100" key={item.id}>
                  <td className="px-4 py-2">{item.modelName}</td>
                  <td className="px-4 py-2">{item.price}</td>
                  <td className="px-4 py-2">{item?.owner?.names}</td>
                  <td className="px-4 py-2">{item.manufactureYear}</td>
                  <td className="px-4 py-2">{item.manufactureCompany}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 underline mr-2" onClick={() => handleEdit(item)}>
                      Edit
                    </button>
                    <button className="text-red-500 underline" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {renderPagination()}
      </div>

      {/* Editing Modal */}
      {selectedItem && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          {/* Modal content */}
          <div className="bg-white w-full sm:w-[35vw] md:w-[40vw] h-[60vh] p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Edit Item</h2>
            <div className="space-y-4 flex flex-col mb-2">
              {/* Input fields */}
              <input
                type="text"
                value={selectedItem.modelName}
                placeholder="Model Name"
                onChange={(e) => setSelectedItem({ ...selectedItem, modelName: e.target.value })}
                className="border border-gray-300 rounded px-2 py-2"
              />
              {/* Other input fields */}
            </div>
            {/* Save and Cancel buttons */}
          </div>
        </div>
      )}

      {/* Adding Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          {/* Popup content */}
          <div className="bg-white w-full sm:w-[35vw] md:w-[40vw] iphone:w-full h-[65vh] p-8 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">New Car</h2>
            <div className="space-y-4 flex flex-col mb-2">
              {/* Input fields */}
              <input
                type="text"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="Model Name"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              {/* Other input fields */}
            </div>
            {/* Save and Cancel buttons */}
          </div>
        </div>
      )}
    </div>
  );

}
export default Vehicles