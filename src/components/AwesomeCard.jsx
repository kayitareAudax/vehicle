import React from 'react';

const AwesomeCard = ({ names, nationalId, address, telephone }) => {
  return (
    <div className="bg-gray-100 text-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-red-400">{names}</h2>
        <p className="text-lg text-gray-300">{nationalId}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-green-400">Address</h3>
        <p className="text-lg text-gray-300">{address}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-blue-400">Telephone</h3>
        <p className="text-lg text-gray-300">{telephone}</p>
      </div>
    </div>
  );
};

export default AwesomeCard;
