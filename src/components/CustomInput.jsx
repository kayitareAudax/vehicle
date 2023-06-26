import React, { useState } from 'react';

const CustomInput = ({ inputType, value, label, handleChange, bg }) => {
  const [error, setError] = useState('');

  const validateInput = () => {
    if (inputType === 'email' && !value.includes('@')) {
      setError('Please enter a valid email address');
    } else if (inputType === 'password' && value.length < 6) {
      setError('Password must be at least 6 characters long');
    } else {
      setError('');
    }
  };

  const handleInputChange = (event) => {
    handleChange(event);
    validateInput();
  };

  return (
    <div className="mb-4">
      <label htmlFor="fullname" className="text-gray-800">
        {label}
      </label>
      <input
        type={inputType}
        id="fullname"
        className={`w-full border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md px-3 py-2 mt-1 focus:outline-none ${
          error ? 'ring-red-500' : 'ring-blue-500'
        } focus:border-${error ? 'red' : 'blue'}-500`}
        value={value}
        onChange={handleInputChange}
      />
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default CustomInput;
