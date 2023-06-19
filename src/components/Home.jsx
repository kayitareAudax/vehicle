import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../utils/api';
import { toast } from 'react-toastify';

function Home() {
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
  // console.log(data)

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm font-semibold">
          History of Registered cars and their owners
        </p>
        {/* <button
          className="bg-mainColor text-white py-2 px-6 rounded text-sm"
          onClick={handlePopupOpen}
        >
          New Car
        </button> */}
      </div>
      <div className="container mx-auto mt-2">
        <TableComponent trs={['Model Name','Price','Owner','Phone Number','national Id','Address', 'Manufacture Year','Manufacture Company','Actions']} data={data}/>
        {/* {renderPagination()} */}
      </div>

      {/* Editing Modal */}
      {selectedItem && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-[35vw] h-[60vh] p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Edit Item</h2>
            <div className="space-y-4 flex flex-col mb-2">
              <input
                type="text"
                value={selectedItem.modelName}
                placeholder='Model Name'
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, modelName: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-2"
              />
              <input
                type="text"
                value={selectedItem.price}
                placeholder='Price'
                onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
                className="border border-gray-300 rounded px-2 py-2"
              />
              <input
                type="text"
                value={selectedItem?.owner?.names}
                placeholder='Owner'
                onChange={(e) => setSelectedItem({ ...selectedItem, owner: e.target.value })}
                className="border border-gray-300 rounded px-2 py-2"
              />
              <input
                type="text"
                value={selectedItem.manufactureYear}
                placeholder='Manufacture Year'
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, manufactureYear: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-2"
              />
              <input
                type="text"
                value={selectedItem.manufactureCompany}
                placeholder='Manufacture Company'
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, manufactureCompany: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                onClick={() => handleSave(selectedItem)}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded"
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Adding Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-[35vw] h-[60vh] p-8 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">New Car</h2>
            <div className="space-y-4 flex flex-col mb-2">
              <input
                type="text"
                placeholder="Model Name"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              <input
                type="text"
                placeholder="Price"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              <input
                type="text"
                placeholder="Owner"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              <input
                type="text"
                placeholder="Manufacture Year"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
              <input
                type="text"
                placeholder="Manufacture Company"
                className="border border-gray-300 rounded px-2 py-2 outline-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 bg-mainColor text-white py-2 px-4 rounded mr-2"
                onClick={() => handleCarAdded({})}
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;