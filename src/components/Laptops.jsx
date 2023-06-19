import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../utils/api";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import {ArrowUpIcon,ArrowDownIcon} from '@heroicons/react/24/outline'
function Laptops() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [totalPages, setTotalPages] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [model,setModel]=useState("");
  const [serialNumber,setSerialNumber]=useState("");
  const [manufacturer,setManufacturer]=useState("")
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/login");
    }
  }, []);
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    fetchData();
  }, [itemsPerPage]);
  const handleEdit = (item) => {
    setSelectedItem(item);
  };



  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleLaptopAdded = async () => {
    const body = {
      model,
      manufacturer,
      serialNumber
    };
    const resp = await axios.post("/laptop/", body, config);
    if (!resp.data.success) {
      toast(resp.data.message, {
        position: "top-right",
        closeOnClick: true,
        hideProgressBar: false,
      });
    } else {
      console.log(resp.data);
      setData([...data, resp.data.laptop]);
      handlePopupClose();
    }
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `/laptop?page=1&limit=${itemsPerPage}`,
        config
      );

      const { data } = res;
      console.log(data);
      if (data.success) {
        setData(data.laptops);
        console.log(data.laptops);
        setTotalPages(data.totalPages); // Set the total number of pages
      } else {
        toast(data.message, {
          position: "top-right",
          closeOnClick: true,
          hideProgressBar: false,
        });
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
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={`rounded px-3 py-1 ${
                currentPage === page ? "bg-[#092468] text-white" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
        {currentPage < totalPages && (
          <button
            className="rounded px-3 py-1 bg-[#092468] text-white"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
        <input value={itemsPerPage} type="number" onChange={(e)=>setItemsPerPage(e.target.value)} className="text-center w-7 py-2 text-black border rounded ml-2"/>
      </div>
    );
  };
  const handlePageChange = async (pageNumber) => {
    try {
      const res = await axios.get(
        `/laptop?page=${pageNumber}&limit=${itemsPerPage}`,
        config
      );
      const { data } = res;
      console.log(data);
      if (data.success) {
        setData(data.laptops);
        setCurrentPage(pageNumber);
      } else {
        toast(data.message, {
          position: "top-right",
          closeOnClick: true,
          hideProgressBar: false,
        });
      }
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
 
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm font-semibold mb-2 sm:mb-0">
          Registered Laptops
        </p>
        <button
          className="bg-mainColor text-white py-2 px-6 rounded text-sm"
          onClick={handlePopupOpen}
        >
          New Laptop
        </button>
      </div>
      <div className="container mx-auto mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table header */}
            <thead>
              <tr className="bg-[#EDEEF3] h-12">
                <th className="text-[#092468] px-4 py-2 text-start">Manufacturer</th>
                <th className="text-[#092468] px-4 py-2 text-start">model</th>
                <th className="text-[#092468] px-4 py-2 text-start">
                  serial Number
                </th>
                {/* <th className="text-[#092468] px-4 py-2 text-start">Action</th> */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {data.map((item) => (
                <tr
                  className="bg-[#434343] bg-opacity-[3%] border border-gray-100"
                  key={item.id}
                >
                  <td className="px-4 py-2">{item.manufacturer}</td>
                  <td className="px-4 py-2">{item.model}</td>
                  <td className="px-4 py-2">{item.serial_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {renderPagination()}
      </div>

      {/* Adding Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          {/* Popup content */}
          <div className="bg-white w-full sm:w-[35vw] md:w-[40vw] iphone:w-full h-[50vh] p-8 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">New Laptop</h2>
            <div className="space-y-4 flex flex-col mb-2">
              {/* Input fields */}
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Model"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              <input
                type="text"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                placeholder="Manufacturer"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              <input
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="Serial Number"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                  onClick={handleLaptopAdded}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={handlePopupClose}
                >
                  Cancel
                </button>
              </div>
              {/* Other input fields */}
            </div>
            {/* Save and Cancel buttons */}
          </div>
        </div>
      )}
      
    </div>
  );
}
export default Laptops;
