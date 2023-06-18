import React, { useState } from "react";

const TableComponent = ({ trs, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

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
  const renderPagination = () => {
    const pageNumbers = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

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
        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
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
        {currentPage < pageNumbers && (
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
    <div className="container mx-auto mt-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#EDEEF3] h-12">
            {trs.map((item, idx) => (
              <th className="text-[#092468] px-4 py-2 text-start" key={idx}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              className="bg-[#434343] bg-opacity-[3%] border border-gray-100"
              key={item._id}
            >
              {Object.keys(item)
                .filter((key) => key !== "_id" && key !== "__v" && key !=="owner")
                .map((key) => (
                  <td className="px-4 py-2 " key={key}>
                    {item[key]}
                  </td>
                ))}
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
      {renderPagination()}
    </div>
  );
};

export default TableComponent;
