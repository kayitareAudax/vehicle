import React from 'react'
const CustomInput = ({inputType,value,label,handleChange,bg}) => {
  return (
    <div className="mb-4">
            <label htmlFor="fullname" className="text-gray-800">{label}</label>
            <input
              type={inputType}
              id="fullname"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={value}
              onChange={handleChange}
            />
          </div>
  )
}

export default CustomInput
