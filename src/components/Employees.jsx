import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../utils/api";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import AwesomeCard from "./AwesomeCard";
import {ArrowUpIcon,ArrowDownIcon} from '@heroicons/react/24/outline'
function Employees() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [totalPages, setTotalPages] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [chasis, setChasis] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [manufactureCompany, setManufactureCompany] = useState("");
  const [manufactureYear, setManufactureYear] = useState("");
  const [price, setPrice] = useState(0);
  const [modelName, setModelName] = useState("");
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

  const handleDelete = async (itemId) => {
    console.log(itemId);
    try {
      const resp = await axios.delete(`/vehicle/${itemId}`, config);
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
    console.log(updatedItem);
    try {
      // Make an API request to save/update the item's data
      const response = await axios.put(
        `/vehicle/update/${updatedItem._id}`,
        updatedItem,
        config
      );
      console.log(response.data.data);
      const updatedData = data.map((item) =>
        item._id === updatedItem._id ? response.data.data : item
      );
      console.log("updated", updatedData);
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

  const handleCarAdded = async () => {
    const body = {
      chasis,
      modelName,
      manufactureCompany,
      price,
      manufactureYear,
      plateNumber,
    };
    const resp = await axios.post("/vehicle/", body, config);
    if (!resp.data.success) {
      toast(resp.data.message, {
        position: "top-right",
        closeOnClick: true,
        hideProgressBar: false,
      });
    } else {
      console.log(resp.data.data);
      setData([...data, resp.data.data]);
      handlePopupClose();
    }
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `/employee?page=1&limit=${itemsPerPage}`,
        config
      );

      const { data } = res;
      console.log(data);
      if (data.success) {
        setData(data.employees);
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

  const handlePageChange = async (pageNumber) => {
    try {
      const res = await axios.get(
        `/employee?page=${pageNumber}&limit=${itemsPerPage}`,
        config
      );
      const { data } = res;
      console.log(data);
      if (data.success) {
        setData(data.employees);
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
  const sortAsc=(key)=>{
    setData(data.sort((a,b)=>a.key-b.key))
  }
  const sortDesc=(key)=>{
    console.log(key);
    console.log(data[0]);
    setData(data.sort((a,b)=>b.key-a.key))
  }
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

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm font-semibold mb-2 sm:mb-0">
          Registered Employees and their laptops
        </p>
      </div>
      <div className="container mx-auto mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table header */}
            <thead>
              <tr className="bg-[#EDEEF3] h-12">
                <th className="text-[#092468] px-4 py-2 text-start flex">
                  first Name
                   {/* <ArrowUpIcon onClick={()=>sortDesc('modelName')} className="h-5"/><ArrowDownIcon onClick={()=>sortAsc("modelName")} className="h-5"/> */}
                </th>
                <th className="text-[#092468] px-4 py-2 text-start">last Name</th>
                <th className="text-[#092468] px-4 py-2 text-start">national Id</th>
                <th className="text-[#092468] px-4 py-2 text-start">
                  telephone
                </th>
                <th className="text-[#092468] px-4 py-2 text-start">
                  email
                </th>
                
                <th className="text-[#092468] px-4 py-2 text-start">
                  department
                </th>
                <th className="text-[#092468] px-4 py-2 text-start">
                  position
                </th>
                <th className="text-[#092468] px-4 py-2 text-start">
                  laptop manufacturer
                </th>
                <th className="text-[#092468] px-4 py-2 text-start">
                  model
                </th>
                <th className="text-[#092468] px-4 py-2 text-start">
                  serial
                </th>
                <th className="text-[#092468] px-4 py-2 text-start">Actions</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {data.map((item) => (
                <tr
                  className="bg-[#434343] bg-opacity-[3%] border border-gray-100"
                  key={item.id}
                >
                  <td className="px-4 py-2">{item.first_name}</td>
                  <td className="px-4 py-2">{item.last_name}</td>
                  <td className="px-4 py-2">{item.national_id}</td>
                  <td className="px-4 py-2">{item.telephone}</td>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">{item.department}</td>
                  <td className="px-4 py-2">{item.position}</td>
                  <td className="px-4 py-2">{item.manufacturer}</td>
                  <td className="px-4 py-2">{item.model}</td>
                  <td className="px-4 py-2">{item.serial_number}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-500 underline mr-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 underline"
                      onClick={() => handleDelete(item._id)}
                    >
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
          <div className="bg-white w-full sm:w-[35vw] md:w-[40vw] h-[64vh] p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Edit Item
            </h2>
            <div className="space-y-4 flex flex-col mb-2">
              {/* Input fields */}
              <input
                type="text"
                value={selectedItem.modelName}
                placeholder="Model Name"
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    modelName: e.target.value,
                  })
                }
                className="border border-gray-300 rounded px-2 py-2"
              />
              <input
                type="text"
                value={selectedItem.chasis}
                placeholder="Chasis Number"
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    chasis: e.target.value,
                  })
                }
                className="border border-gray-300 rounded px-2 py-2"
              />
              <input
                type="text"
                value={selectedItem.manufactureCompany}
                placeholder="Manufacture Company"
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    manufactureCompany: e.target.value,
                  })
                }
                className="border border-gray-300 rounded px-2 py-2"
              />
              <input
                type="text"
                value={selectedItem.manufactureYear}
                placeholder="Manufacture Year"
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    manufactureYear: e.target.value,
                  })
                }
                className="border border-gray-300 rounded px-2 py-2"
              />
              <input
                type="text"
                value={selectedItem.plateNumber}
                placeholder="Model Name"
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    plateNumber: e.target.value,
                  })
                }
                className="border border-gray-300 rounded px-2 py-2"
              />
              <input
                type="number"
                value={selectedItem.price}
                placeholder="Model Name"
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    price: e.target.value,
                  })
                }
                className="border border-gray-300 rounded px-2 py-2"
              />
              <div className="flex justify-end">
                <button
                  className="bg-mainColor text-white py-2 px-4 rounded mr-2"
                  onClick={() => handleSave(selectedItem)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={()=>setSelectedItem(null)}
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
              <input
                type="text"
                value={chasis}
                onChange={(e) => setChasis(e.target.value)}
                placeholder="Chasis number"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              <input
                type="text"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                placeholder="Plate Number"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              <input
                type="text"
                value={manufactureCompany}
                onChange={(e) => setManufactureCompany(e.target.value)}
                placeholder="Manufacture Company"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              <input
                type="text"
                value={manufactureYear}
                onChange={(e) => setManufactureYear(e.target.value)}
                placeholder="Manufacture Year"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                  onClick={handleCarAdded}
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
export default Employees;
