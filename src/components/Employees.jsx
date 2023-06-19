import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../utils/api";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
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


  const handleModalClose = () => {
    setSelectedItem(null);
  };


  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
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
  const handleDelete=async(itemId)=>{
    console.log(itemId);
    try {
      const resp=await axios.delete(`/employee/${itemId}`,config);
      console.log(resp.data);
      setData(data.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log(error);
    }
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
                <th className="text-[#092468] px-4 py-2 text-start">
                  action
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {data.map((item) => (
                <tr
                  className="bg-[#434343] bg-opacity-[3%] border border-gray-100"
                  key={item.id}
                >
                  <td className="px-4 py-2 text-[12px]">{item.first_name}</td>
                  <td className="px-4 py-2 text-[12px]">{item.last_name}</td>
                  <td className="px-4 py-2 text-[12px]">{item.national_id}</td>
                  <td className="px-4 py-2 text-[12px]">{item.telephone}</td>
                  <td className="px-4 py-2 text-[12px]">{item.email}</td>
                  <td className="px-4 py-2 text-[12px]">{item.department}</td>
                  <td className="px-4 py-2 text-[12px]">{item.position}</td>
                  <td className="px-4 py-2 text-[12px]">{item.manufacturer}</td>
                  <td className="px-4 py-2 text-[12px]">{item.model}</td>
                  <td className="px-4 py-2 text-[12px]">{item.serial_number}</td>
                  <button className="text-red-500 underline text-[12px] py-2" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {renderPagination()}
      </div>
          </div>
  );
}
export default Employees;
